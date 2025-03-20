import Image from "next/image";
import React from "react";
const SendMessageLimit: React.FC = () => {
  return (
    <div className="flex justify-end w-full">
      <div className="flex justify-start items-center gap-[2px] p-[4px_8px_4px_6px] h-[32px] rounded-[8px] bg-[#FF2A2C]">
        <Image
          src="/images/icons/timer_icon.svg"
          alt="모래시계 아이콘"
          width={24}
          height={24}
        />
        <span className="text-[#FFF] text-center font-bold text-[12px] leading-[16px] tracking-[-0.048px]">
          서비스 이용 제한 N일 남음
        </span>
      </div>
    </div>
  );
};

export default SendMessageLimit;
