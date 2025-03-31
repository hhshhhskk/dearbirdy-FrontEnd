"use client";

import { useRouter } from "next/navigation";
import BottomFixedElement from "../layout/BottomFixedElement";
import { useState } from "react";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import Image from "next/image";
import StyledButton from "../ui/StyledButton";
import PassReplyDialog from "./PassReplyDialog";

interface ReplyButtonDivProps {
  recipientName: string;
  myBirdType: string;
  categoryName: string;
  letterStatusSeq: number;
}

export default function ReplyButtonDiv({
  recipientName,
  myBirdType,
  categoryName,
  letterStatusSeq,
}: ReplyButtonDivProps) {
  const router = useRouter();

  const { setBirdName, setNickname, setCategoryName, setLetterStatusSeq } =
    useLetterInfoStore();

  const [isPassReplyDialogVisible, setIsPassReplyDialogVisible] =
    useState(false);

  const replyButtonHandler = () => {
    router.push("/reply");
    setLetterStatusSeq(letterStatusSeq);
    setCategoryName(categoryName);
    setBirdName(myBirdType);
    setNickname(recipientName);
  };
  
  return (
    <>
      <div>
        <div className="h-[140px]" />

        <BottomFixedElement className="flex flex-col gap-2 bg-white02 pt-1">
          <button
            className="cursor-pointer text-green03 text-Body2_M_14"
            onClick={() => setIsPassReplyDialogVisible(true)}
          >
            답장하기 어렵다면, 다른 새에게 맡기기
          </button>

          <StyledButton
            onClick={replyButtonHandler}
            className="flex items-center gap-1"
          >
            <Image
              src="/images/icons/letter_icon.svg"
              alt="편지쓰기 아이콘"
              width={24}
              height={24}
            />
            <span>답장 쓰기</span>
          </StyledButton>
        </BottomFixedElement>
      </div>

      {isPassReplyDialogVisible && (
        <PassReplyDialog
          letterStatusSeq={letterStatusSeq}
          onClose={() => setIsPassReplyDialogVisible(false)}
        />
      )}
    </>
  );
}
