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
    <div className="bg-black01 min-h-safe-screen flex flex-col">
      <div className="p-6 flex flex-col justify-end flex-1">
        {/* 🐦 사용자 프로필 섹션 */}
        <ProfileSection userData={userData} />
      </div>

      <LetterHistory userData={userData} />
    </div>
  );
}
