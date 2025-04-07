import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";

const pretendard = localFont({
  src: "../app/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dearbirdy.xyz"),
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
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <GoogleAnalytics gaId="G-QMMEXE7E56" />

      {/* 참고: 전역적 배경색 및 폰트 색상은 global.css에서 적용하고 있음 */}
      <body
        className={`${pretendard.variable} font-pretendard flex justify-center`}
      >
        {/* ✅ React Query Provider 적용 */}
        <main className="flex flex-col w-full shadow-2xl min-h-safe-screen max-w-global bg-white02">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
