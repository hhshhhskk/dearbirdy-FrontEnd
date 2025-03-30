"use client";

import { useState } from "react";
import { LetterSave } from "@/services/letterStorage";
import BookMarkIcon from "../Icons/Bookmark_icon";

interface BookMarkProps {
  letterStatusSeq: number;
  isSaved: boolean;
}

export default function BookMark({ letterStatusSeq, isSaved }: BookMarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleClick = async () => {
    const willBeSaved = !isBookmarked;

    setIsBookmarked(willBeSaved);
    setToastMessage(
      willBeSaved
        ? "책갈피는 '저장한 편지'에서 확인할 수 있어요!"
        : "'저장한 편지'에서 삭제했어요"
    );

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);

    try {
      await LetterSave(letterStatusSeq);
    } catch (e) {
      console.error("북마크 저장 실패", e);
    }
  };

  return (
    <>
      <button onClick={handleClick} className="cursor-pointer">
        <BookMarkIcon
          fill={isBookmarked ? "#84A667" : "none"}
          stroke={isBookmarked ? "#84A667" : "#C7C7CC"}
        />
      </button>

      {showToast && (
        <div className="fixed flex flex-col items-center translate-x-1/2 bottom-10 right-1/2 z-[9999]">
          <div className="text-sm text-white rounded-xl bg-[rgba(100,100,100,0.9)] flex w-[323px] h-[56px] px-5 py-[19px] justify-center items-center">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
