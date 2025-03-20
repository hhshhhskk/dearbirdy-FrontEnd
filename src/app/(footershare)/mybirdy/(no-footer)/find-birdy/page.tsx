"use client";

import LeftArrow from "@/components/Icons/common/LeftArrow";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FindbirdyPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-4">
      <div className="relative flex justify-center items-center w-full h-[56px]  bg-[#f9f8f3]">
        <LeftArrow
          onClick={() => router.back()}
          className="absolute left-0 w-6 h-6 cursor-pointer"
          stroke="#292D32"
        />
        <p className="text-[#292D32] text-lg font-bold leading-[21.6px]">
          마이 버디 새롭게 찾기
        </p>
      </div>
      <Image
        src={`/images/my-birdy/new_mybirdy.png`}
        alt="마이버디 새 버디 찾기"
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
