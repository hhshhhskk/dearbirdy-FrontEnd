"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ActionSheet({
  isOpen,
  onClose,
  children,
  className = "",
}: ActionSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex flex-col justify-end">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-70" onClick={onClose} />

      {/* ActionSheet container */}
      <div
        className={clsx(
          "relative z-50 w-full max-w-global mx-auto max-h-[90%] px-global pt-6 pb-11 bg-white01 shadow-lg rounded-t-[30px] transition-transform duration-500 animate-slide-up flex flex-col",
          className
        )}
      >
        {/* Header with close button */}
        <div className="sticky top-0 flex justify-end w-full z-10 bg-white01">
          <Image
            src="/images/icons/close_icon.svg"
            alt="닫기"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
