// fs: 파일시스템 내장 모듈
const fs = require("fs");

// 1. 동기방식으로 파일읽기: readFileSync()
const data = fs.readFileSync("package.json", "utf8");
// 파일 데이터가 data 에 담김
console.log(data);
console.log("Bye Bye ~~");
console.log("-------- 비동기 방식으로 파일 읽기 시작 --------");
fs.readFile("ex01_global.js", "utf8", function (err, data) {
  if (err) throw err;
  console.log(data);
});
console.log("-------- 비동기 방식으로 파일 읽기 종료 --------");
