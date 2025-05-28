import { useEffect, useState } from "react";

function UseEffectApi33() {
  // api
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((json) => setData(json));
    console.log("api 호출하기");
  }, []);

  return (
    <div>
      <h1>api 데이터</h1>
      {data ? <pre> {JSON.stringify(data, null, 2)}</pre> : "로딩중"}
    </div>
  );
}
export default UseEffectApi33;
