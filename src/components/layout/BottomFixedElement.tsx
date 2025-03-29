import useKeyboardTransformOffset from "@/hooks/useKeyboardTransformOffset";
import { ReactNode } from "react";

interface BottomFixedElementProps {
  children: ReactNode;
}

export default function BottomFixedElement({
  children,
}: BottomFixedElementProps) {
  const offset = useKeyboardTransformOffset();

  return (
    <div
      className="fixed bottom-[44px] left-1/2 -translate-x-1/2 w-full max-w-global px-global z-50 transition-transform duration-200 ease-in-out will-change-transform"
      style={{
        transform: `translateY(-${offset}px)`,
      }}
    >
      {children}
    </div>
  );
}
