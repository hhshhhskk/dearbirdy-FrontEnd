import React from "react";

interface BottomButtonProps {
  text: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  bottomMargin?: number;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  className?: string;
}

const BottomButton: React.FC<BottomButtonProps> = ({
  text,
  onClick,
  width = 315,
  height = 50,
  bottomMargin = 42,
  backgroundColor = "bg-blue-500",
  textColor = "text-white",
  disabled = false,
  className = "",
}) => {
  return (
    <div
      className="fixed transform -translate-x-1/2 left-1/2"
      style={{
        bottom: `${bottomMargin}px`,
        width: `${width}px`,
        maxWidth: `${width}px`,
      }}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-md font-bold ${backgroundColor} ${textColor} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
        style={{ height: `${height}px` }}
      >
        {text}
      </button>
    </div>
  );
};

export default BottomButton;
