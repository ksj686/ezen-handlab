import axiosInstance from "./axiosInstance";
import type {
  User,
  CreateUserResponse,
  CreateEmailResponse,
  UserListResponse,
} from "../components/users/types/User";

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
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};
