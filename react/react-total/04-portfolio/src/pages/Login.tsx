import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const { isLoggedIn, login, logout } = useAuth();

  //   admin 1234
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === "admin" && userPass === "1234") {
      login(userId);
      (e.currentTarget as HTMLFormElement).submit();
    } else {
      alert("아이디 또는 비밀번호가 틀립니다. 다시 입력하세요.");
    }
  };
  return (
    <section>
      <div className="inner">
        <h2>로그인</h2>
        {isLoggedIn ? (<button onClick={logout}>로그아웃</button>) : (
        <form onSubmit={handleSubmit} action="/">
          <input
            type="text"
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
          />
          <input
            type="password"
            onChange={(e) => setUserPass(e.target.value)}
            placeholder="비밀번호"
          />
          <button type="submit">로그인</button>
        </form>
        )}
      </div>
    </section>
  );
};

export default Login;
