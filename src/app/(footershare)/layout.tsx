"use client";

import Limit from "@/components/home/Limit";
import Report from "@/components/home/Report";
import CommonLayout from "@/components/layout/CommonLayout";
import Footer from "@/components/ui/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const report = false;
  const limit = false;
  const pathname = usePathname();
  const router = useRouter();

  const showFooter =
    pathname === "/mybirdy" || !pathname.startsWith("/mybirdy/");

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

      <CommonLayout noPadding className="mb-[60px] pb-2">
        {children}
      </CommonLayout>

      {showFooter && <Footer />}
    </>
  );
}
