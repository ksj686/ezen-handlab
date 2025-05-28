const people = [
  "kim: test",
  "lee: test2",
  "park: test3",
  "ko: programmers",
  "han: test5",
];

export default function List13() {
  // 상태변수
  const listItems = people.map((item) => <li>{item}</li>);

  // 화면에 붙일 내용
  return <ul>{listItems}</ul>;
}
