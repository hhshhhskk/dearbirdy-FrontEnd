"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import loadingEgg from "@/animations/loading_egg.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false }); // ✅ 서버 사이드 렌더링 방지

export default function RootPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const lottieRef = useRef(null);

  useEffect(() => {
    // ✅ 클라이언트 환경인지 확인 (Next.js는 SSR에서 실행될 수도 있음)
    if (typeof window !== "undefined") {
      const onboardingComplete = localStorage.getItem("onboardingComplete");

      if (!onboardingComplete) {
        // console.log("✅ 온보딩이 필요함 → /onboarding 이동");
        router.replace("/onboarding"); // ✅ router.push → router.replace로 변경 (뒤로 가기 방지)
      } else {
        // console.log("✅ 온보딩 완료된 사용자 → /main 이동");
        router.replace("/main");
      }

      setLoading(false);
    }
  }, [router]);

  // ✅ 로딩 화면 추가하여 화면 깜빡임 방지
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={loadingEgg}
          loop={true}
          autoplay={true}
        />
      </div>
    );
  }

  return null;
}
