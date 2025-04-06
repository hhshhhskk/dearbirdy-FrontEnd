"use client";

import loadingEgg from "@/animations/loading_wave.json";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false }); // 서버 사이드 렌더링 방지

interface LoadingWaveProps {
  message?: string;
  size?: number;
  minDuration?: number;
  onDone?: () => void;
}

const LoadingWave = ({
  message,
  size,
  minDuration = 3500,
  onDone,
}: LoadingWaveProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone?.(); // minDuration 후에 콜백
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onDone]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-99 bg-white02">
      <div className="flex flex-col items-center justify-center">
        {/* ✅ 메시지 (없을 수도 있음) */}
        {message && (
          <p className="mb-6 text-center whitespace-pre-wrap text-Title1_B_28">
            {message}
          </p>
        )}

        {/* ✅ Lottie 애니메이션 */}
        <div style={{ width: size, height: size }}>
          <Lottie animationData={loadingEgg} loop={true} autoplay={true} />
        </div>
      </div>
    </div>
  );
};

export default LoadingWave;
