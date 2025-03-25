"use client";

import Limit from "@/components/home/Limit";
import Report from "@/components/home/Report";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const report = false;
  const limit = false;

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // 토큰이 없으면 로그인 페이지로 리디렉션
    if (!token) {
      router.push("/"); // 로그인 페이지로 리디렉션
    }
  });

  return (
    <>
      {report && <Report />}
      {limit && <Limit />}
      <div className={`box-border font-pretendard min-h-screen min-w-[375px]`}>
        <div className="justify-center flex-1 w-full">{children}</div>
        <Footer />
      </div>
    </>
  );
}
