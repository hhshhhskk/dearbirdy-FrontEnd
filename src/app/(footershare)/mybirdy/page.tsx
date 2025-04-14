"use client";

import LetterHistory from "@/components/mybirdy/letterHistory";
import ProfileSection from "@/components/mybirdy/profileSection";
import { useEffect, useState } from "react";
import { IUserData } from "../home/page";
import LoadingWave from "@/components/ui/LoadingWave";

export default function MyBirdy() {
  const [userData, setUserData] = useState<IUserData | undefined>(undefined);
  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");
    if (storedData) {
      const userInfo = JSON.parse(storedData);
      setUserData(userInfo);
    }
  }, []);

  if (!userData) {
    return <LoadingWave />;
  }

  return (
    <div className="flex flex-col bg-black01 min-h-safe-screen">
      <div className="flex flex-col justify-end flex-1 p-6">
        {/* 🐦 사용자 프로필 섹션 */}
        <ProfileSection userData={userData} />
      </div>

      <LetterHistory userData={userData} />
    </div>
  );
}
