import clsx from "clsx";
import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: "green" | "blue" | "red";
}

export default function ProgressBar({
  value,
  max,
  color = "green",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const barColor = {
    green: "bg-green03",
    blue: "bg-blue01",
    red: "#FF2A2C",
  }[color];

  return (
    <div className="w-full">
      <div className="w-full bg-gray03 rounded-[10px] h-[5px]">
        <div
          className={clsx(barColor, "rounded-[10px] transition-all")}
          style={{ width: `${percentage}%`, height: "100%" }}
        />
      </div>
    </div>
  );
}
