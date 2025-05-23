import { useRef } from "react";

export default function UseRef36() {
  let ref = useRef(0);

  function handlePlus() {
    ref.current = ref.current + 1;
    console.log(ref.current);
  }

  return (
    <div>
      <button onClick={handlePlus}>click</button>
      <p>{ref.current}</p>
    </div>
  );
}
