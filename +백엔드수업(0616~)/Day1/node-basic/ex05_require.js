const obj = require("./ex05_module"); // 확장자는 생략해도 된다.
const obj2 = require("./sample");

console.log(obj.num);
obj.plus(10, 3);
obj.minus(10, 3);

obj2.gop(3, 8);
obj2.divide(3, 8);
/**
 * require('모듈명')
 * require('./module')
 * [1] 먼저 module.js 찾는다
 * [2] 해당 파일 없으면 module이라는 디렉토리 찾는다.
 * [3] 디렉토리가 있으면 해당 디렉토리의 index.js를 찾아서 가져옴
 */
