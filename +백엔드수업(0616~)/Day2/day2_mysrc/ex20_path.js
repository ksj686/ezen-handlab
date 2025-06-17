// ex20_path.js
// path 모듈: 파이르이 경로 처리 기능 제공
// path.sep : OS의 파일 경로 구분자
// join() : 경로를 결합
// resolve(경로) : 주어진 경로를 절대 경로 변환
// dirname(경로) : 주어진 경로에서 파일 이름을 제외한 디렉토리 경로만 반환
// basename(경로) : 파일명 반환(확장자 포함)
// extname(경로) : 확장자 반환

const path = require("path");
const dirs = ["C:", "ezen-source", "node-basic"];
const dirStr = dirs.join(path.sep);
console.log(dirStr); // C:\ezen-source\node-basic
console.log(__dirname); // 현재 경로
console.log(path.join(__dirname, "public", "pizzaUI.html"));

const curPath = path.join(__dirname, "public", "pizzaUI.html");

const upDir = path.dirname(curPath); // curPath : 파일명 제외한 상위 경로
console.log(upDir);

const fname = path.basename(curPath); // 확장자 포함 파일명
console.log(fname); // pizzaUI.html
const ext = path.extname(curPath); // 확장자
console.log(ext); //.html

const filePath = "/home/user/project/file.txt";

// 2단계 상위 디렉토리 얻어오기
const str = path.join(filePath, "..", "..");
console.log(str); //\home\user
console.log(path.resolve(str)); // 주어진 경로를 절대 경로로 반환
