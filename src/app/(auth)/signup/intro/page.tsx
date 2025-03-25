"use client";

import StyledButton from "@/components/ui/StyledButton";
import { useRouter } from "next/navigation";

export default function SignupIntro() {
  const router = useRouter();

  return (
    <div className="mt-2">
      <div className="text-center whitespace-pre-wrap">
        <p className="text-Title2_B_24">
          {`안녕? 반가워요\n나는 편지를 전하는 파랑새예요`}
        </p>
        <p className="text-Body0_R_18 mt-3">
          {`진솔하게 털어 놓은 고민이 잘 전달될 수 있도록\n몇 가지 질문에 답변 부탁드려요`}
        </p>
      </div>

      <div className="mt-[66px] w-[80%] mx-auto">
        <img
          src="/images/common/background_bluebird.png"
          alt="파랑새 일러스트"
        />
      </div>

      <div className="absolute bottom-[44px] left-0 right-0 px-global">
        <StyledButton onClick={() => router.push("/signup/nickname")}>
          좋아요!
        </StyledButton>
      </div>
    </div>
  );
}
