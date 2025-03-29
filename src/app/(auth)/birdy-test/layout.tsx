"use client";

import CommonLayout from "@/components/layout/CommonLayout";
import CommonHeader from "@/components/layout/CommonHeader";

export default function BirdyTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonHeader title="버디테스트" addPaddingX />

      <CommonLayout>
        <div className="py-2">{children}</div>
      </CommonLayout>
    </>
  );
}
