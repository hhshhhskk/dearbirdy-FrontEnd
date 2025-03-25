"use client";

import { postReport } from "@/services/letterDetail";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IProps {
  showReportModal: boolean;
  setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>;
  letterSeq: number;
}

const LetterReport: React.FC<IProps> = ({
  showReportModal,
  setShowReportModal,
  letterSeq,
}) => {
  const text = [
    { code: "EMERGENCY", description: "위급한 상황이라고 판단" },
    { code: "IRRELEVANT", description: "주제와 맞지 않는 내용" },
    { code: "ABUSIVE", description: "욕설 / 비하발언 / 특정인 비방" },
    { code: "SOLICITATION", description: "만남 유도나 금전 거래" },
    { code: "OBSCENE", description: "외설적 / 음란성 / 성희롱적 표현" },
    { code: "ADVERTISEMENT", description: "광고성 / 홍보성" },
    { code: "OTHER", description: "기타" },
  ];
  const [checkNum, setCheckNum] = useState<number>(0);
  const [reportCompleted, setReportCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showReportModal]);

  return (
    <div className="">
      <div className="absolute w-full inset-0 z-10 bg-[rgba(51,51,51,0.80)]"></div>

      <div className="absolute w-full h-screen z-15">
        <div className="absolute bottom-0 left-0 z-20 flex w-full p-[24px_16px_44px_16px] flex-col items-center  rounded-t-[30px] rounded-b-none bg-[#FFF]">
          <div className="flex justify-end w-full">
            <Image
              src="/images/icons/close_icon.svg"
              alt="닫기 아이콘"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => {
                setShowReportModal(false);
                setReportCompleted(false);
              }}
            />
          </div>
          {reportCompleted ? (
            <>
              <Image
                src="/images/icons/big_check_icon.svg"
                alt="큰 체크 아이콘"
                width={60}
                height={60}
                className="mt-4 cursor-pointer"
              />
              <p className="text-[#292D32] text-center font-pretendard text-[18px] font-bold leading-[26px] tracking-[-0.072px] mt-3.5">
                신고를 접수했습니다
              </p>
              <p className="text-[#6B7178] text-center  text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-2">
                운영팀에서 확인 후 조치를 취하도록 할게요. 앞으로도 안전하고
                깨끗한 디어버디가 되기위해 노력하겠습니다.
              </p>
              <div
                className="cursor-pointer flex justify-center w-full px-4 py-[13px] rounded-[12px] bg-[#292D32] mt-6 mb-[20px]"
                onClick={() => {
                  setShowReportModal(false);
                  setReportCompleted(false);
                }}
              >
                <span className="text-white text-center font-medium text-[16px] leading-[24px] tracking-[-0.064px] ">
                  확인
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="text-[#292D32] text-center text-[18px] font-bold leading-[26px] tracking-[-0.072px] mt-4">
                이 편지를 신고하는 이유를 알려주세요
              </p>
              <p className="text-[#6B7178] text-center text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-2">
                버디님의 신고는 익명으로 처리돼요.
              </p>
              <div className="flex flex-col w-full mt-6 mb-6">
                {text.map((text, idx) => {
                  return (
                    <div key={idx}>
                      <div className="flex gap-1">
                        <Image
                          src={`/images/icons/check_${
                            checkNum === idx + 1 ? "on" : "off"
                          }_icon.svg`}
                          alt="체크 아이콘"
                          width={24}
                          height={24}
                          className="cursor-pointer"
                          onClick={() => {
                            if (checkNum === idx + 1) {
                              setCheckNum(0);
                            } else {
                              setCheckNum(idx + 1);
                            }
                          }}
                        />
                        <div className="flex items-center">
                          <p
                            className={`${
                              checkNum === idx + 1
                                ? "text-[#84A667]"
                                : "text-[#292D32]"
                            } text-center font-medium text-[14px] leading-[20px] tracking-[-0.056px]`}
                          >
                            {text.description}
                          </p>
                        </div>
                      </div>
                      <div className="h-[1px] bg-[#F0F1EC] mt-2 mb-2"></div>
                    </div>
                  );
                })}
              </div>
              {checkNum !== 0 ? (
                // 클릭 가능
                <div
                  className="cursor-pointer flex justify-center w-full px-4 py-[13px] rounded-[12px] bg-[#292D32] mb-[20px]"
                  onClick={() => {
                    postReport(letterSeq, text[checkNum - 1].code);
                    setReportCompleted(true);
                  }}
                >
                  <span className="text-white text-center font-medium text-[16px] leading-[24px] tracking-[-0.064px]">
                    신고하기
                  </span>
                </div>
              ) : (
                <div className="flex justify-center w-full px-4 py-[13px] rounded-[12px] bg-[#EBEBEE] mb-[20px]">
                  <span className="text-[#C7C7CC] text-center font-medium text-[16px] leading-[24px] tracking-[-0.064px]">
                    신고하기
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetterReport;
