import { useContext } from "react";
import { ThemaContext } from "./UseContext";

export default function Dark() {
  const { isDark, toggle } = useContext(ThemaContext);
  return (
    <div style={{ background: isDark ? "#ddd" : "#ff0000" }}>
      <h2>배경 테마 변경</h2>
      <button onClick={toggle}>테마변경</button>
    </div>
  );
}
