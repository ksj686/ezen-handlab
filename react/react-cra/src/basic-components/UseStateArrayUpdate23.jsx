const { useState } = require("react");

export default function UseStateArrayUpdate23() {
  let [글제목, 글제목변경] = useState(["남자코드", "하의", "상의"]);

  function 제목변경() {
    let newArray = [...글제목];
    newArray[0] = "여자코드";
    글제목변경(newArray);
  }

  return (
    <div>
      {/* 클릭버튼을 클릭하면 글제목 배열의 첫번째 데이터 수정하기 "여자코드" */}
      <button onClick={제목변경}>클릭</button>
      <div>{글제목[0]}</div>
    </div>
  );
}
