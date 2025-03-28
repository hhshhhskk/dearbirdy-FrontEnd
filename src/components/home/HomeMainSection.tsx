"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HomeLetterIcon from "@/components/Icons/Home_letter_icon";
import Image from "next/image";
import SendMessage from "./SendMessage";
import SendMessageLimit from "./SendMessageLimit";
import { birdNameMap } from "@/constants/birdNameMap";
import { IUserData } from "@/app/(footershare)/home/page";
import StyledButton from "../ui/StyledButton";

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

  const birdKey = userData?.birdName
    ? birdNameMap[userData.birdName]
    : "default";

  const buttonText = userRole === "MENTOR" ? "편지 보기" : "편지 쓰기";
  const buttonRoute = userRole === "MENTOR" ? "/letters" : "/send";
  const titleGreeting =
    userRole === "MENTOR"
      ? "고민을 들어주러 오셨군요!"
      : "오늘은 무슨 고민이 있나요?";

  return (
    <div
      className={`flex flex-col items-center px-global py-6 rounded-[24px] border border-line02 bg-white01`}
    >
      {serviceLimit ? (
        <SendMessageLimit />
      ) : (
        <SendMessage userData={userData as IUserData} />
      )}

      <Image
        src={`/images/birds/home/${birdKey}.png`}
        alt="홈 나의 새 프로필사진"
        width={280}
        height={226}
        className="mt-global mb-6"
      />

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
