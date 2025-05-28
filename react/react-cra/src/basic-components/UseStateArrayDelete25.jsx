import { useState } from "react";

let skills = [
  { id: 0, title: "html", content: "hyper text" },
  { id: 1, title: "css", content: "cascade" },
  { id: 2, title: "javscript", content: "hyper text" },
  { id: 3, title: "react", content: "hyper text" },
];

export default function UseStateArrayDelete25() {
  const [skill, setSkill] = useState(skills);
  const removeList = (id) => {
    setSkill(skill.filter((sk) => sk.id !== id));
  };

  return (
    <div>
      <h2>skill list</h2>
      <ul>
        {skill.map((sk) => (
          <li key={sk.id}>
            {sk.title} {sk.content}
            <button onClick={() => removeList(sk.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
