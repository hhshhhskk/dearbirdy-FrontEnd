"use client";

import { useFetchBirdData } from "@/app/hooks/useFetchBirdData";
import { birdStyleMap, defaultBirdStyle } from "@/constants/birdStyles";
import BirdyImage from "./BirdyImage";
import BirdyResultActions from "./BirdyResultActions";

// ✅ birdData가 null일 경우 기본 값 설정
const defaultBirdData = {
  birdName: "익명새",
  traits: "특성 정보 불명",
  explanation: "정보 부족",
  color: "#000000",
  background: "#FFFFFF",
};

interface BirdyResultCardProps {
  birdType: string;
}

const BirdyResultCard = ({ birdType }: BirdyResultCardProps) => {
  const { birdData } = useFetchBirdData(birdType);

  const userBirdData = birdData || defaultBirdData;

  // ✅ birdData의 traits 값을 기반으로 색상 동적으로 가져오기
  const birdStyle = birdStyleMap[userBirdData.birdName] || defaultBirdStyle;

  return (
    <div className="bg-[#ffffff80] w-full min-h-screen flex justify-center items-center px-global">
      <div className="bg-white02 rounded-[30px] shadow-[0px_0px_20px_0px_rgba(107,107,107,0.10)] py-8 px-global mb-17">
        <p className="mb-global text-center text-gray06 text-Body2_R_14">
          나의 버디는
        </p>

        <BirdyImage birdName={userBirdData?.birdName || ""} />

        <div className="flex flex-col justify-center gap-2 mt-[10px] mb-[24px]">
          <div
            className="text-Caption1_M_12 px-[6px] py-[2px] rounded-[4px] self-center"
            style={{
              color: birdStyle.color,
              backgroundColor: birdStyle.background,
            }}
          >
            {userBirdData.traits}
          </div>

          <h2 className="text-Title3_B_20 self-center">
            {userBirdData.birdName}
          </h2>
        </div>

        <p className="text-Body2_R_14">{userBirdData.explanation}</p>
      </div>

      <BirdyResultActions />
    </div>
  );
};

export default BirdyResultCard;
