import React from "react";
import Image from "next/image";

const Limit: React.FC = () => {
  return (
    // 오버레이
    <div className="absolute w-full h-screen bg-[#333]/80 z-50">
      <div className="absolute bottom-0 w-full h-[360px] bg-[#F9F8F3] p-[24px_16px_44px_16px] rounded-t-[30px]">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-end w-full">
            <Image
              src="/images/icons/close_icon.svg"
              alt="X 아이콘"
              width={24}
              height={24}
              className=""
            />
          </div>
          <Image
            src="/images/icons/home_report_icon.svg"
            alt="신고 아이콘"
            width={61}
            height={60}
            className="mt-4"
          />
          <p className="flex justify-center items-center text-[#292D32] text-center text-[18px] font-bold leading-[26px] tracking-[-0.072px] mt-4">
            신고가 누적되어
            <br /> 서비스 이용이 제한되었어요.
          </p>
          <p className="text-[#6B7178] text-center text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-2 ">
            신고가 여러번 누적되어
            <br />
            7일간 서비스 이용이 제한됩니다.
          </p>

          <div className="flex w-full h-[50px] p-[13px_16px] justify-center items-center rounded-[12px] bg-[#292D32] mt-6">
            <span className="text-[#FFF] text-center text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
              확인
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limit;
