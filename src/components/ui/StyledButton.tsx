import { ReactNode } from "react";

interface StyledButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline-yellow" | "outline-green";
  disabled?: boolean;
  onClick?: () => void;
}

export default function StyledButton({
  children,
  variant = "primary",
  disabled,
  onClick,
}: StyledButtonProps) {
  const base =
    "w-full rounded-[12px] font-medium text-Body1_M_16 flex items-center justify-center gap-[4px] px-global py-[13px]";

  const variants = {
    primary: "cursor-pointer bg-black01 text-white01",
    "outline-yellow":
      "cursor-pointer bg-transparent border border-green01 text-green01",
    "outline-green":
      "cursor-pointer bg-[#F0F1EC] border border-green03 text-black01",
  };

  const disabledClass = "bg-gray01 text-gray03 cursor-default";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${disabled ? disabledClass : variants[variant]}`}
    >
      {children}
    </button>
  );
}
