import { ReactNode } from "react";

interface CommonLayoutProps {
  children: ReactNode;
  noPadding?: boolean;
  className?: string;
  bottomFixedButton?: ReactNode;
  isFullScreen?: boolean;
}

export default function CommonLayout({
  children,
  noPadding = false,
  className = "",
  bottomFixedButton,
  isFullScreen = false,
}: CommonLayoutProps) {
  return (
    <div
      className={`${isFullScreen ? "relative h-screen overflow-hidden" : ""} ${
        noPadding ? "" : "px-global"
      } ${className}`}
    >
      {children}

      {bottomFixedButton && (
        <div className="absolute bottom-[44px] left-0 right-0 px-global z-50">
          {bottomFixedButton}
        </div>
      )}
    </div>
  );
}
