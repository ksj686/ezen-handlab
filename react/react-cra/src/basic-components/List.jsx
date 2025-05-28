import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function List() {
  const { items, query } = useContext(SearchContext);
  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {filtered.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
