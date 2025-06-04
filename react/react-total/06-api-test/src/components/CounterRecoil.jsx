import React from "react";
import { useRecoilState } from "recoil";
import { recoilCounter } from "./recoilState";

const CounterRecoil = () => {
  const [count, setCount] = useRecoilState(recoilCounter);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default CounterRecoil;
