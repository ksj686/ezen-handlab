import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function SearchBox() {
  const { query, setQuery } = useContext(SearchContext);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
}
