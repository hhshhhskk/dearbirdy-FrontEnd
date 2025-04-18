"use client";

import Image from "next/image";
import ActionSheet from "../ui/ActionSheet";
import React, { useState } from "react";
import { getWithDrawal } from "@/services/myBirdy";

interface LogOutModalProps {
  isOpen: boolean;
  setLeaveCompleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export default function LeaveModal({
  isOpen,
  setLeaveCompleteModal,
  onClose,
}: LogOutModalProps) {
  const [leave, setLeave] = useState(false);
  const [checkNum, setCheckNum] = useState(0);
  const text = [
    {
      id: 1,
      withdrawalType: "NO_DESIRED_ACTIVITY",
      description: "원하는 활동이 없어요",
    },
    {
      id: 2,
      withdrawalType: "NOT_HELPFUL_FOR_PROBLEMS",
      description: "고민을 해결하는데 도움이 안돼요",
    },
    {
      id: 3,
      withdrawalType: "INCONVENIENT_SERVICE",
      description: "서비스를 이용하기가 불편해요",
    },
    { id: 4, withdrawalType: "OTHER", description: "기타" },
  ];

  return (
    <ActionSheet isOpen={isOpen} onClose={onClose}>
      {/* 탈퇴하기 두번째 모달 */}
      {leave ? (
        <div className="mt-6">
          <div className="text-center text-Body0_B_18">
            탈퇴하시려는 사유를 선택해주세요
          </div>
          <div className="mt-6">
            {text.map((text, idx) => {
              return (
                <div
                  key={text.id}
                  className="cursor-pointer"
                  onClick={() => {
                    if (checkNum === idx + 1) {
                      setCheckNum(0);
                    } else {
                      setCheckNum(idx + 1);
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Image
                      src={`/images/icons/check_${
                        checkNum === idx + 1 ? "on" : "off"
                      }_icon.svg`}
                      alt="체크 아이콘"
                      width={24}
                      height={24}
                    />
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
                  <div className="h-[1px] bg-[#F0F1EC] mt-2 mb-2"></div>
                </div>
              );
            })}
          </div>
          <div className="flex w-full gap-2 mt-6 text-center text-white text-Body2_M_14">
            <div
              className="w-full py-3 bg-black01 rounded-[10px]"
              onClick={() => {
                setLeaveCompleteModal(true);
                onClose();
                getWithDrawal(text[checkNum - 1].withdrawalType);
              }}
            >
              탈퇴하기
            </div>
            <div
              className="w-full py-3 bg-white border border-gray03 text-gray03 rounded-[10px]"
              onClick={onClose}
            >
              탈퇴취소
            </div>
          </div>
        </div>
      ) : (
        // 탈퇴하기 첫번째 모달
        <>
          <div className="flex flex-col items-center gap-2 my-global">
            <Image
              src="/images/my-birdy/leave_bird.png"
              alt="울고있는 새"
              width={50}
              height={60}
            />
          </div>
          <div className="mt-8.5">
            <div className="text-center text-Body0_B_18">
              디어버디를 탈퇴하시겠어요?
            </div>
            <div className="mt-2 text-Body2_R_14 text-gray06">
              <div>
                · 30일 이내에 재가입시 그 동안의 활동, 편지들은 다시 확인할 수
                있습니다.
              </div>
              <div>
                · 인생후배로부터 받은 편지가 있을 경우, 탈퇴 완료 시 자동으로
                다른 인생선배에게 전달됩니다.
              </div>
            </div>
            <div className="flex w-full gap-2 mt-6 text-center text-white text-Body2_M_14">
              <div
                className="w-full py-3 bg-black01 rounded-[10px]"
                onClick={() => setLeave(true)}
              >
                탈퇴하기
              </div>
              <div
                className="w-full py-3 bg-white border border-gray03 text-gray03 rounded-[10px]"
                onClick={onClose}
              >
                탈퇴취소
              </div>
            </div>
          </div>
        </>
      )}
    </ActionSheet>
  );
}
