"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NextButton from "../common/NextButton";
import Link from "next/link";
import { useSignupStore } from "@/store/useSignupStore";

interface TermsStepProps {
  onClose?: () => void; // 선택적 속성으로 변경
  isModal?: boolean; // 모달 모드 여부
}

const TermsStep: React.FC<TermsStepProps> = ({ onClose, isModal = false }) => {
  const { nextStep } = useSignupStore();

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isServiceChecked, setIsServiceChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  /** ✅ 전체 동의 핸들러 */
  const handleAllCheck = () => {
    const newState = !isAllChecked;
    setIsAllChecked(newState);
    setIsServiceChecked(newState);
    setIsPrivacyChecked(newState);
  };

  /** ✅ 개별 동의 핸들러 */
  const handleSingleCheck = (type: "service" | "privacy") => {
    if (type === "service") {
      setIsServiceChecked(!isServiceChecked);
    } else {
      setIsPrivacyChecked(!isPrivacyChecked);
    }
  };

  /** ✅ 개별 약관이 모두 체크되면 `isAllChecked` 자동 설정 */
  useEffect(() => {
    if (isServiceChecked && isPrivacyChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [isServiceChecked, isPrivacyChecked]);

  /** ✅ 약관 동의 후 모달 닫기 및 다음 단계 이동 */
  const handleNext = () => {
    if (isServiceChecked && isPrivacyChecked) {
      if (isModal && onClose) {
        // 모달 모드일 때는 onClose를 호출
        // console.log("✅ 모달 모드: 약관 동의 완료, 모달 닫기");
        onClose();
      } else {
        // 단계 모드일 때는 nextStep 호출
        // console.log("✅ 단계 모드: 약관 동의 완료, 다음 단계로 이동");
        nextStep();
      }
    }
  };

  const containerClasses = isModal
    ? "absolute inset-0 flex items-center justify-center bg-[rgba(51,51,51,0.80)]"
    : "";

  return (
    <div className={containerClasses}>
      <div className="absolute bottom-[44px] w-full px-4 text-center rounded-lg">
        <div>
          {/* ✅ 캐릭터 이미지 */}
          <div className="mt-[50px] flex justify-center">
            <Image
              src="/images/signup/bluebird-2.svg"
              alt="약관 캐릭터"
              width={144}
              height={144}
            />
          </div>

          {/* ✅ 안내 텍스트 */}
          <p className="mt-6 text-lg font-medium leading-[26px] tracking-[-0.072px] text-[#fff]">
            버디님, 약관동의 해주실 거죠?
          </p>
        </div>

        <div className="flex justify-center">
          {/* ✅ 약관 동의 박스 */}
          <div className="w-full h-[162px] bg-[#F9F9F9] rounded-lg p-6 mt-6">
            {/* 전체 동의 */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={handleAllCheck}
            >
              <div className="flex items-center gap-2 select-none">
                <Image
                  src={
                    isAllChecked
                      ? "/images/terms/terms-icon-select_all.svg"
                      : "/images/terms/terms-icon_all.svg"
                  }
                  alt="전체 동의"
                  width={24}
                  height={24}
                />
                <p className="text-[16px] font-medium">약관 전체 동의하기</p>
              </div>
            </div>

            {/* 구분선 */}
            <div className="w-full h-[1.5px] bg-[#E5E5EA] my-4"></div>

            {/* 서비스 이용약관 */}
            <div className="select-none flex justify-between items-center mb-[10px]">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSingleCheck("service")}
              >
                <Image
                  src={
                    isServiceChecked
                      ? "/images/terms/terms-icon_select.svg"
                      : "/images/terms/terms-icon_check.svg"
                  }
                  alt="서비스 이용약관"
                  width={24}
                  height={24}
                />
                <p className="text-[14px] text-[#6B7178] font-medium">
                  (필수) 서비스 이용약관
                </p>
              </div>
              <Link
                href="https://important-pansy-82d.notion.site/Dearbirdy-1b51b9cea31e80f2b442d5324f6ad1fe?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/terms/arrow-right.svg"
                  alt="약관 이동"
                  width={24}
                  height={24}
                />
              </Link>
            </div>

            {/* 개인정보 처리방침 */}
            <div className="flex items-center justify-between select-none">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSingleCheck("privacy")}
              >
                <Image
                  src={
                    isPrivacyChecked
                      ? "/images/terms/terms-icon_select.svg"
                      : "/images/terms/terms-icon_check.svg"
                  }
                  alt="개인정보 처리방침"
                  width={24}
                  height={24}
                />
                <p className="text-[14px] text-[#6B7178] font-medium">
                  (필수) 개인정보 처리방침
                </p>
              </div>
              <Link
                href="https://important-pansy-82d.notion.site/Dearbirdy-1b51b9cea31e8094b4fefdacee285ff7?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/terms/arrow-right.svg"
                  alt="약관 이동"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ NextButton 적용 */}
        <div className="flex justify-center w-auto mt-[32px]">
          <NextButton
            text="다음"
            onClick={handleNext} // ✅ nextStep() + onClose() 실행
            disabled={!isServiceChecked || !isPrivacyChecked}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsStep;
