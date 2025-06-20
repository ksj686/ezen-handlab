//postController.js
//CRUD로직
const pool = require("../models/dbPool");

exports.createPost = async (req, res) => {
  console.log("createPost 들어옴");
  try {
    const { writer, title, content } = req.body;
    console.log(writer, title, content);
    const sql = `insert into posts (writer, title, content)
        values(?,?,?)`;
    const postData = [writer, title, content];

    // const sql2 = `insert into posts (writer, title, content) set ?`;
    // const postData = { writer, title, content };

    const [result] = await pool.query(sql, postData);
    console.log("result", result);

    res.status(201).json({ message: "Post created", postId: result.insertId }); // 새로운 데이터 생성은 보통 201
  } catch (error) {
    console.error("createPost error: ", error);
    res.status(500).json({ message: "Server Error  " + error.message });
  }
}; // createPost() ----------------------

// 모든 포스트 목록 조회
exports.listPost = async (req, res) => {
  try {
    // 1. 전체 게시글 수 가져오기
    const query = `select count(id) as count from posts`;
    const [result] = await pool.query(query);
    console.log("result: ", result);

    // 2. 전체 게시목록 가져오기
    const sql = `select id, title, content, writer, attach, wdate 
        from posts order by id desc`;
    const [posts] = await pool.query(sql);
    console.log(posts);
    res.json({
      data: posts,
      totalCount: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};
