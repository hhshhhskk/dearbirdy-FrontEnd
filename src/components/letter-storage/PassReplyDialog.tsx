"use client";

import { getThrow } from "@/services/letterDetail";
import React, { useState } from "react";
import Dialog from "../ui/Dialog";
import { useRouter } from "next/navigation";

interface IProps {
  letterStatusSeq: number;
  onClose: () => void;
}

const PassReplyDialog: React.FC<IProps> = ({ letterStatusSeq, onClose }) => {
  const router = useRouter();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const passReplyConfirmHandler = () => {
    try {
      const passReply = async () => {
        const res = await getThrow(letterStatusSeq);
        console.log(res);
      };

      passReply();
      onClose();
      setIsConfirmationOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        title="편지 답장을 다른 새에게 맡기시겠어요?"
        message="답장하기가 어렵다고 느끼셨나요? 해당 편지의 버디의 고민을 다른 인생선배 버디가 들어주게 돼요."
        primaryButtonText="다른 새에게 맡기기"
        primaryButtonHandler={passReplyConfirmHandler}
        secondaryButtonText="취소하기"
        secondaryButtonHandler={onClose}
        onClose={onClose}
      />

      {isConfirmationOpen && (
        <Dialog
          title="다른 버디에게로 편지가 전해졌어요!"
          message="편지가 무사히 다른 버디에게로 갔어요. 당신의 조언으로 지금까지 도움을
          얻어온 다른 버디들처럼 지금 인생후배 버디의 고민이 더욱 좋은 방향으로
          도움을 받고 해결될 수 있도록 함께 소원해주세요."
          primaryButtonText="홈으로"
          primaryButtonHandler={() => router.push("/home")}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default PassReplyDialog;
