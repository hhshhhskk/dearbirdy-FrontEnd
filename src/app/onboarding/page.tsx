"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { onboardingSlides } from "@/constants/onboarding";
import { useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper"; // ✅ Swiper 타입 임포트

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = onboardingSlides.length;
  const swiperRef = useRef<SwiperType | null>(null); // ✅ Swiper 타입 명시

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // ✅ 'slideNext' 오류 해결됨
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingComplete", "true");
    router.push("/main");
  };

  return (
    <div className="relative min-w-[375px] max-w-[476px] w-screen h-screen flex flex-col justify-center items-center">
      {/* Swiper 슬라이드 */}
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ Swiper 인스턴스 저장
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        className="relative w-full h-full onboarding-swiper"
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
              className="object-cover w-full h-screen"
            />

            {/* ✅ 페이지네이션을 Swiper 내부에 위치시키고 z-index 설정 */}
            {/* <div className="absolute top-[123px] left-[26px] ">
              <div className="flex gap-2 custom-pagination"></div>
            </div> */}

            <div className="absolute top-[147px] ml-[26px]">
              <div className="text-white text-2xl font-bold text-left leading-[30px] tracking-[-0.096px] whitespace-pre-wrap">
                {slide.title}
              </div>
              <div className="mt-3 text-lg text-left text-white whitespace-pre-wrap">
                {slide.content}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 다음 슬라이드로 이동하는 버튼 */}
      {currentSlide < totalSlides - 1 ? (
        <button
          onClick={handleNextSlide}
          className="bg-[#292D32] absolute bottom-[44px] left-[16px] right-[16px] 
             cursor-pointer flex w-auto h-[50px] px-4 py-[13px] 
             justify-center items-center flex-shrink-0 
             rounded-xl z-50 text-white font-bold shadow-md"
        >
          다음
        </button>
      ) : (
        <button
          onClick={handleSkip}
          className="bg-[#292D32] absolute bottom-[44px] left-[16px] right-[16px] 
             cursor-pointer flex w-auto h-[50px] px-4 py-[13px] 
             justify-center items-center flex-shrink-0 
             rounded-xl z-50 text-white font-bold shadow-md"
        >
          반가워요!
        </button>
      )}
    </div>
  );
}
