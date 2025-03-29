"use client";

import InfoBox from "@/components/common/InfoBox";
import BottomFixedElement from "@/components/layout/BottomFixedElement";
import StyledButton from "@/components/ui/StyledButton";
import { useSignupStore } from "@/store/useSignupStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BirdyTestIntro() {
  const router = useRouter();
  const { nickname } = useSignupStore();

  return (
    <>
      <div
        className="flex flex-col pb-[96px]"
        style={{ height: "calc(100svh - 56px)" }}
      >
        <InfoBox
          imageSrc="/images/signup/bluebird-3.svg"
          altText="버디테스트 아이콘"
          text={`당신에 대해 더 많은 것들이 궁금해요!\n${nickname}님만의 소중한 버디를 함께 알아보는 거 어때요?`}
        />

        <div className="relative flex flex-1 m-8">
          <Image
            src="/images/birdy-test/intro.png"
            alt="파랑새 일러스트"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <BottomFixedElement>
        <StyledButton onClick={() => router.push("/birdy-test/question/1")}>
          좋아요!
        </StyledButton>
      </BottomFixedElement>
    </>
  );
}
