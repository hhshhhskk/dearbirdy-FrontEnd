"use client";

import React, { useEffect, useState } from "react";
import Banner from "@/components/home/Banner";
import HomeMainSection from "@/components/home/HomeMainSection";
import LetterGuideModal from "@/components/letter/LetterGuideModal";
import { getUserInfo } from "@/services/homeGetApi";
import { useUserStore } from "@/store/useUserStore";

import { usePathname, useRouter } from "next/navigation";
import CommonHeader from "@/components/layout/CommonHeader";
import Image from "next/image";
import BellIcon from "@/components/Icons/Header_bell_icon";
import Tutorial from "@/components/home/Tutorial";
import { useSseStore } from "@/store/useSseStore";
import LoadingWave from "@/components/ui/LoadingWave";

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
  roleName: "MENTOR" | "MENTEE" | "ADMIN"; // 역할이 정해져 있다면 리터럴 타입으로 제한 가능
  userCategory: IUserCategory;
  quota: number;
  sendLetter: number;
  replyLetter: number;
  read: boolean;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const { setRead } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const { connect, isConnected } = useSseStore();

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [istutorial, setIsTutorial] = useState(false);

  const data = useSseStore((state) => state.data);
  const messageCheck = useSseStore((state) => state.messageCheck);
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

          // 튜토리얼 체크
          if (response.data.roleName === "MENTEE") {
            const tutorial = localStorage.getItem("tutorialComplete");

            if (!tutorial) {
              setIsTutorial(true);
            }
          }

          // 실시간 알림
          // 연결이 안되어 있을 때만 connect
          if (!isConnected) {
            connect();
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [pathname, router, setRead, data]);

  console.log(userData);

  // console.log("알림데이터 data: ", data);
  if (!userData) {
    return <LoadingWave />;
  }

  return (
    <div className="px-global">
      <CommonHeader
        left={
          <Image
            src="/images/logo/logo_black_M.svg"
            alt="홈 로고"
            width={98}
            height={24}
          />
        }
        right={
          <BellIcon
            check={userData.read}
            sseCheck={data}
            messageCheck={messageCheck}
          />
        }
      />

      <div className="flex flex-col my-1 gap-global">
        {/* <Banner onClick={() => setIsGuideOpen(true)} /> */}
        <Banner onClick={() => router.push("/notice")} />
        <HomeMainSection userData={userData} userRole={userRole!} />

        {isGuideOpen && (
          <LetterGuideModal
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
            type={
              userRole === "MENTOR" || userData.roleName === "ADMIN"
                ? "REPLY"
                : "OUTGOING"
            }
          />
        )}
        {istutorial && <Tutorial tutorialStep={1} />}
      </div>
    </div>
  );
};

export default Home;
