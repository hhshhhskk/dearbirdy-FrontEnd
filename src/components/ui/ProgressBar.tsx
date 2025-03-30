import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
}

export default function ProgressBar({
  value,
  max,
  color = "#84A667",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="w-full bg-gray03 rounded-[10px] h-[5px] overflow-hidden">
        <div
          className="rounded-[10px] h-full transition-all"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
