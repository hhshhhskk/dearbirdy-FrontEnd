import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import ChevronLeft from "../../components/Icons/common/LeftArrow";
import clsx from "clsx";

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
  addPaddingX?: boolean;
  className?: string;
}

export default function CommonHeader({
  left = <BackButton />,
  title,
  center,
  right,
  addPaddingX = false,
  className = "",
}: CommonHeaderProps) {
  return (
    <header
      className={clsx(
        "sticky top-0 z-20 w-full h-[56px] bg-white02 flex items-center justify-between flex-shrink-0",
        addPaddingX && "px-global",
        className
      )}
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
