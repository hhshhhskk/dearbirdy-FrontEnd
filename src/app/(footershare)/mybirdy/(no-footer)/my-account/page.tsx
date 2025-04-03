"use client";

import CommonHeader from "@/components/layout/CommonHeader";
import Image from "next/image";

const Page = () => {
  return (
    // <>
    //   <CommonHeader title="내 정보 수정" addPaddingX />

    //   <div className="w-full bg-line01 px-global py-[10px]">
    //     <h2 className="text-Body1_M_16 text-gray06">닉네임</h2>
    //   </div>

    //   <div className="px-global">
    //     <div className="my-[14px] w-full bg-line02 border-1 border-gray01 rounded-[10px] px-5 py-global text-gray06">
    //       <p className="text-Caption1_R_12">현재 설정된 닉네임</p>

    //       <div className="flex items-center justify-between">
    //         <p className="text-Body1_B_18">사용자 닉네임</p>

    //         <button className="flex items-center pl-1 pr-2 py-1 gap-0.5 rounded-[6px] bg-black01">
    //           <Image
    //             src="/images/common/icon-edit.svg"
    //             alt="수정 아이콘"
    //             width={24}
    //             height={24}
    //           />
    //           <span className="text-gray01 text-Caption1_B_12">수정</span>
    //         </button>
    //       </div>
    //     </div>

    //     <ul className="ml-6 list-disc list-outside text-gray04 text-Body2_R_14">
    //       <li>
    //         <span>닉네임을 변경할 경우 14일 이후에 다시 변경할 수 있어요.</span>
    //       </li>
    //       <li>
    //         <span>특수문자는 사용할 수 없어요. (예: @, #, $, %, &, ~)</span>
    //       </li>
    //     </ul>
    //   </div>

    //   {/* <div className="w-full px-4 ">
    //     <button className="w-full px-4 py-[13px] bg-[#292D32] text-white text-[16px] leading-[24px] font-medium rounded-[12px] flex items-center justify-center select-none cursor-pointer">
    //       수정완료
    //     </button>
    //   </div> */}
    // </>
    <div className="flex flex-col items-center px-global">
      <CommonHeader title="닉네임 수정" />
      <div className="w-full bg-line01 px-global py-[10px]">
        <h2 className="text-Body1_M_16 text-gray06">닉네임</h2>
      </div>
      <Image
        src={`/images/my-birdy/birdy_coding.png`}
        alt="닉네임 수정"
        width={198}
        height={152}
        className="mt-6"
      />
      <p className="text-[#8E8E93] text-center text-base font-bold leading-[24px] tracking-[-0.064px] mt-5">
        닉네임 변경은 준비 중이에요
      </p>
      <p className="text-[#8E8E93] text-center text-base font-normal leading-[24px] tracking-[-0.064px] mt-4">
        얼른 만들어서 재치있는 새로운 닉네임을
        <br />
        설정할 수 있도록 해드릴게요.
        <br />
        조금만 기다려주세요!
      </p>
    </div>
  );
};

export default Page;
