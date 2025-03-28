"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./onboardingSwiper.css";
import { Pagination } from "swiper/modules";
import { onboardingSlides } from "@/constants/onboarding";
import { useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper"; // ✅ Swiper 타입 임포트
import CommonLayout from "@/components/layout/CommonLayout";
import StyledButton from "@/components/ui/StyledButton";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = onboardingSlides.length;
  const swiperRef = useRef<SwiperType | null>(null); // ✅ Swiper 타입 명시

  const isLastSlide = currentSlide === totalSlides - 1;

  const handleNextSlide = () => {
    if (isLastSlide) {
      localStorage.setItem("onboardingComplete", "true");
      router.push("/main");
    } else {
      swiperRef?.current?.slideNext();
    }
  };

  const BottomFixedButton = (
    <StyledButton onClick={handleNextSlide}>
      {isLastSlide ? "반가워요!" : "다음"}
    </StyledButton>
  );

  return (
    <CommonLayout
      noPadding
      bottomFixedButton={BottomFixedButton}
      isFullScreen
      className="bg-[#a9c6ae]"
    >
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ Swiper 인스턴스 저장
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        className="w-full h-full onboarding-swiper"
      >
        {onboardingSlides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative flex flex-col items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={`onboarding-step-${index + 1}`}
              className="w-full object-cover object-center"
            />

            <div className="absolute top-[88px] px-[26px] text-line01 whitespace-pre-wrap">
              <div className="mb-[12px] text-Title2_B_24">{slide.title}</div>
              <div className="text-Body0_R_18">{slide.content}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </CommonLayout>
  );
}
