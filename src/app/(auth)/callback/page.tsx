"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAccessToken } from "@/services/authService";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSseStore } from "@/store/useSseStore";

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { connect } = useSseStore();

  // console.log("✅ 현재 URL에서 code 값 확인:", code);

  useEffect(() => {
    // console.log("✅ useEffect 실행됨");

    if (!code) {
      console.error("❌ 카카오 로그인 실패: code 값 없음");
      router.push("/main");
      return;
    }

    const handleKakaoLogin = async () => {
      try {
        // console.log("✅ 백엔드에 code 값 전송하여 access_token 요청 시작");
        const { isNewUser } = await getAccessToken(code);
        // console.log("✅ 로그인 완료", isNewUser);

        if (isNewUser) {
          // console.log("✅ 신규 회원 → 회원가입 페이지로 이동");
          router.push("/signup");
        } else {
          // console.log("✅ 기존 회원 → 홈으로 이동");

          // 실시간 알림

          connect();

          router.push("/home");
        }
      } catch (error) {
        console.error("❌ 카카오 로그인 요청 실패:", error);
        router.push("/main");
      }
    };

    handleKakaoLogin();
  }, [code, router]);

  return <LoadingSpinner />;
};

export default KakaoCallback;
