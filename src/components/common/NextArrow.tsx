import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NextArrowProps {
  nextPath?: string;
  onClick?: () => void;
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

const NextArrow: React.FC<NextArrowProps> = ({
  nextPath,
  onClick,
  url,
  className,
  children,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      window.location.href = url; // ✅ 외부 링크로 이동
    } else if (nextPath) {
      router.push(nextPath); // ✅ 내부 페이지 이동
    } else if (onClick) {
      onClick(); // ✅ 커스텀 핸들러 실행
    }
  };

  return (
    <button onClick={handleClick} className={`cursor-pointer ${className}`}>
      {children ? <span className="mr-2">{children}</span> : null}
      <Image
        src="/images/icons/arrow-right.svg"
        alt="Next"
        width={24}
        height={24}
      />
    </button>
  );
};

export default NextArrow;
