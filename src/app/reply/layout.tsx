"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="">{children}</div>
    </>
  );
}
