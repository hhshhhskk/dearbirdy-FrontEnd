"use client";

import { PROGRESS_MESSAGES } from "@/constants/progressMessage";

interface LetterProgressProps {
  letterLength: number;
}

export default function LetterProgress({ letterLength }: LetterProgressProps) {
  const progressMessage =
    PROGRESS_MESSAGES.find((msg) => letterLength <= msg.limit) ||
    PROGRESS_MESSAGES[0];

  const progressPercent = (letterLength / 300) * 100;

  return (
    <div className="flex flex-col mt-2">
      <div className="flex justify-between items-center">
        {/* ✅ letterLength === 0일 때 진행 메시지를 숨김 */}
        <span className="text-sm text-[#6B7178]">
          {letterLength > 0 ? progressMessage.text : ""}
        </span>
        <div
          className={`h-[22px] text-center text-sm bg-white rounded-md transition-all duration-200 ${
            letterLength >= 100 ? "w-[79px]" : "w-[64px]"
          }`}
          style={{ color: progressMessage.color }}
        >
          {letterLength}/300자
        </div>
      </div>

      <div className="w-full h-[5px] bg-[#E5E5EA] mt-[7px] rounded-[10px]">
        <div
          className="h-[5px]"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: progressMessage.color,
          }}
        ></div>
      </div>
    </div>
  );
}
