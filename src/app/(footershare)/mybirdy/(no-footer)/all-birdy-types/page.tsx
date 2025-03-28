"use client";

import CommonHeader from "@/components/layout/CommonHeader";
import Image from "next/image";

export default function AllBirdyTypesPage() {
  return (
    <div className="flex flex-col items-center">
      <CommonHeader title="버디 유형 모두 보기" noPadding />

      <Image
        src={`/images/my-birdy/birdy_collection.png`}
        alt="마이버디 새 버디 찾기"
        width={198}
        height={152}
        className="mt-6"
      />
      <p className="text-[#8E8E93] text-center text-base font-bold leading-[24px] tracking-[-0.064px] mt-5">
        곧 업데이트 예정이에요
      </p>
      <p className="text-[#8E8E93] text-center text-base font-normal leading-[24px] tracking-[-0.064px] mt-4">
        멋진 그림으로 찾아뵐게요.
        <br />
        모든 버디 유형이 궁금하다면 디어버디
        <br />
        인스타그램을 찾아주세요.
      </p>
      <div className="flex w-full p-[16px_20px] flex-col items-start rounded-[10px] border border-[#E5E5EA] bg-[#F0F1EC] mt-5">
        <p className="text-[#6B7178] text-xs font-normal leading-[16px] tracking-[-0.048px]">
          디어버디 인스타그램
        </p>
        <p className="text-[#6B7178] text-sm font-medium leading-[20px] tracking-[-0.056px] mt-1.5">
          @dearbirdy3
        </p>
      </div>
    </div>
  );
}
