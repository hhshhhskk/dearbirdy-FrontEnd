"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";

const CloseIcon = () => (
  <Image
    src="/images/icons/close_white_icon.svg"
    alt="닫기 아이콘"
    width={24}
    height={24}
  />
);

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  showOuterCloseButton?: boolean;
  className?: string;
}

export default function Modal({
  children,
  onClose,
  showOuterCloseButton = false,
  className,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-999 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-70" onClick={onClose} />

      {showOuterCloseButton && (
        <button
          className="cursor-pointer absolute top-global right-global"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      )}

      <div
        className={clsx(
          "relative w-full max-w-global max-h-[90svh] mx-global px-global py-5 bg-white01 rounded-[18px] flex flex-col overflow-y-auto",
          className
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
