"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Dialog from "../ui/Dialog";

interface IProps {
  onClose: () => void;
}

const LetterBackModal: React.FC<IProps> = ({ onClose }) => {
  const router = useRouter();

  return (
    <Dialog
      title="편지 작성화면에서 나가시겠어요?"
      message="편지 작성중에 나가면 작성된 내용은 저장되지 않아요. 그래도 나가시겠어요?"
      primaryButtonText="계속 작성"
      primaryButtonHandler={onClose}
      secondaryButtonText="나가기"
      secondaryButtonHandler={() => {
        router.replace("/home");
      }}
      onClose={onClose}
    />
  );
};

export default LetterBackModal;
