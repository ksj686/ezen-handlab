import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isLoggedIn, userId, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="inner">
        <h1 className="logo">
          <Link to="/">logo</Link>
        </h1>
        <nav>
          <ul className="main-menu">
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/skill">스킬</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <div>
                  <span>{userId}</span>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
