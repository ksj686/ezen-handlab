import axios from "axios";
import { checkTokenExpiration, refreshAccessToken } from "../utils/authUtil";

const axiosInstance = axios.create({
  baseURL: `http://localhost:7777/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;

// 인터셉터 (interceptor) : 요청을 서버로 보내기 직전에 실행되어 요청 내용을 검증
// [1] 요청 인터셉터 : 요청 보내기 전에 사전처리
// [2] 응답 인터셉터 : 서버로부터 응답을 받았을 때 브라우저에 출력하기 전에 그 응답을 가로채서 처리하는 역할 수행

axiosInstance.interceptors.request.use(
  async (config) => {
    // config => axios가 요청을 준비하면서 자동으로 만들어서전달해주는요청 설정 객체
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(`요청 인터셉터 실행중 ... accessToken : ${accessToken}`);

    // 리프레시 요청을 axiosInstance 대신 axios를 사용해서 해결
    // if (config.url?.includes("/auth/refresh")) {
    //   return config; // 리프레시 요청은 인터셉터 로직 건너뜀
    // }

    if (accessToken) {
      // 유효한 토큰인지 체크
      if (checkTokenExpiration(accessToken)) {
        // [1]유효하지 않은 토큰이라면
        // 유효시간이 지났다면 refreshToken을 서버에 보내서 새로운 accessToken을 발급받고 요청 헤더에 넣어준다
        const newAccessToken = await refreshAccessToken();
        console.log("새 엑세스 토큰 발급 받음...");

        if (newAccessToken) {
          sessionStorage.setItem("accessToken", newAccessToken);
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return config;
        }
      } // if -------------------

      // [2] 유효한 토큰이라면
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } // if----------

    return config; // config 반환하지 않으면 요청 진행되지 않거나 오류 발생됨
  },
  (err) => {
    console.error("요청 인터셉터 에러: ", err);

    Promise.reject(err);
  }
); // 성공 resolve, 실패 reject

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    console.log("응답 인터셉터에서 받은 응답 상태코드(status): ", status);

    if (status === 400) {
      alert(error.response.data?.message);
      window.location.href = "/";
      return Promise.reject(error);
    }
    if (status === 401) {
      // 인증받지 않은 사용자일 경우 => 서버에 리프레시 토큰 보내서 새 엑세스 토큰 발급
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken);
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(error.config); // 원래 요청 재시도
          }
        } catch (error) {
          console.error(error); // 리프레시 토큰도 유효하지 않은 경우
        }
      } // if-------------------------
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      window.location.href = "/";
      return Promise.reject(error);
    } // 401에러 ----
    if (status === 403) {
      alert("접근 권한이 없습니다");
      window.location.href = "/";
      return Promise.reject(error);
    }
  }
);
