import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // 메뉴로 사용할 오브젝트
  const menus = [
    { key: "about", label: "ABOUT" },
    { key: "skill", label: "SKILL" },
    { key: "portfolio", label: "PORTFOLIO" },
    { key: "todolist", label: "TODOLIST" },
    { key: "contact", label: "CONTACT US" },
  ];
  return (
    <header>
      <div className="content-inner">
        <div className="header-left">
          <h1 className="logo">
            <Link to="/">Logo</Link>
          </h1>
          <nav>
            <ul>
              {menus.map((menu) => (
                <li>
                  <Link to={`/${menu.key}`}>{menu.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="header-right"></div>
      </div>
    </header>
  );
};

export default Header;
