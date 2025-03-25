"use client";

import { useRouter } from "next/navigation";
import CommonLayout from "@/components/layout/CommonLayout";
import CommonHeader from "@/components/layout/CommonHeader";
import ChevronLeft from "@/components/Icons/common/LeftArrow";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <CommonLayout isFullScreen>
      <CommonHeader
        left={
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" stroke="#292D32" />
          </button>
        }
        title="버디테스트"
        noPadding
      />

      <div className="py-2">{children}</div>
    </CommonLayout>
  );
}
