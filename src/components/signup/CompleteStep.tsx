"use client";

import { useEffect } from "react";
import { useSignupStore } from "@/store/useSignupStore";
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // ✅ 로딩 컴포넌트 사용

const CompleteStep = () => {
  const { nextStep, setHideNav } = useSignupStore();

  useEffect(() => {
    setHideNav(true);

    // 3초 후 다음 스텝으로 이동
    const timer = setTimeout(() => {
      nextStep();
      setHideNav(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [nextStep, setHideNav]);

  return (
    <div className="flex mt-52 flex-col items-center justify-center">
      <LoadingSpinner
        message="이제 나의 버디들을 만나러 가볼까요?"
        size={250}
      />
    </div>
  );
};

export default CompleteStep;
