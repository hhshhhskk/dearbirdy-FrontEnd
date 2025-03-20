import React from "react";
import HomeLetterIcon from "../Icons/Home_letter_icon";
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData: IUserData;
}

const SendMessage: React.FC<IProps> = ({ userData }) => {
  const quota = userData.quota ?? 0; // ✅ 기본값 0 설정
  const widthClass = quota >= 10 ? "w-[90px]" : "w-[82px]";

  return (
    <div className="flex justify-end w-full">
      <div
        className={`flex justify-start items-center gap-[2px] p-[4px_8px_4px_6px] h-[32px] rounded-[8px] bg-[#D6E173] ${widthClass}`}
      >
        <HomeLetterIcon fill="#292D32" />
        <span className="text-[#292D32] text-center font-bold text-[12px] leading-[16px] tracking-[-0.048px]">
          {quota}개 남음
        </span>
      </div>
    </div>
  );
};

export default SendMessage;
