import PersonContext from "./PersonContext";
import { UserContextProfile } from "./UserContextProfile";

//  user = {name: "홍길동", email:"glassbox71@naver.com", tel:"010-1111-1111"}
export default function UseContextObject31() {
  // UserContextProfile넣기
  const users = {
    name: "홍길동",
    email: "glassbox71@naver.com",
    tel: "010-1111-1111",
  };

  return (
    <UserContextProfile.Provider value={users}>
      <PersonContext />
    </UserContextProfile.Provider>
  );
}

// UserContextProfile

// h2프로필
// p이름
// 이메일
// 전화번호

// PersonContext
