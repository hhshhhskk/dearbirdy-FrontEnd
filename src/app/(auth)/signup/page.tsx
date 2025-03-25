"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSignupRedirectPath, useSignupStore } from "@/store/useSignupStore";

export default function SignupEntry() {
  const router = useRouter();
  const state = useSignupStore();

  useEffect(() => {
    const path = getSignupRedirectPath(state);
    router.replace(path);
  }, [state, router]);

  return null;
}
