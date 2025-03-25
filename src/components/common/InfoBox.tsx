"use client";

import Image from "next/image";

interface InfoBoxProps {
  imageSrc: string;
  altText: string;
  text: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ imageSrc, altText, text }) => {
  return (
    <div className="w-full bg-white01 border border-[#f0f1ec] rounded-[20px] flex items-center gap-[18px] px-4 py-3.5">
      {/* 왼쪽 아이콘 */}
      <div className="w-[80px] h-[80px] aspect-square relative">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* 오른쪽 텍스트 */}
      <p className="text-black01 text-Body2_R_14 whitespace-pre-wrap">{text}</p>
    </div>
  );
};

export default InfoBox;
