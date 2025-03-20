"use client";

import { useLetterStore } from "@/store/useLetterStore";

export default function Toggle() {
  const { isNotificationOn, toggleNotification } = useLetterStore();

  return (
    <div
      className={`w-[60px] h-[30px] rounded-[40px] border border-[#C7C7CC] ${
        isNotificationOn ? "bg-[#292D32]" : "bg-[#C7C7CC]"
      } flex items-center px-1 cursor-pointer transition-all duration-300`}
      onClick={toggleNotification}
    >
      <div
        className={`w-[26px] h-[26px] bg-white rounded-full shadow-md transition-transform duration-300 ${
          isNotificationOn ? "translate-x-[25px]" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}
