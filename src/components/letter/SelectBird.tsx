"use client";

import LeftArrow from "@/components/Icons/common/LeftArrow";
import { useLetterStore } from "@/store/useLetterStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getBirdyInfo, postLetter } from "@/services/userService";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ 외부에서 불러오기
import { BIRD_TRAIT_STYLES } from "@/constants/birdTraitsStyles";
import LoadingSpinner from "../ui/LoadingSpinner";

export interface Bird {
  birdName: string;
  traits: string;
  explanation: string;
}

// ✅ 한글 새 이름을 영문으로 변환하여 이미지 경로 생성하는 함수
const getImageSrc = (birdName: string) => {
  const englishName = birdNameMap[birdName] || "default";
  return `/images/letter-slide/${englishName}_profile.png`;
};

export default function SelectBird() {
  const {
    setStep,
    setSelectedBird,
    selectedBird,
    setMyBirdName, // ✅ 사용자 새 저장 추가
    categoryName,
    title,
    letter,
  } = useLetterStore();

  const [birds, setBirds] = useState<Bird[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // ✅ 현재 Swiper에서 보이는 새의 인덱스

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await getBirdyInfo();
        console.log("response", response);
        if (response?.data?.birdyList) {
          setBirds(response.data.birdyList);
          setSelectedBird(response.data.birdyList[0]?.birdName); // ✅ 첫 번째 새를 기본 선택
        } else {
          // console.warn("🚨 API 응답이 없어서 기본 데이터를 사용합니다.");
          setBirds([]);
        }
      } catch (error) {
        console.error("❌ 새 정보 불러오기 실패:", error);
        setBirds([]);
      }
    };
    fetchBirds();
    // eslint-disable-next-line
  }, []);

  const handleSendLetter = async () => {
    if (!selectedBird) {
      alert("받을 새를 선택해주세요! 🐦");
      return;
    }

    setIsSending(true);

    try {
      const response = await postLetter({
        birdName: selectedBird ?? "앵무새",
        categoryName: categoryName ?? "기타",
        title,
        letter,
      });

      if (response?.data?.myBirdName) {
        setMyBirdName(response.data.myBirdName); // ✅ 사용자 새 저장
      }

      // console.log("✅ 편지 전송 성공");
      setStep(4);
    } catch (error) {
      console.error("❌ 편지 전송 실패:", error);
      alert("편지 전송에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  // ✅ 데이터가 없을 때 로딩 메시지 표시
  if (birds.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative flex flex-col items-center h-screen text-black">
      {/* 상단 네비게이션 */}
      <nav className="flex justify-start w-full py-4">
        <LeftArrow
          className="w-6 h-6 cursor-pointer"
          stroke="#292D32"
          onClick={() => setStep(2)}
        />
      </nav>

      {/* 제목 */}
      <p className="text-[#292D32] text-center text-[20px] font-bold leading-[28px] tracking-[-0.08px] mt-4">
        어떤 새에게 답장을 받아볼까요?
      </p>

      {/* 설명 */}
      <p className="text-[#6B7178] text-center text-[16px] font-normal leading-[24px] tracking-[-0.064px] mt-1.5">
        선택한 새와 다른 새에게 답장이 올 수도 있어요
      </p>

      {/* Swiper 카드 영역 */}
      <div className=" max-w-[380px]">
        <div className="mt-[21px] pl-[21px] w-full">
          <Swiper
            modules={[Pagination]}
            spaceBetween={10} // ✅ 카드 간격 유지
            slidesPerView="auto" // ✅ Centered Auto 적용
            // centeredSlides={true} ✅ 가운데 정렬
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex); // ✅ 현재 보여지는 슬라이드의 인덱스 저장
              setSelectedBird(birds[swiper.realIndex]?.birdName); // ✅ 자동으로 선택된 새 변경
            }}
            className="select-bird-swiper "
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}" style="background-color: ${
                  index === activeIndex ? "#84A667" : "#E5E5EA"
                }; width: 8px; height: 8px; border-radius: 50%; margin: 21px 4px 0 4px;"></span>`;
              },
            }}
          >
            {birds.map((bird, index) => (
              <SwiperSlide key={index} className="max-w-[306px]">
                <div
                  className={`w-full h-[492px] bg-white rounded-xl flex flex-col items-center justify-center px-4 py-10 cursor-pointer 
                  ${activeIndex === index && "border border-[#84A667]"}
                  `}
                >
                  {/* 🐦 프로필 이미지 */}
                  <Image
                    src={getImageSrc(bird.birdName)} // ✅ 한글 → 영문 변환 후 이미지 적용
                    alt={bird.birdName}
                    width={100}
                    height={100}
                    className="mb-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/images/letter-slide/default_profile.png";
                    }} // ✅ 이미지 로드 실패 시 기본 이미지 적용
                  />
                  {/* Traits (태그 형태) */}
                  <div
                    className="w-[100px] h-[24px] flex items-center justify-center rounded-[6px] mb-2"
                    style={{
                      background:
                        BIRD_TRAIT_STYLES[bird.birdName]?.background ||
                        "rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      className="text-[14px] font-medium leading-[20px] tracking-[-0.056px]"
                      style={{
                        color:
                          BIRD_TRAIT_STYLES[bird.birdName]?.textColor || "#000",
                      }}
                    >
                      {bird.traits}
                    </span>
                  </div>
                  {/* 새 이름 */}
                  <p className="text-[#292D32] text-center text-[16px] font-bold leading-[24px] tracking-[-0.064px] mb-4">
                    {bird.birdName}
                  </p>
                  {/* 설명 박스 */}
                  <div className="w-[274px] h-[224px] p-[16px] border border-[#F0F1EC] bg-[#F9F8F3] rounded-[10px]">
                    {bird.explanation.split("\n").map((text, i) => (
                      <p
                        key={i}
                        className={`text-[#292D32] text-[16px] ${
                          i === 0 ? "font-medium" : "font-normal"
                        } leading-[24px] tracking-[-0.064px]`}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 하단 버튼 */}
      <button
        className="absolute bottom-[44px] z-10 cursor-pointer select-none w-full h-[50px] bg-[#292D32] text-white text-[16px] font-semibold rounded-[12px] flex items-center justify-center "
        onClick={handleSendLetter}
        disabled={isSending}
      >
        {isSending ? "전송 중..." : "편지 보내기"}
      </button>
    </div>
  );
}
