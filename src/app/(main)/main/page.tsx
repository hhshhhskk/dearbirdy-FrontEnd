"use client";

import Logo from "@/components/Icons/common/Logo";
import CustomKakaoLogin from "@/components/Icons/CustomKakaoLogin";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  // const accessToken = process.env.NEXT_PUBLIC_TOKEN;

  // ✅ 로그인된 사용자는 메인 페이지로 리디렉트
  useEffect(() => {
    if (accessToken) {
      router.push("/main");
    }
  }, [accessToken, router]);

  return (
    <div
      className="relative w-screen max-w-[476px] px-4"
      style={{
        backgroundImage: "url('/images/common/background_main.svg')",
        backgroundSize: "cover", // ✅ 화면을 가득 채우도록 설정
        backgroundPosition: "center", // ✅ 중앙 정렬
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // ✅ 최소 높이를 화면 전체로 설정하여 빈 공간 방지
      }}
    >
      <div className="flex flex-col items-center w-full min-h-screen ">
        {/* 로고 & 텍스트 */}
        <div className="flex flex-col items-center flex-1 gap-4 mt-[72px]">
          <Logo fill="white" className="w-40 h-12" />
          <h2 className="whitespace-break-spaces text-center text-lg text-[#F4F5EF] font-bold leading-[26px] tracking-[-0.072px]">
            편지로 연결되는 따뜻한 마음,{"\n"}인생 선후배들의 만남
          </h2>
        </div>

        <div className="mb-[44px] w-full h-[50px] flex flex-col items-center justify-center self-end">
          {/* 카카오 로그인 버튼 */}
          <div className="flex items-center justify-center w-full">
            <CustomKakaoLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
