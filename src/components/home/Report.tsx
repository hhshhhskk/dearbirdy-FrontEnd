import React from "react";
import Image from "next/image";

const Report: React.FC = () => {
  return (
    // 오버레이
    <div className="absolute w-full h-screen bg-[#333]/80 z-50">
      <div className="absolute bottom-0 w-full h-[334px] bg-[#F9F8F3] p-[24px_16px_44px_16px] rounded-t-[30px] animate-slideUp">
        <div className="w-full flex flex-col justify-center items-center">
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
            width={60}
            height={60}
            className="mt-4"
          />
          <p className="flex justify-center items-center text-[#292D32] text-[18px] font-bold leading-[26px] tracking-[-0.072px] mt-4">
            다른 버디에게 신고를 받았어요.
          </p>
          <p className="text-[#6B7178] text-center text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-2 ">
            신고가 여러번 누적되면 서비스 이용에 제한이 생길 수 있어요.
            <br />
            따뜻한 말과 부드러운 태도로 버디를 대해주세요.
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

export default Report;
