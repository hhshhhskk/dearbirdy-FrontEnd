"use client";

import CommonLayout from "@/components/layout/CommonLayout";
import CommonHeader from "@/components/layout/CommonHeader";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonHeader title="회원가입" addPaddingX />

      <CommonLayout>
        <div className="py-2">{children}</div>
      </CommonLayout>
    </>
  );
}
