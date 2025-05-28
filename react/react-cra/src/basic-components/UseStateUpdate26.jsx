import { useState } from "react";

let Counter = [0, 0, 0];

export default function UseStateUpdate26() {
  const [counter, setCounter] = useState(Counter);

  function handlePlus(id) {
    const nextCounter = counter.map((c, i) => {
      if (i === id) {
        return c + 1;
      } else {
        return c;
      }
    });
    setCounter(nextCounter);
  }
  return (
    <div>
      <ul>
        {counter.map((num, i) => (
          <li>
            {num} <button onClick={() => handlePlus(i)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
