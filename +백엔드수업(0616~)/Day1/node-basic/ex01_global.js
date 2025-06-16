// ex01_global.js
// 전역 객체 : global
// console.log(global);
// console.log("************************************");
global.setTimeout(() => {
  console.log("1초 뒤에 실행");
}, 1000);

global.var1 = "전역변수";
global.func = () => {
  console.log("Global Function");
};

console.log(global);
// global 생략 가능
console.log(var1);
func();

// 전역변수: __filename, __dirname :
console.log(`현재 실행 중인 파일명 : %s`, __filename);
console.log(`현재 실행 중인 파일의 경로 : %s`, __dirname);
