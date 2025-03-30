"use client";

import Image from "next/image";
import { LETTER_GUIDES } from "@/constants/letterGuide";
import ActionSheet from "../ui/ActionSheet";
import { LetterType } from "@/constants/letter";

interface LetterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LetterType;
}

export default function LetterGuideModal({
  isOpen,
  onClose,
  type,
}: LetterGuideModalProps) {
  if (!isOpen) return null;

  const guide = LETTER_GUIDES[type];

  return (
    <ActionSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2 my-global items-center">
        <Image
          src="/images/common/guide.png"
          alt="가이드"
          width={60}
          height={60}
        />

        <h2 className="text-Body1_B_16">{guide.title}</h2>
        <p className="text-Body1_R_16">{guide.subtitle}</p>
      </div>

      <div className="bg-white02 border border-line02 p-[14px] rounded-[14px]">
        <p className="text-Body2_B_14 text-gray06 mb-[8px]">
          {guide.guideTitle}
        </p>

        <div>
          {guide.tips.map((tip, index) => (
            <div key={`tip-${index}`}>- {tip}</div>
          ))}
        </div>
      </div>
    </ActionSheet>
  );
}
