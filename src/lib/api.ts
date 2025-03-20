import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ HTTP Only 쿠키 자동 전송
});

// ✅ 요청 인터셉터 - 모든 요청에 Access Token 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.access = accessToken;
      // console.log("✅  토큰이 존재함");
    } else {
      // console.log("✅  토큰이 존재 하지않음");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 - Access Token 갱신 로직
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log("originalRequest: ", error.config);

    // ✅ 401 Unauthorized & 리프레시 토큰 갱신 시도 (1회만)
    // console.log(error.response);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // console.log("✅ 리프레시 토큰 갱신 시도");
      try {
        // ✅ Refresh Token을 HTTP Only 쿠키로 관리하므로, 빈 요청 본문 전송
        const response = await api.get("/auth/reissue-token");

        // console.log(response.headers.access);

        const newAccessToken = response.headers.access;
        // console.log("✅ 새 Access Token:", newAccessToken);
        // ✅ 새 Access Token을 Zustand에 업데이트
        useAuthStore.getState().setAuth(newAccessToken);

        // ✅ 원래 요청을 새 Access Token으로 재시도
        originalRequest.headers.access = newAccessToken;
        return api(originalRequest);
      } catch (refreshError: unknown) {
        if (axios.isAxiosError(refreshError)) {
          // console.error("❌ Refresh Token 갱신 실패:", refreshError);

          // ✅ Refresh 요청도 401이면 즉시 로그아웃
          if (refreshError.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = "/";
          }
        } else {
          console.error("❌ 알 수 없는 오류 발생:", refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
