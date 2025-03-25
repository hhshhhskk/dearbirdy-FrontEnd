import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";
import Head from "next/head";

const pretendard = localFont({
  src: "../app/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "DearBirdy: 디어버디",
  description: "편지로 연결되는 따뜻한 마음, 인생 선후배들의 만남 디어버디",
  openGraph: {
    title: "DearBirdy: 디어버디",
    description: "편지로 연결되는 따뜻한 마음, 인생 선후배들의 만남 디어버디",
    url: "https://www.dearbirdy.xyz",
    type: "website",
    images: [
      {
        url: "/ogimage_1.png",
        width: 1200,
        height: 628,
        alt: "DearBirdy 대표 이미지",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <link rel="apple-touch-icon" sizes="192x192" href="/logo_192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/logo_512.png" />
      </Head>

      {/* 참고: 전역적 배경색 및 폰트 색상은 global.css에서 적용하고 있음 */}
      <body
        className={`${pretendard.variable} font-pretendard min-h-screen flex justify-center`}
      >
        {/* ✅ React Query Provider 적용 */}
        <main className="min-h-screen w-full max-w-[476px] flex flex-col shadow-2xl bg-white02">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
