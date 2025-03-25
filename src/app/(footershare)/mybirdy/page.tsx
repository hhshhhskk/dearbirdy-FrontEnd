"use client";

import LetterHistory from "@/components/mybirdy/letterHistory";
import ProfileSection from "@/components/mybirdy/profileSection";
import { useEffect, useState } from "react";
import { IUserData } from "../home/page";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MyBirdy() {
  const [userData, setUserData] = useState<IUserData | undefined>(undefined);
  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");
    if (storedData) {
      const userInfo = JSON.parse(storedData);
      setUserData(userInfo);
    }
  }, []);
  if (!userData) <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6 w-full bg-[#292D32]">
      {/* 🐦 사용자 프로필 섹션 */}
      <ProfileSection userData={userData} />

      <div className="bg-[#F9F8F3] px-4 py-8 rounded-t-[20px] ">
        {/* 📩 편지 기록 */}
        <LetterHistory userData={userData} />
      </div>
    </div>
  );
}
