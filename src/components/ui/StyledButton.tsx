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
    "w-full rounded-[12px] font-medium text-Body2_M_14 flex items-center justify-center gap-1 px-global py-[11px] select-none";

  const variants = {
    primary: "cursor-pointer bg-black01 text-white01",
    "outline-green":
      "cursor-pointer bg-transparent border border-green03 text-green03",
  };

  const disabledClass = "bg-gray00 text-gray03 cursor-default";

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
