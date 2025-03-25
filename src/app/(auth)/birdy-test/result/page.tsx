"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import type { LottieRefCurrentProps } from "lottie-react";
import InfoBox from "@/components/common/InfoBox";
import BirdyResultCard from "@/components/signup/birdyTestTemp/BirdyResultCard";
import { Answer } from "@/constants/birdyTest";
import { useBirdyTestStore } from "@/store/useBirdyTestStore";
import { useSignupStore } from "@/store/useSignupStore";
import { processBirdyTestResults } from "@/util/birdyTestUtils";
import loadingResult from "@/animations/loading_result.json";
import { useEffect, useRef, useState } from "react";

export default function BirdyTestResultPage() {
  const { answers } = useBirdyTestStore();
  const { setBirdName, birdName } = useSignupStore();
  const { nickname } = useSignupStore();

  const [isClicked, setIsClicked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (!answers || answers.length === 0) return;

    try {
      const validAnswers: Answer[] = answers.map((a) => {
        if (a === null) return 0;
        return a;
      });

      const response = processBirdyTestResults(validAnswers);
      setBirdName(response.result.name);
    } catch (error) {
      console.error("Error processing test results:", error);
    }
  }, [answers, setBirdName]);

  const handleClick = () => {
    if (isClicked || !lottieRef.current) return;
    setIsClicked(true);
    lottieRef.current.play();
  };

  return (
    <div>
      <InfoBox
        imageSrc="/images/signup/bluebird-3.svg"
        altText="버디테스트 아이콘"
        text={`${nickname}님과 찰떡 궁합인 버디가 태어날 준비를 하고 있어요.\n우리 버디를 응원해주세요!`}
      />

      <h2 className="text-Title3_B_20 mt-[50px] text-center">
        알을 눌러서 버디를 깨워주세요!
      </h2>

      {/* ✅ 애니메이션 컨테이너 */}
      <div
        className={`flex justify-center cursor-pointer transition-all`}
        onClick={!isClicked ? handleClick : undefined}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={loadingResult}
          loop={false}
          autoplay={false}
          onComplete={() => setShowResult(true)}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          className="w-full max-w-[400px] fixed top-[5%]"
        />
      </div>

      {/* ✅ 결과 카드 - 애니메이션 위에 표시 */}
      {showResult && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <BirdyResultCard birdType={birdName} />
        </div>
      )}
    </div>
  );
}
