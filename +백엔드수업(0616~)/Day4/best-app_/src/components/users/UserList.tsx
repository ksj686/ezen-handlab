import React, { useState, useEffect } from "react";
import type { User, UserListResponse } from "./types/User";
import { apiUserList } from "../../api/userApi";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 인증받은 사용자 state 받기
  const authUser = useAuthStore((s) => s.authUser);
  const isLoading = useAuthStore((s) => s.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      // 부모 App 컴포넌트에서 인증 사용자 체크를 완료했다면 isLoading을 false로 변경함
      //   인증 사용자, 인가 사용자(권한:ADMIN) 여부를 검사하는 로직
      if (!authUser) {
        // 새로고침을 하면 authUser를 setting 하기도 전에 useEffect를 렌더링해버려서 authUser가 없는 상태가 발생한다.
        debugger;
        alert("로그인 필요!");
        navigate("/");
        return;
      }

      // 관리자가 아닌 경우
      if (authUser.role !== "ADMIN") {
        alert("관리자만 사용 가능!");
        navigate("/");
        return;
      }
      //   관리자일 경우 사용자 목록 가져오기 - API 요청
      const fetchUsers = async () => {
        try {
          const res = await apiUserList();
          setUsers(res);
        } catch (error: any) {
          alert("회원목록 조회 중 에러 발생 " + error.message);
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    } // if(!isLoading) -------------------
  }, [authUser, isLoading]); // useEffect()

  if (loading) {
    return (
      <div>
        <h4 className="text-center my-4">Loading ...</h4>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <h2 className="text-center my-4">회원 목록 [Admin Page-관리자전용]</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>회원ID</th>
            <th>이 름</th>
            <th>이메일</th>
            <th>등록일</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.indate}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
