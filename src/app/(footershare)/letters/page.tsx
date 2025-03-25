"use client";

import React, { useEffect, useState } from "react";
import SeniorLetterStorage from "@/components/letter-storage/SeniorLetterStorage";
import YouthLetterStorage from "@/components/letter-storage/YouthLetterStorage";
import { IUserData } from "../home/page";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export interface IDataListItem {
  letterStatusSeq: number;
  birdName: string;
  nickname: string;
  title: string;
  read: boolean;
  saved: boolean;
  thanksToMentor: boolean;
}

export interface IData {
  pageNumber: number;
  totalPage: number;
  totalData: number;
  dataList: IDataListItem[];
}

//무한스크롤

export interface Letter {
  letterStatusSeq: number;
  birdName: string;
  nickname: string;
  title: string;
  read: boolean;
  saved: boolean;
  thanksToMentor: boolean;
}

export interface LetterPage {
  code: number;
  data: {
    dataList: Letter[];
  };
  message: string;
  status: string;
  pageNumber: number;
  totalData: number;
  totalPage: number;
}

export interface InfiniteLetterQuery {
  pageParams: number[];
  pages: LetterPage[];
}

const LetterStorage: React.FC = () => {
  const [userData, setUserData] = useState<IUserData>();
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // 토큰이 없으면 로그인 페이지로 리디렉션
    if (!token) {
      router.push("/"); // 로그인 페이지로 리디렉션
    } else {
      const storedData = sessionStorage.getItem("userInfo");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // console.log(parsedData);

        setUserData(parsedData);
      }
    }
  }, []);

  if (!userData) {
    return <LoadingSpinner />;
  }
  // console.log(userData);

  return (
    <div className="p-global">
      {userData.roleName === "MENTEE" ? (
        <YouthLetterStorage />
      ) : userData.roleName === "MENTOR" ? (
        <SeniorLetterStorage />
      ) : null}
    </div>
  );
};

export default LetterStorage;
