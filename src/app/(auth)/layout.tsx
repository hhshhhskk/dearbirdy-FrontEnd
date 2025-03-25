"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}
