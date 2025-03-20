"use client";

import loadingEgg from "@/animations/loading_egg.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false }); // 서버 사이드 렌더링 방지

interface LoadingSpinnerProps {
  message?: string; // 로딩 메시지 (선택)
  size?: number; // 애니메이션 크기 (선택)
}

const LoadingSpinner = ({
  message = "로딩 중...",
  size = 250,
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* ✅ 메시지 (없을 수도 있음) */}
      {message && (
        <p className="text-xl font-bold text-center text-[#292D32] mb-6">
          {message}
        </p>
      )}

      {/* ✅ Lottie 애니메이션 */}
      <div className={`w-[${size}px] h-[${size}px]`}>
        <Lottie animationData={loadingEgg} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
