import { useEffect, useState } from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

export default function UseEffectClean34() {
  const [page, setPage] = useState("one");
  useEffect(() => {
    console.log("useEffect 가 실행됨");
    return () => {
      console.log("클린업됨");
    };
  }, [page]);

  return (
    <div>
      <button onClick={() => setPage("one")}>page one</button>
      <button onClick={() => setPage("two")}>page two</button>
      <hr />
      {page === "one" ? <PageOne /> : <PageTwo />}
    </div>
  );
}
