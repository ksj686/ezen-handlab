// ex14_fsPromise.js
const fs = require("fs").promises;
// 콜백방식이 아닌 promise 방식으로 처리하므로 직관적이고 깔끔함
console.log("Start-----");
fs.readFile("ex04_os.js")
  .then((data) => {
    console.log(data.toString());
    return fs.readFile("out.txt");
  })
  .then((data2) => {
    console.log("***************");
    console.log(data2.toString());
  })
  .catch((err) => console.error(err));
console.log("End-----");

fs.copyFile("ex05_module.js", "copy2.txt")
  .then(() => console.log("카피완료"))
  .catch(console.log);

// async/await

async function copy(src, dest) {
  try {
    await fs.copyFile(src, dest);
    console.log(">>> 복사완료 <<<", dest);
  } catch (error) {
    console.error("파일 카피 중 에러", error);
  }
}

// copy() 호출해서 ~.JPG ===> herimg.JPG로 카피
copy("women-big.jpg", "herimg.jpg");
