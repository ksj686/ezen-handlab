import { useContext } from "react";
import { UserContextProfile } from "./UserContextProfile";

export default function PersonContext() {
  const users = useContext(UserContextProfile);
  return (
    <div>
      <h2>프로필</h2>
      <p>이름: {users.name}</p>
      <p>이메일: {users.email}</p>
    </div>
  );
}
