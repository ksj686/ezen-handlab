// ex22_router.js

/**
 * express 모듈 이용해서
 * get  '/' =>index.html 보여주기
 * get  '/users' =>모든 회원 목록 보여주기 <h1>모든 회원 목록</h1> 출력
 *
 * 그 외 나머지 경로 '*' => <h1>해당 페이지는 없습니다</h1> 출력하기
 */

const path = require("path");
const express = require("express");
const app = express();

app.set("port", 9090);

// public 폴더 내 정적 파일들(이미지, html, css, js) 을 넣으면 브라우저에서 접근 가능하도록 설정
// 요청 주소 보낼때 public은 필요없다.
// http://localhost:9090/images/파일명.확장자
// http://localhost:9090/index.html 이렇게 해도 나옴
app.use(express.static(path.join(__dirname, "public"))); // use - 미들웨어 사용할때 사용

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users", (req, res) => {
  let str = `<h1>모든 회원 목록</h1>
    <ul>
    <li><a href='/users/1'>1번: 홍길동</a></li>
    <li><a href='/users/2'>2번: 최명아</a></li>
    <li><a href='/users/3'>3번: 김철수</a></li>
    </ul>`;
  res.send(str);
});

// path부분에 ':파라미터명' => 동적 세그먼트
// 'req.params.파라미터명' 으로 추출
app.get("/users/:uid", (req, res) => {
  let no = req.params.uid;
  console.log(no);
  let str = `<h1>${no}번 회원님의 정보</h1>
    <p>DB에서 ${no}번 회원님의 정보를 가져와 출력</p>`;
  res.send(str);
});

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
