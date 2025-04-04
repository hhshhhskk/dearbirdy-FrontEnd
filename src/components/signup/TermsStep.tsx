"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StyledButton from "../ui/StyledButton";
import { useSignupStore } from "@/store/useSignupStore";

interface TermsItemProps {
  checked: boolean;
  label: string;
  onCheck: () => void;
  link: string;
}

const TermsItem = ({ checked, label, onCheck, link }: TermsItemProps) => (
  <div className="flex items-center justify-between w-full gap-2">
    <div
      className="flex items-center flex-grow gap-2 cursor-pointer"
      onClick={onCheck}
    >
      <Image
        src={
          checked
            ? "/images/terms/terms-icon_select.svg"
            : "/images/terms/terms-icon_check.svg"
        }
        alt={label}
        width={24}
        height={24}
      />
      <p className="text-Body2_R_14">{label}</p>
    </div>

    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="pl-3"
    >
      <Image
        src="/images/terms/arrow-right.svg"
        alt="약관 이동"
        width={24}
        height={24}
      />
    </Link>
  </div>
);

interface TermsStepProps {
  onClose?: () => void; // 선택적 속성으로 변경
  onMenteeNext?: () => void;
}

const TermsStep: React.FC<TermsStepProps> = ({ onClose, onMenteeNext }) => {
  const router = useRouter();
  const { userRole } = useSignupStore();

  const [isServiceChecked, setIsServiceChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const isAllChecked = isServiceChecked && isPrivacyChecked;

  /** ✅ 전체 동의 핸들러 */
  const handleAllCheck = () => {
    const newState = !isAllChecked;
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

  /** ✅ 약관 동의 후 모달 닫기 및 다음 단계 이동 */
  const handleNext = () => {
    if (isServiceChecked && isPrivacyChecked) {
      if (userRole === "MENTEE") {
        onMenteeNext?.();
      } else {
        router.push("/signup/user-category");
      }
    }
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[rgba(51,51,51,0.80)] z-999"
      onClick={onClose}
    >
      <div className="absolute bottom-[44px] w-full px-4 max-w-global">
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
          <p className="my-6 text-center text-Body0_M_18 text-white01">
            버디님, 약관동의 해주실 거죠?
          </p>
        </div>

        {/* ✅ 약관 동의 박스 */}
        <div onClick={(e) => e.stopPropagation()}>
          <div className="mb-8 w-full bg-white01 rounded-[20px] p-6">
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
                <p className="text-Body1_M_16">약관 전체 동의하기</p>
              </div>
            </div>

            <hr className="w-full my-4 border-gray01" />

            <div className="flex flex-col gap-[10px]">
              <TermsItem
                checked={isServiceChecked}
                label="(필수) 서비스 이용약관"
                onCheck={() => handleSingleCheck("service")}
                link="https://important-pansy-82d.notion.site/Dearbirdy-1b51b9cea31e80f2b442d5324f6ad1fe?pvs=4"
              />
              <TermsItem
                checked={isPrivacyChecked}
                label="(필수) 개인정보 처리방침"
                onCheck={() => handleSingleCheck("privacy")}
                link="https://important-pansy-82d.notion.site/Dearbirdy-1b51b9cea31e8094b4fefdacee285ff7?pvs=4"
              />
            </div>
          </div>

          <StyledButton
            onClick={handleNext}
            disabled={!isServiceChecked || !isPrivacyChecked}
          >
            다음
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default TermsStep;
