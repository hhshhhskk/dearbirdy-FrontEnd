import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

// ✅ 버디 데이터 가져오기
export const getBirdData = async (birdType: string) => {
  // console.log("🦜 버디 데이터 요청:", birdType);

  try {
    const originaccessToken = useAuthStore.getState().accessToken;
    if (!originaccessToken) {
      throw new Error("❌ access_token이 없음. 로그인 필요");
    }

    const response = await api.get(`/birdy/test/birdy?birdName=${birdType}`, {
      headers: {
        access: originaccessToken,
      },
    });
    // const accessToken = response.headers["access"];
    // const refreshToken = response.headers["refresh"];

    // console.log("✅ 교체된 access_token:", accessToken);
    // console.log("✅ 교체된 refresh_token:", refreshToken);
    // console.log("✅ 버디 데이터 요청 성공:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("❌ 버디 데이터 가져오기 실패:", error);

    // 에러 발생 시 기본 데이터 반환 (예외 처리)
    return {
      birdName: birdType,
      traits: "특별한 버디",
      explanation: "당신만의 특별한 버디가 탄생했습니다!",
    };
  }
};
