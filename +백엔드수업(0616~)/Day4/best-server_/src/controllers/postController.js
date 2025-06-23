//postController.js
//CRUD로직
const pool = require("../models/dbPool");
const path = require("path");
const fs = require("fs");

exports.createPost = async (req, res) => {
  console.log("createPost들어옴...");
  try {
    //파라미터 데이터 => req.body
    const { writer, title, content } = req.body;
    // 첨부 파일 => req.file로 추출
    const file = req.file; // multer 저잫안 파일 정보
    console.log("file: ", file);
    let fileName = null;
    if (file) {
      fileName = file.filename; // 실제 저장된 파일명이 들어옴 => DB에 저장
    }

    console.log(writer, title, content);
    const sql = `insert into posts(writer,title,content, attach)
            values(?,?,?,?)`;
    const postData = [writer, title, content, fileName];

    // const sql2=`insert into posts(writer,title,content) set ?`;
    // const postData ={writer, title, content}
    const [result] = await pool.query(sql, postData);
    console.log(result);
    const newPost = {
      id: result.insertId,
      writer,
      title,
      content,
      file: fileName,
    };
    // res.status(201).json({ message: "Post created", postId: result.insertId });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("createPost error: ", error);
    res.status(500).json({ message: "Server Error " + error.message });
  }
}; //createPost()-------------------------------

//모든 포스트 목록 조회
exports.listPost = async (req, res) => {
  try {
    const size = 3; // 한 페이지 당 보여줄 목록 개수
    const page = parseInt(req.query.page);

    // 1. 전체 게시글 수 가져오기
    const query = `select count(id) as  count from posts`;
    const [[{ count }]] = await pool.query(query);
    console.log("count: ", count);

    // 1_2. 총 페이지 수(totalPages) 구하기
    const totalPages = Math.ceil(count / size);

    // 2. 전체 게시목록 가져오기
    // 현재 보여줄 페이지 번호에 해당하는 데이터만 끊어서 가져오기(추후)
    const sql = `select id, title,content,writer,attach file, 
            date_format(wdate,'%Y-%m-%d') wdate
            from posts order by id desc`;

    const [posts] = await pool.query(sql);
    // console.log(posts);
    res.json({
      data: posts,
      totalCount: count,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
}; //listPost()---------------------------------

exports.viewPost = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `select id, writer, title, content, attach file
    , date_format(wdate,'%Y-%m-%d %H:%i:%s') wdate
     from posts where id=?`;

    const [result] = await pool.query(sql, [id]);

    if (result.length == 0) {
      return res.status(404).json({ message: "해당 글은 없습니다" });
    }
    res.json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
}; // viewPost()----------------------

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. 해당 게시글의 첨부파일명 가져오기
    const sql1 = `select attach as file from posts where id=?`;
    const [result] = await pool.query(sql1, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "해당 글은 존재하지 않음" });
    }
    const post = result[0];
    let filePath = "";
    if (post.file) {
      filePath = path.join(__dirname, "..", "..", "public", "uploads");
      console.log("filePath: ", filePath);
    }
    // 2. DB에서 해당 글 삭제
    const sql2 = `delete from posts where id=?`;
    const [result2] = await pool.query(sql2, [id]);
    if (result2.affectedRows === 0) {
      return res.status(404).json({ message: `해당 글은 없음` });
    }

    if (fs.existsSync(filePath)) {
      // 여기 안들어옴
      console.log(">>>>>>>");
      fs.unlinkSync(filePath);
      //동기방식으로 파일을 삭제하는 함수. 비동기 방식=> fs.unlink()
    }

    // 3. 파일이 있다면 서버에서 삭제
    res.status(200).json({ message: `${id}번 글을 삭제` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
}; // deletePost()----------------------

exports.updatePost = async (req, res) => {
  try {
    // 글내용: id => req.params.id
    const { id } = req.params;
    // 글내용: writer, title, ... => req.body
    const { writer, title, content } = req.body;
    // 첨부파일: req.file
    const file = req.file;
    let fileName = file?.filename;

    const sql1 = `select attach from posts where id=?`;

    const [result1] = await pool.query(sql1, [id]);
    if (result1.length === 0) {
      return res.status(404).json({ message: "해당 글은 없습니다" });
    }
    const post = result1[0];
    let filePath = "";
    if (post.file) {
      // 첨부한 파일이 있으면
      filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "uploads",
        post.file
      );
    }

    const params = [writer, title, content];
    let sql2 = `update posts set writer=?, title=?, content=?`;

    if (file) {
      sql2 += `, attach=?`;
      params.push(post.file);
      console.log("file: ", file);
    }
    sql2 += ` where id=?`;
    params.push(id);
    console.log("sql2: ", sql2);
    const [result2] = await pool.query(sql1, params);

    if (result2.affectedRows === 0) {
      return res.status(404).json({ message: "해당 글은 없습니다" });
    }
    // 새로 첨부한 파일이 있다면
    if (result1.length > 0 && fs.existsSync(filePath)) {
      console.log(">>> 파일 삭제 처리중 <<<");
      fs.unlinkSync(filePath); //기존 첨부파일은 삭제 처리
    }
    res.status(200).json({ message: "Post글 수정완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
}; // updatePost()----------------------
