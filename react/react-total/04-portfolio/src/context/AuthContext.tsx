import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { formatDiagnosticsWithColorAndContext } from "typescript";

// context에 저장될 값들의 타입 정의하기
interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// 자식요소로 전달되는 요소 타입 선언하기
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!cookies.user);
  const [userId, setUserId] = useState<string | null>(cookies.user || null);
  // cookies.user ? " " : null

  useEffect(() => {
    if (cookies.user) {
      setIsLoggedIn(true);
      setUserId(cookies.user);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, [cookies.user]);
  const login = (email: string) => {
    const expireDate = new Date(new Date().getTime() + 2 * 60 * 1000);
    setCookie("user", email, { path: "/", expires: expireDate });
    setIsLoggedIn(true);
    setUserId(email);
  };

  const logout = () => {
    removeCookie("user", { path: "/" });
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// context가 null인 경우 에러 발생한다 - 구조분해할당
// useContext(AuthContext)를 직접 쓰지 않고 재선언하여
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("에러");
  // return formatDiagnosticsWithColorAndContext
  return context;
};
