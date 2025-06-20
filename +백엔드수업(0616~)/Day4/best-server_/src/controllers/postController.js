//postController.js
//CRUD로직
const pool = require("../models/dbPool");
const path = require("path");
const fs = require("fs");

exports.createPost = async (req, res) => {
  console.log("createPost들어옴...");
  try {
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
    //1. 전체 게시글 수 가져오기
    const query = `select count(id) as  count from posts`;
    const [[{ count }]] = await pool.query(query);
    console.log("count: ", count);

    //2. 전체 게시목록 가져오기
    const sql = `select id, title,content,writer,attach file, 
            date_format(wdate,'%Y-%m-%d') wdate
            from posts order by id desc`;

    const [posts] = await pool.query(sql);
    // console.log(posts);
    res.json({
      data: posts,
      totalCount: count,
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
      res.json({ data: result });
    }
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

    // 3. 파일이 있다면 서버에서 삭제
    res.status(200).json({ message: `${id}번 글을 삭제` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
}; // deletePost()----------------------
