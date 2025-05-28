import { useState } from "react";
import Dark from "./Dark";
import { ThemaContext } from "./UseContext";

export default function UseContext29() {
  // 배경을 dark light 을 생태벼눗
  const [isDark, setDark] = useState(false);
  const toggle = () => {
    setDark((prev) => !prev);
  };

  return (
    <div>
      <ThemaContext.Provider value={{ isDark, toggle }}>
        <Dark />
      </ThemaContext.Provider>
    </div>
  );
}
