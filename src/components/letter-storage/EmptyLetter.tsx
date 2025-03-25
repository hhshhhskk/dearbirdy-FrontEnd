import Image from "next/image";
import React from "react";

const EmptyLetter: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen mt-2">
      <Image
        src="/images/icons/storage/storage_letter_icon.svg"
        alt="엠티케이스 편지 아이콘"
        width={70}
        height={70}
        className="mt-[54px]"
      />
      <span className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-4">
        답장을 해야하는 편지가 없어요
      </span>
    </div>
  );
};

export default EmptyLetter;
