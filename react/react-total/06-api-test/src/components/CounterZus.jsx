import React from "react";
import { useCounterStore } from "./store";

const CounterZus = () => {
  const { count, setCount } = useCounterStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={setCount}>+</button>
    </div>
  );
};

export default CounterZus;
