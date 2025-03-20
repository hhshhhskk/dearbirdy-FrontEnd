"use client";

import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>;
}
