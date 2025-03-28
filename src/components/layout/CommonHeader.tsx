import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import ChevronLeft from "../../components/Icons/common/LeftArrow";

function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="뒤로가기"
      className="cursor-pointer"
    >
      <ChevronLeft className="w-6 h-6" stroke="#292D32" />
    </button>
  );
}

interface CommonHeaderProps {
  left?: ReactNode;
  title?: string;
  right?: ReactNode;
  center?: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function CommonHeader({
  left = <BackButton />,
  title,
  center,
  right,
  className = "",
  noPadding = false,
}: CommonHeaderProps) {
  return (
    <header
      className={`w-full h-[56px] bg-white02 flex items-center justify-between ${
        noPadding ? "" : "px-global"
      } ${className}`}
    >
      <div className="w-[24px] h-[24px] flex items-center justify-center">
        {left ?? null}
      </div>

      <div className="flex-1 flex items-center justify-center">
        {center ?? (
          <span className="text-Body1_B_18 text-black01 truncate">{title}</span>
        )}
      </div>

      <div className="w-[24px] h-[24px] flex items-center justify-center">
        {right ?? null}
      </div>
    </header>
  );
}
