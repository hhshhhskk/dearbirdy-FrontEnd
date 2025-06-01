"use client";

import { useState } from "react";
import CommonHeader from "@/components/layout/CommonHeader";
import Image from "next/image";
import { faqList } from "@/constants/faqList";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <CommonHeader title="FAQ" addPaddingX />
      <div className="bg-line01">
        {faqList.map((item, index) => (
          <div key={index} className="px-4 py-4 ">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-Body1_M_16">{item.question}</span>
              <Image
                src="/images/icons/arrow_down_black.svg"
                alt="toggle"
                width={24}
                height={24}
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === index && (
              <div className="mt-2 leading-relaxed text-Body1_R_16 text-black01">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div className="bg-white02 border border-line02 rounded-[18px] px-4 py-5 mx-4 mt-16">
        <div className="text-Body1_B_16 text-black01">
          고객센터로 직접 질문 보내기
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-Body2_R_14 text-gray06">
            자주 물어보는 질문 외에 다른 도움이 필요하신가요? 궁금한 점이나
            개선사항을 자유롭게 작성해주세요.
          </div>
          <div className="text-Body2_M_14 text-gray03 bg-gray00 p-2.5 text-center rounded-[10px]">
            질문 보내기
          </div>
        </div>
      </div> */}
    </>
  );
}
