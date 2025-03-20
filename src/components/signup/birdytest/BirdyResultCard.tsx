"use client";
import { useFetchBirdData } from "@/app/hooks/useFetchBirdData";
import { useSignupStore } from "@/store/useSignupStore";
import { useEffect } from "react";
import BirdyImage from "./BirdyImage";
import BirdyTraits from "./BirdyTraits";
import BirdyResultActions from "./BirdyResultActions";
import { birdStyleMap, defaultBirdStyle } from "@/constants/birdStyles";

interface BirdyResultCardProps {
  birdType: string;
}

const BirdyResultCard = ({ birdType }: BirdyResultCardProps) => {
  const { setHideNav } = useSignupStore();
  const { birdData } = useFetchBirdData(birdType);

  // ✅ birdData가 null일 경우 기본 값 설정
  const defaultBirdData = {
    birdName: "익명새",
    traits: "특성 정보 불명",
    explanation: "정보 부족",
    color: "#000000",
    background: "#FFFFFF",
  };

  const userBirdData = birdData || defaultBirdData;

  // ✅ birdData의 traits 값을 기반으로 색상 동적으로 가져오기
  const birdStyle = birdStyleMap[userBirdData.birdName] || defaultBirdStyle;

  useEffect(() => {
    setHideNav(true);
    return () => setHideNav(false);
  }, [setHideNav]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[343px] bg-[#F9F8F3] rounded-[30px] shadow-[0px_0px_20px_0px_rgba(107,107,107,0.10)] p-4 mb-17">
        <p className="mt-8 text-center text-[#6B7178] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
          나의 버디는
        </p>

        <BirdyImage birdName={userBirdData?.birdName || ""} />
        <BirdyTraits
          birdName={userBirdData.birdName}
          traits={userBirdData.traits}
          explanation={userBirdData.explanation}
          color={birdStyle.color} // ✅ 조건부 색상 적용
          background={birdStyle.background} // ✅ 조건부 배경색 적용
        />
      </div>

      <BirdyResultActions birdData={userBirdData} />
    </div>
  );
};

export default BirdyResultCard;
