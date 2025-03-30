"use client";

import CommonHeader from "@/components/layout/CommonHeader";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <CommonHeader title="내 정보 수정" addPaddingX />

      <div className="w-full bg-line01 px-global py-[10px]">
        <h2 className="text-Body1_M_16 text-gray06">닉네임</h2>
      </div>

      <div className="px-global">
        <div className="my-[14px] w-full bg-line02 border-1 border-gray01 rounded-[10px] px-5 py-global text-gray06">
          <p className="text-Caption1_R_12">현재 설정된 닉네임</p>

          <div className="flex justify-between items-center">
            <p className="text-Body1_B_18">사용자 닉네임</p>

            <button className="flex items-center pl-1 pr-2 py-1 gap-0.5 rounded-[6px] bg-black01">
              <Image
                src="/images/common/icon-edit.svg"
                alt="수정 아이콘"
                width={24}
                height={24}
              />
              <span className="text-gray01 text-Caption1_B_12">수정</span>
            </button>
          </div>
        </div>

        <ul className="list-outside list-disc ml-6 text-gray04 text-Body2_R_14">
          <li>
            <span>닉네임을 변경할 경우 14일 이후에 다시 변경할 수 있어요.</span>
          </li>
          <li>
            <span>특수문자는 사용할 수 없어요. (예: @, #, $, %, &, ~)</span>
          </li>
        </ul>
      </div>

      {/* <div className="w-full px-4 ">
        <button className="w-full px-4 py-[13px] bg-[#292D32] text-white text-[16px] leading-[24px] font-medium rounded-[12px] flex items-center justify-center select-none cursor-pointer">
          수정완료
        </button>
      </div> */}
    </>
  );
};

export default Page;
