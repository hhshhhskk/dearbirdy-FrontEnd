"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  setShowThrowAfterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThrowAfterModal: React.FC<IProps> = ({ setShowThrowAfterModal }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-20 bg-[rgba(51,51,51,0.80)] flex justify-center items-center">
      <div className="flex flex-1 p-[20px_16px] flex-col items-start rounded-[18px] border border-[#F0F1EC] bg-white">
        <p className="text-[#292D32] font-bold text-[18px] leading-[26px] tracking-[-0.072px]">
          다른 버디에게로 편지가 전해졌어요!
        </p>
        <p className="text-[#6B7178] font-pretendard text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-2">
          편지가 무사히 다른 버디에게로 갔어요. 당신의 조언으로 지금까지 도움을
          얻어온 다른 버디들처럼 지금 인생후배 버디의 고민이 더욱 좋은 방향으로
          도움을 받고 해결될 수 있도록 함께 소원해주세요.
        </p>
        <div
          className="cursor-pointer rounded-[10px] bg-[#292D32] p-[11px_16px] flex-col justify-center items-center mt-4"
          onClick={() => {
            router.push("/home");
            setShowThrowAfterModal(false);
          }}
        >
          <span className="text-center text-white font-pretendard text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
            홈으로
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThrowAfterModal;
