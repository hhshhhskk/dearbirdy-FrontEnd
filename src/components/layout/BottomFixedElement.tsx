import useKeyboardTransformOffset from "@/hooks/useKeyboardTransformOffset";
import clsx from "clsx";
import { ReactNode } from "react";

interface BottomFixedElementProps {
  children: ReactNode;
  className?: string;
}

export default function BottomFixedElement({
  children,
  className,
}: BottomFixedElementProps) {
  const offset = useKeyboardTransformOffset();

  return (
    <div
      className={clsx(
        "fixed bottom-0 pb-[44px] left-1/2 -translate-x-1/2 w-full max-w-global px-global z-10 transition-transform duration-200 ease-in-out will-change-transform",
        className
      )}
      style={{
        transform: `translateY(-${offset}px)`,
      }}
    >
      {children}
    </div>
  );
}
