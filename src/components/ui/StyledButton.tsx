import { ReactNode } from "react";

interface StyledButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline-green";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function StyledButton({
  children,
  variant = "primary",
  disabled,
  onClick,
  className,
}: StyledButtonProps) {
  const base =
    "w-full rounded-[12px] font-medium text-Body1_M_16 flex items-center justify-center gap-1 px-global py-[13px] select-none";

  const variants = {
    primary: "cursor-pointer bg-black01 text-white01",
    "outline-green":
      "cursor-pointer bg-transparent border border-green03 text-green03",
  };

  const disabledClass = "bg-gray01 text-gray03 cursor-default";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${
        disabled ? disabledClass : variants[variant]
      } ${className}`}
    >
      {children}
    </button>
  );
}
