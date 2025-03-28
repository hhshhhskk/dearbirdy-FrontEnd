"use client";

import React, { useEffect, useState } from "react";
import Banner from "@/components/home/Banner";
import HomeMainSection from "@/components/home/HomeMainSection";
import HomeLetterGuideModal from "@/components/letter/HomeLetterGuideModal";
import Header from "@/components/ui/Header";
import { getUserInfo } from "@/services/homeGetApi";
import { useUserStore } from "@/store/useUserStore";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { usePathname, useRouter } from "next/navigation";

export interface IUserCategory {
  career: boolean;
  mental: boolean;
  relationship: boolean;
  love: boolean;
  life: boolean;
  finance: boolean;
  housing: boolean;
  other: boolean;
}

export interface IUserData {
  birdName: string;
  nickname: string;
  roleName: "MENTOR" | "MENTEE"; // 역할이 정해져 있다면 리터럴 타입으로 제한 가능
  userCategory: IUserCategory;
  quota: number;
  sendLetter: number;
  replyLetter: number;
  read: boolean;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [sse, setSse] = useState(false);
  const { setRead } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const userRole = userData?.roleName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await sessionStorage.getItem("token");

        // 토큰이 없으면 로그인 페이지로 리디렉션
        if (!token) {
          console.log("홈으로 가기");

          router.push("/"); // 로그인 페이지로 리디렉션
        } else {
          const response = await getUserInfo();
          sessionStorage.setItem("userInfo", JSON.stringify(response.data));
          setRead(response.data.read);
          setUserData(response.data);

          // 실시간 알림
          const parsedData = JSON.parse(token);
          const accessToken = parsedData.state.accessToken;

          fetchEventSource(
            `${process.env.NEXT_PUBLIC_API_URL}/notification/subscribe`,
            {
              headers: {
                access: accessToken,
              },
              onmessage(event) {
                console.log(event.data); //"알림도착"
                if (event.data === "알림도착") setSse(true);
              },
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [pathname, router, setRead]);

  console.log(userData);
  console.log("sse: ", sse);

  if (!userData) {
    return;
  }

  return (
    <div>
      <Header userData={userData} sse={sse} setSse={setSse} />

      <div className="flex flex-col gap-global my-1">
        <Banner onClick={() => setIsGuideOpen(true)} />

        <HomeMainSection userData={userData} userRole={userRole!} />

        {isGuideOpen && (
          <HomeLetterGuideModal
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
            type={userRole === "MENTOR" ? "reply" : "letter"}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
