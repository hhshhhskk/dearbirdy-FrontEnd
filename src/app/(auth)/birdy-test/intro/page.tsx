"use client";

import InfoBox from "@/components/common/InfoBox";
import StyledButton from "@/components/ui/StyledButton";
import { useSignupStore } from "@/store/useSignupStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupIntro() {
  const router = useRouter();
  const { nickname } = useSignupStore();

  return (
    <div className="flex flex-col h-screen pb-16">
      <InfoBox
        imageSrc="/images/signup/bluebird-3.svg"
        altText="버디테스트 아이콘"
        text={`당신에 대해 더 많은 것들이 궁금해요!\n${nickname}님만의 소중한 버디를 함께 알아보는 거 어때요?`}
      />

      <div className="relative flex flex-grow mx-8 mb-[44px]">
        <Image
          src="/images/birdy-test/intro.png"
          alt="파랑새 일러스트"
          fill
          className="object-contain"
        />
      </div>

      <div className="absolute bottom-[44px] left-0 right-0 px-global">
        <StyledButton onClick={() => router.push("/birdy-test/question/1")}>
          좋아요!
        </StyledButton>
      </div>
    </div>
  );
}
