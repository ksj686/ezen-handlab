// ex18_http.js
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
// npm i 설치할 모듈
// npm i -D nodemon
// npx nodemon ex18_http.js

http
  .createServer(async (req, res) => {
    if (req.url == "/") {
      const filename = path.join("public", "tourSample.html");
      try {
        const data = await fs.readFile(filename);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // 헤더 설정
        res.end(data);
      } catch (error) {
        console.error(error);
        //   서버 에러는 500번대 이다.
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(error.message);
      }
    }
  })
  .listen(3333, () => {
    console.log(`http://localhost:3333`);
  });
