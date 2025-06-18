// ex27_mysql.js
// mysql2 모듈 설치 - Promise를 지원 async/await 사용 가능
// mysql 모듈은 가독성이 안좋다.
// npm i mysql ==> callback fn
// npm i mysql2 ==> promise

const express = require("express");
const mysql = require("mysql");

// db 연결정보 ==> .env
// 연결 종류 2가지 createConnection, createPool
// createPool - 응답을 빨리 받기 위해 연결 자원 미리 준비
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "eduDB",
  user: "ezen",
  password: "1234",
});

console.log(conn);

// DB 연결
conn.connect((err) => {
  if (err) {
    console.error("MySQL 연결 시도 중 에러: ", err);
    return;
  }
  console.log("연결성공~~~");
});

// 쿼리 실행
conn.query("select * from members order by id desc", (err, result) => {
  if (err) {
    console.error("!!!query error!!!");
    return;
  }
  //   console.log(result);
  for (let i = 0; i < result.length; i++) {
    console.log(result[i].id, result[i].name, result[i].email, result[i].role);
  }
});

conn.end();
