"use client";

import { getThrow } from "@/services/letterDetail";
import React from "react";

interface IProps {
  letterStatusSeq: number;
  setShowThrowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowThrowAfterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThrowModal: React.FC<IProps> = ({
  letterStatusSeq,
  setShowThrowModal,
  setShowThrowAfterModal,
}) => {
  const throwClicked = () => {
    try {
      const ThrowReply = async () => {
        const res = await getThrow(letterStatusSeq);
        console.log(res);
      };
      ThrowReply();
      setShowThrowModal(false);
      setShowThrowAfterModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-70 bg-[rgba(51,51,51,0.80)]
      flex justify-center items-center"
      >
        <div className="mx-global flex p-[20px_16px] flex-col items-start rounded-[18px] border border-[#F0F1EC] bg-white">
          <p className="text-[#292D32] font-bold text-[18px] leading-[26px] tracking-[-0.072px]">
            편지 답장을 다른 새에게 맡기시겠어요?
          </p>
          <p className="text-[#6B7178] font-normal text-[14px] leading-[22px] tracking-[-0.056px] mt-2">
            답장하기가 어렵다고 느끼셨나요? 해당 편지의 버디의 고민을 다른
            인생선배 버디가 들어주게 돼요.
          </p>
          <div className="flex items-center justify-center w-full gap-2 mt-4">
            <div
              className="cursor-pointer flex flex-1 p-[11px_15px] justify-center items-center rounded-[10px] border border-[#C7C7CC] bg-[#FFF]"
              onClick={() => setShowThrowModal(false)}
            >
              <span className="text-[#292D32] text-center font-medium text-[14px] leading-[20px] tracking-[-0.056px]">
                취소하기
              </span>
            </div>
            <div
              className="cursor-pointer flex flex-1 p-[11px_15px] justify-center items-center rounded-[10px] bg-[#292D32]"
              onClick={throwClicked}
            >
              <span className="text-[#FFF] text-center font-medium text-[14px] leading-[20px] tracking-[-0.056px]">
                다른 새에게 맡기기
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThrowModal;
