import { useState } from "react";
import "./caculator.css";

const Calculator = () => {
  // 상태변수
  const [input, setInput] = useState("");
  // 계산기에 표시할 버튼 목록
  const buttons: string[] = [
    "C",
    "←",
    "/",
    "*",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "=",
    "0",
    ".",
  ];

  const handleClick = (value: string) => {
    if (input === "0") setInput("");

    if (value === "C") setInput("");
    else if (value === "←") setInput((prev) => prev.slice(0, -1));
    else if (value === "=") {
      // 데이터 입력시 오류가 발생할 경우 예외 처리 추가하기
      try {
        const result = eval(input);
        setInput(String(result));
      } catch (error) {
        setInput("Error");
      }
    } else setInput((prev) => prev + value);
  };

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        {buttons.map((btn, id) => (
          <button onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
