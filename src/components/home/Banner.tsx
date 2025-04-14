import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { bannerContents } from "@/constants/bannerType";

interface BannerProps {
  onClick: () => void;
  className?: string;
}

// interface BannerProps {
//   announcementsType: "BUG" | "EVENT" | "UPDATE" | "INSPECTION";
//   title: string;
//   content: string;
//   createdAt: string;
// }

export default function Banner({ onClick, className }: BannerProps) {
  // const dummy = {
  //   announcementsType: "BUG",
  //   title: "제목",
  //   content: "본문",
  //   createdAt: "2025-04-14T20:53:52.967595",
  // };

  const bannerContent = bannerContents[1];
  console.log(bannerContent.color);

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative px-global py-1 cursor-pointer select-none rounded-[12px] bg-white01 overflow-hidden",
        className
      )}
    >
      <div
        className={`absolute bottom-[-40px] left-0 w-[90%] h-9 rounded-[261px] ${bannerContent.color} blur-[37px]`}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="text-left">
          <p className="text-Caption1_R_12 text-[#CAB29A]">
            디어버디에 새 소식이 찾아왔어요
          </p>
          <p className="text-Body1_B_16">
            <span></span>
            {bannerContent.title}
            {/* <span
              className={`${
                bannerContent.type === "EVENT" ? "block" : "hidden"
              }`}
            >
              이벤트가 있어요
            </span> */}
          </p>
        </div>

        <div className="w-[126px] flex-shrink">
          <Image
            src={`/images/birds/banner/${bannerContent.type}1_banner.png`}
            alt={`${bannerContent.type}1`}
            width={126}
            height={92}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
    </button>
  );
}
