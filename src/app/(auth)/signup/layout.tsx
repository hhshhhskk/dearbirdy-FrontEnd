"use client";

import CommonLayout from "@/components/layout/CommonLayout";
import CommonHeader from "@/components/layout/CommonHeader";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommonLayout isFullScreen>
      <CommonHeader title="회원가입" noPadding />

      <div className="py-2">{children}</div>
    </CommonLayout>
  );
}
