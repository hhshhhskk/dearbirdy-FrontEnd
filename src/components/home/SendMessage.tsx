import React from "react";
import HomeLetterIcon from "../Icons/Home_letter_icon";
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData: IUserData;
}

const SendMessage: React.FC<IProps> = ({ userData }) => {
  const quota = userData.quota ?? 0; // ✅ 기본값 0 설정

  return (
    <div className="flex justify-end w-full">
      <div
        className={`flex items-center gap-[2px] p-[4px_8px_4px_6px] rounded-[8px] bg-green01`}
      >
        <HomeLetterIcon fill="#292D32" />
        <span className="text-Caption1_B_12">{quota}개 남음</span>
      </div>
    </div>
  );
};

export default SendMessage;
