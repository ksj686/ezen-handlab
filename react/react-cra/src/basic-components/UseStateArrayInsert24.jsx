import { useState } from "react";

export default function UseStateArrayInsert24() {
  // 데이터를 저장할 상태 변수
  // input으로 받은 데이터 저장변수
  const [items, setItems] = useState([]);
  const [input, setInput] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addItem = () => {
    //   빈공백을 잘라내고 데이터가 있는지 체크
    if (input.trim()) {
      setItems([...items, input]);
      setInput("");
    }
  };
  return (
    <div>
      <h2>useState 배열에 데이터 추가하기</h2>
      <input value={input} onChange={handleChange} />
      <button onClick={addItem}>추가</button>
      <ul>
        {items.map((item, id) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}
