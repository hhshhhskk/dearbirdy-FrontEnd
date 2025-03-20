"use client";
import React from "react";
import LeftArrow from "../Icons/common/LeftArrow";
import { useSignupStore } from "@/store/useSignupStore";
import { useBirdyTestStore } from "@/store/useBirdyTestStore"; // ✅ 버디테스트 상태 가져오기

const NavBar = () => {
  const { step, prevStep } = useSignupStore();
  const { testStep, prevTestStep } = useBirdyTestStore(); // ✅ Zustand에서 상태 가져오기

  const handleBack = () => {
    if (step === 5 && testStep > 0) {
      prevTestStep(); // ✅ 버디테스트 진행 중이면 내부 단계 감소
    } else {
      prevStep(); // ✅ 기본 회원가입 뒤로 가기
    }
  };

  return (
    <div className="mt-14 flex items-center relative">
      <LeftArrow
        onClick={handleBack}
        className="w-6 h-6 absolute cursor-pointer"
        stroke="#292D32"
      />
      <p className="text-base font-bold m-4 leading-6 tracking-[-0.064px] w-full text-center">
        {step >= 5 ? "버디테스트" : "회원가입"}
      </p>
    </div>
  );
};

export default NavBar;
