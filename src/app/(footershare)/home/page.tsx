"use client";

import HomeMainSenior from "@/components/home/HomeMainSenior";
import HomeMainYouth from "@/components/home/HomeMainYouth";
import Header from "@/components/ui/Header";
import { getUserInfo } from "@/services/homeGetApi";
import { useUserStore } from "@/store/useUserStore";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

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
  }, []);

  console.log(userData);
  console.log("sse: ", sse);

  if (!userData) {
    return;
  }

  return (
    <div className="w-screen max-w-[476px]">
      <Header userData={userData} sse={sse} setSse={setSse} />

      {userData.roleName === "MENTOR" ? (
        <HomeMainSenior userData={userData} />
      ) : (
        <HomeMainYouth userData={userData} />
      )}
    </div>
  );
};

export default Home;
