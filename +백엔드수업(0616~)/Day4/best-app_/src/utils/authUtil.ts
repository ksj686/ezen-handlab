import axios from "axios";
// import axiosInstance from "../api/axiosInstance";
// import type { AuthUser } from "../stores/authStore";

// jwt payload type
interface JWTPayload {
  exp: number;
  [key: string]: any;
}

// 토큰이 유효한지 여부를 체크하는 함수. 유효하지 않으면 true를 반환할 예정
export const checkTokenExpiration = (token: string): boolean => {
  try {
    //   header.payload.signature
    const payload = JSON.parse(atob(token.split(".")[1])) as JWTPayload;
    const expTime = payload.exp * 1000; // exp 초단위
    let isExpired = expTime < Date.now();
    //   유효시간 지난 경우 true 반환, 유효시간 남은 경우 false 반환
    return isExpired;
  } catch (error) {
    console.error("잘못된 토큰 포맷 에러: ", error);
    return true; // 오류 발생시 만료된 것으로 간주
  }
}; // ---------------------------------------

// 리프레시 토큰을 가지고 서버에 요청을 보내는 함수
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.log("refreshToken 없음");
    return null;
  }
  // 리프레시 토큰을 보내서 서버로부터 검증을 받자 => 검증 통과시 새 엑세스 토큰을 받는다.
  try {
    const response = await axios.post(
      // 무한루프를 axiosInstance대신 axios를 써서 해결
      `https://localhost:7777/api/auth/refresh`,
      {
        refreshToken,
      }
    );
    const newAccessToken = await response.data?.accessToken;
    //   서버에서 보낸 데이터 : {accessToken: newAccessToken}
    return newAccessToken;
  } catch (error) {
    console.error("refreshToken error: ", error);
    return null;
  }
}; // ---------------------------------------
