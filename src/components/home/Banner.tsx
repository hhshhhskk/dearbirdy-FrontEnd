import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface BannerProps {
  onClick: () => void;
  className?: string;
}

export default function Banner({ onClick, className }: BannerProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-global cursor-pointer select-none flex justify-between items-center rounded-[12px] bg-[#FFD85BB2] bg-opacity-70 blur-[37px]",
        className
      )}
    >
      <div>
        <p className="text-Caption1_R_12 text-[#CAB29A]">
          편지 보내기 전 읽어봐요
        </p>
        <p className="text-Body1_B_16 ">
          답답한 마음을 어떻게
          <br />
          풀어내야 할지 막막할 때는
        </p>
      </div>

      <Image
        src="/images/birds/home/home_birds.png"
        alt="홈 새두마리"
        width={126}
        height={92}
      />
    </button>
  );
}
