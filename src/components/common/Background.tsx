import React from "react";
import Image from "next/image";

interface BackgroundProps {
  src: string;
  alt?: string;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({
  src,
  alt = "배경화면",
  className,
}) => {
  return (
    <div className={className}>
      <Image src={src} alt={alt} sizes="max-width: 375px" fill priority />
    </div>
  );
};

export default Background;
