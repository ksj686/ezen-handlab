import axiosInstance from "./axiosInstance";
import type {
  User,
  CreateUserResponse,
  CreateEmailResponse,
  UserListResponse,
  AuthUserResponse,
} from "../components/users/types/User";
import type { AuthUser } from "../stores/authStore";

// 회원가입 요청
export const apiSignUp = async (user: User): Promise<CreateUserResponse> => {
  const response = await axiosInstance.post("/users", user);
  return response.data; // result, msg, data: {insertId: 회원번호}
};

// 이메일 중복 체크
export const apiCheckEmail = async (
  email: string
): Promise<CreateEmailResponse> => {
  const response = await axiosInstance.post("/users/dupe", { email }); // 받는 변수, 대입하는 변수명이 같으면 생략가능
  // (email: email)
  return response.data; // result, msg, data: {insertId: 회원번호}
};

// 전체 회원 목록(user 비밀번호 빼고... 새로 만들어야?)
export const apiUserList = async (): Promise<UserListResponse[]> => {
  const accessToken = sessionStorage.getItem("accessToken");
  const response = await axiosInstance.get(
    "/admin/users"
    // , {
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
    // }
  );
  return response.data;
};

export const apiSignIn = async (loginUser: {
  email: string;
  passwd: string;
}): Promise<AuthUserResponse> => {
  const response = await axiosInstance.post("/auth/login", loginUser); // 비밀번호가 들어가있기 때문에 post 씀
  return response.data;
};
