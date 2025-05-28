import { useState } from "react";

export default function StateFunCounter21() {
  const [num, setNumber] = useState(1);

  const 더하기 = () => {
    // setNumber(num + 1);
    setNumber((prev) => prev + 1);
  };

  const minusNum = () => {
    //   이렇게 설정해도 하나만 감소한다.
    // setNumber(num - 1);
    // setNumber(num - 1);
    // setNumber(num - 1);
    //   setNumber 함수를 호출할때의 시간과 실제 업데이트 할때의 시간과 차이가 있다.
    //   실제로 업데이트 되는 사이에 지연이 있을 수 있기 때문

    //   아래와 같이 현재 값을 불러와서 빼는 형태로 구현해야 제대로 작동
    setNumber((prev) => prev - 1);
    setNumber((prev) => prev - 1);
    setNumber((prev) => prev - 1);
  };

  return (
    <div>
      <h2>useState ㄱ밧 변경하기</h2>
      <div>값: {num}</div>
      <button onClick={더하기}>+</button>
      <button onClick={minusNum}>-</button>
    </div>
  );
}
