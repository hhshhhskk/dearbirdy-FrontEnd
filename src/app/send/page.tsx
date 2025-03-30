"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BirdyTestEntryPage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/");
    } else {
      router.push("/send/select-category");
    }
  });

  return null;
}
