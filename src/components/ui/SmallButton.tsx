import { ReactNode } from "react";

interface SmallButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function SmallButton({
  children,
  disabled,
  onClick,
  className,
}: SmallButtonProps) {
  const base =
    "rounded-[12px] text-Body2_M_14 flex items-center justify-center gap-1 px-global py-[10px] select-none";

  const activeClass = "bg-green03 text-line01 cursor-pointer";
  const disabledClass = "bg-gray01 text-gray03 cursor-default";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${
        disabled ? disabledClass : activeClass
      } ${className}`}
    >
      {children}
    </button>
  );
}
