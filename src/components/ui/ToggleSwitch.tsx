"use client";

import clsx from "clsx";

interface ToggleSwitchProps {
  isActive: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({
  isActive,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div
      className={clsx(
        "w-[60px] h-[30px] rounded-[40px] flex items-center px-1 cursor-pointer transition-all duration-300",
        isActive ? "bg-black01" : "bg-gray03"
      )}
      onClick={onChange}
    >
      <div
        className={clsx(
          "w-[22px] h-[22px] bg-white02 rounded-full shadow-md transition-transform duration-300",
          isActive ? "translate-x-[30px]" : "translate-x-0"
        )}
      ></div>
    </div>
  );
}
