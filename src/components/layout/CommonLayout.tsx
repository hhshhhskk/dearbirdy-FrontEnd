import clsx from "clsx";
import { ReactNode } from "react";

interface CommonLayoutProps {
  children: ReactNode;
  noPadding?: boolean;
  className?: string;
}

export default function CommonLayout({
  children,
  noPadding = false,
  className = "",
}: CommonLayoutProps) {
  return (
    <div
      className={clsx(
        "flex flex-col w-full flex-1 overflow-y-auto",
        !noPadding && "px-global",
        className
      )}
    >
      {children}
    </div>
  );
}
