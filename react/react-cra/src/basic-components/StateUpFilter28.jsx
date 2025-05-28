// 데이터를 입력하는 자식 컴포넌트

import { useState } from "react";

// 필터해서 보여를 list 자식 컴포넌트

function SearchBox({ querySend, setQuerySend }) {
  return (
    <input value={querySend} onChange={(e) => setQuerySend(e.target.value)} />
  );
}

function List({ item, inputData }) {
  return (
    <ul>
      {/* 여기 다 못봄 */}
      {/* {item.filter((item) => item.toLowerCase())}
      .map(item => <li>{item}</li>) */}
    </ul>
  );
}

export default function StateUpFilter28() {
  const [query, setQuery] = useState("");
  const items = ["apple", "banana", "orange", "mango"];

  return (
    <div>
      <SearchBox querySend={query} setQuerySend={setQuery} />
      <List item={items} inputData={query} />
    </div>
  );
}
