import React from "react";
import LeftArrow from "../Icons/common/LeftArrow";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
}

const MybirdyHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="relative flex items-center">
      <LeftArrow
        onClick={() => router.back()}
        className="absolute w-6 h-6 cursor-pointer"
        stroke="#292D32"
      />
      <p className="text-base font-bold m-4 leading-6 tracking-[-0.064px] w-full text-center">
        {title}
      </p>
    </div>
  );
};

export default MybirdyHeader;
