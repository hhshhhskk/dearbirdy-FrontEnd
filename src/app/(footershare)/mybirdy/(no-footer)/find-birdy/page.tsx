"use client";

import CommonHeader from "@/components/layout/CommonHeader";
import Image from "next/image";

export default function FindbirdyPage() {
  return (
    <div className="flex flex-col items-center">
      <CommonHeader title="마이 버디 새롭게 찾기" noPadding />

      <Image
        src={`/images/my-birdy/new_mybirdy.png`}
        alt="마이 버디 새롭게 찾기"
        width={198}
        height={152}
        className="mt-6"
      />
      <p className="text-[#8E8E93] text-center text-base font-bold leading-[24px] tracking-[-0.064px] mt-5">
        곧 업데이트 예정이에요
      </p>
      <p className="text-[#8E8E93] text-center text-base font-normal leading-[24px] tracking-[-0.064px] mt-4">
        버디를 새롭게 찾고 싶다면
        <br />
        디어버디 고객센터에 문의해주세요.
        <br />
        빠르고 친절하게 해결해드릴게요.
      </p>
      <div className="flex w-full p-[16px_20px] flex-col items-start rounded-[10px] border border-[#E5E5EA] bg-[#F0F1EC] mt-5">
        <p className="text-[#6B7178] text-xs font-normal leading-[16px] tracking-[-0.048px]">
          디어버디 고객센터
        </p>
        <p className="text-[#6B7178] text-sm font-medium leading-[20px] tracking-[-0.056px] mt-1.5">
          dearbirdy@dearbirdy.xyz
        </p>
      </div>
    </div>
  );
}
