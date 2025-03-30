"use client";

import { PROGRESS_MESSAGES } from "@/constants/progressMessage";
import ProgressBar from "../ui/ProgressBar";

interface LetterProgressProps {
  letterLength: number;
  maxLength: number;
}

export default function LetterProgress({
  letterLength,
  maxLength,
}: LetterProgressProps) {
  const progressMessage = PROGRESS_MESSAGES.find(
    (msg) => letterLength <= msg.limit
  );

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex justify-between items-center">
        <span className="text-Caption1_M_12 text-gray06">
          {letterLength > 0 && progressMessage?.text}
        </span>

        <div
          className="px-[6px] py-[1px] text-Body2_M_14 bg-white01 rounded-[6px] border border-line02"
          style={{ color: progressMessage?.color }}
        >
          {letterLength}/{maxLength}자
        </div>
      </div>

      <ProgressBar
        value={letterLength}
        max={maxLength}
        color={progressMessage?.color}
      />
    </div>
  );
}
