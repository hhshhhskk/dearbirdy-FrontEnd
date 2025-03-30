"use client";

import SettingsMenu from "./settingsMenu";
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData?: IUserData;
}

const LetterHistory: React.FC<IProps> = ({ userData }) => {
  return (
    <div className="bg-white02 rounded-t-[20px] px-global py-8">
      <h2 className="text-Body1_M_16 mb-2">나의 편지 기록</h2>

      <div className="flex justify-between py-[14px] items-center rounded-2xl bg-[#F0F1EC] mb-[24px]">
        <div className="w-full flex flex-col justify-center items-center px-[20px] py-[5px] text-gray06">
          <span className="text-Body2_R_14 mb-2">보낸 편지</span>
          <span className="text-Body1_B_16">{userData?.sendLetter}</span>
        </div>

        <div className="w-[1px] h-[64px] bg-gray01" />

        <div className="w-full flex flex-col justify-center items-center px-[20px] py-[5px] text-gray06">
          <span className="text-Body2_R_14 mb-2">받은 편지</span>
          <span className="text-Body1_B_16">{userData?.replyLetter}</span>
        </div>
      </div>

      <SettingsMenu />
    </div>
  );
};
export default LetterHistory;
