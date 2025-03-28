"use client";

import SettingsMenu from "./settingsMenu";
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData?: IUserData;
}

const LetterHistory: React.FC<IProps> = ({ userData }) => {
  return (
    <div className="flex flex-col flex-wrap gap-6 ">
      <div>
        <div className="flex flex-col gap-2 ">
          <p className="text-[#292D32] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
            나의 편지 기록
          </p>
          <div className="flex justify-between py-[14px] items-center rounded-2xl bg-[#F0F1EC]">
            <div className="w-full flex flex-col justify-center items-center px-[20px] py-[5px] text-gray06">
              <span className="text-Body2_R_14 mb-2">보낸 편지</span>
              <span className="text-Body1_B_16">{userData?.sendLetter}</span>
            </div>

            <div className="w-[1px] h-[64px] bg-[#E5E5EA]"></div>

            <div className="w-full flex flex-col justify-center items-center px-[20px] py-[5px] text-gray06">
              <span className="text-Body2_R_14 mb-2">받은 편지</span>
              <span className="text-Body1_B_16">{userData?.replyLetter}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ⚙️ 설정 메뉴 */}
      <div className="bg-white rounded-[20px]">
        <SettingsMenu />
      </div>
    </div>
  );
};
export default LetterHistory;
