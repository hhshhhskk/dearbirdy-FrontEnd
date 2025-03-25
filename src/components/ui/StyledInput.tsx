"use client";

import { InputHTMLAttributes, useState } from "react";
import Image from "next/image";

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  isLoading?: boolean;
  error?: boolean;
  rightIconSrc?: string;
  helperText?: string;
  count?: string;
}

export default function StyledInput({
  isValid,
  isLoading,
  error,
  rightIconSrc,
  helperText,
  count,
  className = "",
  ...props
}: StyledInputProps) {
  const [focused, setFocused] = useState(false);

  const textColor = error
    ? "text-[#FF2A2C]"
    : isValid
    ? "text-[#30B16C]"
    : focused
    ? "text-black01"
    : "text-gray06";

  const borderColor = error
    ? "border-[#FF2A2C]"
    : isValid
    ? "border-[#30B16C]"
    : focused
    ? "border-black01"
    : "border-gray06";

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative w-full py-[13px] border-b transition-colors ${borderColor}`}
      >
        <input
          {...props}
          className="w-full bg-transparent outline-none text-Body2_R_14 placeholder:text-gray06"
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
        />

        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 animate-spin border-2 border-t-transparent border-gray05 rounded-full" />
          </div>
        )}

        {isValid && !error && rightIconSrc && !isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Image src={rightIconSrc} alt="valid icon" width={24} height={24} />
          </div>
        )}
      </div>

      {(helperText || count) && (
        <div className="mt-2 flex justify-between items-center">
          <p className={`text-Caption1_R_12 ${textColor}`}>{helperText}</p>
          {count && (
            <p className={`text-Caption1_R_12 ${textColor}`}>{count}</p>
          )}
        </div>
      )}
    </div>
  );
}
