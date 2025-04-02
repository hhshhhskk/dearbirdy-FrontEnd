"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeLetterIcon from "@/components/Icons/Home_letter_icon";
import SendMessage from "./SendMessage";
import SendMessageLimit from "./SendMessageLimit";
import { birdNameMap } from "@/constants/birdNameMap";
import { IUserData } from "@/app/(footershare)/home/page";
import StyledButton from "../ui/StyledButton";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false }); // 서버 사이드 렌더링 방지

interface HomeMainSectionProps {
  userData?: IUserData;
  userRole: "MENTOR" | "MENTEE";
  serviceLimit?: boolean;
}

export default function HomeMainSection({
  userData,
  userRole,
  serviceLimit = false,
}: HomeMainSectionProps) {
  const router = useRouter();

  const [animationData, setAnimationData] = useState(null);

  const buttonText = userRole === "MENTOR" ? "편지 보기" : "편지 쓰기";
  const buttonRoute = userRole === "MENTOR" ? "/letters" : "/send";
  const titleGreeting =
    userRole === "MENTOR"
      ? "고민을 들어주러 오셨군요!"
      : "오늘은 무슨 고민이 있나요?";

  /** ✅ 애니메이션 로드 */
  useEffect(() => {
    const myBirdName = userData?.birdName;
    if (!myBirdName) return; // ✅ myBirdName이 없으면 실행하지 않음

    const birdKey = birdNameMap[myBirdName] || "parrot";
    import(`@/animations/${birdKey}_main.json`)
      .then((data) => setAnimationData(data.default))
      .catch((err) => console.error("❌ 애니메이션 로드 실패:", err));
  }, [userData?.birdName]); // ✅ myBirdName이 설정된 후 실행

  return (
    <div
      className={`flex flex-col items-center px-global py-6 rounded-[24px] border border-line02 bg-white01`}
    >
      {serviceLimit ? (
        <SendMessageLimit />
      ) : (
        <SendMessage userData={userData as IUserData} />
      )}

      {/* <Image
        src={`/images/birds/home/${birdKey}.png`}
        alt="홈 나의 새 프로필사진"
        width={280}
        height={226}
        className="mb-6 mt-global"
      /> */}
      <div>
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>

      <div className="text-center mb-global">
        <p className="text-Body1_B_16 mb-[2px]">
          {userData?.nickname || "회원"}님,
        </p>
        <p className="text-Body0_B_18">{titleGreeting}</p>
      </div>

      <StyledButton
        onClick={() => router.push(buttonRoute)}
        className="flex items-center gap-1"
      >
        <HomeLetterIcon fill="#FFF" />
        <span className="text-Body1_M_16">{buttonText}</span>
      </StyledButton>
    </div>
  );
}
