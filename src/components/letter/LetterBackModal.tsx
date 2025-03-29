"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  setBackModal: React.Dispatch<React.SetStateAction<boolean>>;
  setStep?: (step: number) => void;
}

const LetterBackModal: React.FC<IProps> = ({ setBackModal, setStep }) => {
  const router = useRouter();
  return (
    <>
      {/* 오버레이 */}
      <div
        className="absolute inset-0  z-20 bg-[rgba(51,51,51,0.80)]
      flex justify-center items-center -mx-4"
      >
        <div className="flex w-[328px] p-[20px_16px] flex-col items-start rounded-[18px] border border-[#F0F1EC] bg-white">
          <p className="text-[#1d1d1d] text-Body1_B_16">
            편지 작성화면에서 나가시겠어요?
          </p>
          <p className="text-[#1d1d1d] text-Body1_R_16 mt-2">
            편지 작성중에 나가면 내용은 저장되지 않아요. 그래도 나가시겠어요?
          </p>
          <div className="flex items-center justify-center w-full gap-2 mt-4">
            <div
              className="flex w-[140px] h-[44px] p-[11px_15px] justify-center items-center rounded-[10px] border border-[#84A667] bg-[#FFF]"
              onClick={() => {
                router.push("/home");
                setBackModal(false);
                if (setStep) {
                  setStep(1);
                }
              }}
            >
              <span className="text-[#84A667] text-center font-medium text-[14px] leading-[20px] tracking-[-0.056px]">
                나가기
              </span>
            </div>
            <div
              className="flex w-[140px] h-[44px] p-[11px_15px] justify-center items-center rounded-[10px] bg-[#292D32]"
              onClick={() => setBackModal(false)}
            >
              <span className="text-[#FFF] text-center font-medium text-[14px] leading-[20px] tracking-[-0.056px]">
                계속 작성
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LetterBackModal;
