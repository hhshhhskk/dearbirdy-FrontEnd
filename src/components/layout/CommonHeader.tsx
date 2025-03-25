import { ReactNode } from "react";

interface CommonHeaderProps {
  left?: ReactNode;
  title?: string;
  right?: ReactNode;
  center?: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function CommonHeader({
  left,
  title,
  center,
  right,
  className = "",
  noPadding = false,
}: CommonHeaderProps) {
  return (
    <header
      className={`h-[56px] bg-white02 flex items-center justify-between ${
        noPadding ? "" : "px-global"
      } ${className}`}
    >
      <div className="w-[24px] h-[24px] flex items-center justify-center">
        {left ?? null}
      </div>

      <div className="flex-1 flex items-center justify-center">
        {center ?? (
          <span className="text-Body1_B_16 text-black01 truncate">{title}</span>
        )}
      </div>

      <div className="w-[24px] h-[24px] flex items-center justify-center">
        {right ?? null}
      </div>
    </header>
  );
}
