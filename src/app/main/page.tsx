"use client";

import Logo from "@/components/Icons/common/Logo";
import CustomKakaoLogin from "@/components/Icons/CustomKakaoLogin";
import CommonLayout from "@/components/layout/CommonLayout";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  // ✅ 로그인된 사용자는 메인 페이지로 리디렉트
  useEffect(() => {
    if (accessToken) {
      router.push("/main");
    }
  }, [accessToken, router]);

  return (
    <CommonLayout
      noPadding
      isFullScreen
      bottomFixedButton={<CustomKakaoLogin />}
    >
      <img
        src="/images/common/background_main.svg"
        alt="배경"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="px-global relative z-10 top-[131px] flex flex-col items-center">
        <Logo fill="white" className="w-[180px] h-[48px] mb-global" />
        <h2 className="text-center text-Body0_B_18 text-line01 whitespace-pre-wrap">
          편지로 연결되는 따뜻한 마음,{"\n"}인생 선후배들의 만남
        </h2>
      </div>
    </CommonLayout>
  );
}
