"use client";

import { useLetterStore } from "@/store/useLetterStore";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getBirdyInfo, postLetter } from "@/services/userService";
import { BIRD_TRAIT_STYLES } from "@/constants/birdTraitsStyles";
import clsx from "clsx";
import "./SelectBird.css";
import { getBirdImageSrc } from "@/util/birdTypeUtils";
import CommonHeader from "@/components/layout/CommonHeader";
import BottomFixedElement from "@/components/layout/BottomFixedElement";
import StyledButton from "@/components/ui/StyledButton";
import { useRouter } from "next/navigation";

export interface Bird {
  birdName: string;
  traits: string;
  explanation: string;
}

interface BirdCardProps {
  bird: Bird;
  active: boolean;
  onClick: () => void;
}

const BirdCard = ({ bird, active, onClick }: BirdCardProps) => {
  const imageSrc = getBirdImageSrc(bird.birdName);

  return (
    <div
      onClick={onClick}
      className={clsx(
        "px-global py-10 bg-white01 rounded-[20px] flex flex-col items-center justify-center cursor-pointer border",
        active ? "border-green03 " : "border-transparent"
      )}
    >
      <div className="mb-[14px]">
        <Image
          src={imageSrc}
          alt={bird.birdName}
          width={100}
          height={100}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/letter-slide/default_profile.png";
          }}
        />

        <div
          className="flex items-center justify-center rounded-[6px] px-[6px] py-[2px] mt-[6px] mb-[10px]"
          style={{
            backgroundColor: BIRD_TRAIT_STYLES[bird.birdName]?.background,
          }}
        >
          <span
            className="text-Body2_M_14"
            style={{
              color: BIRD_TRAIT_STYLES[bird.birdName]?.textColor,
            }}
          >
            {bird.traits}
          </span>
        </div>

        <p className="text-Body1_B_16 text-center">{bird.birdName}</p>
      </div>

      <div className="px-[14px] py-global bg-white02 border border-[#F0F1EC] rounded-[10px]">
        {bird.explanation.split("\n").map((text, i) => (
          <p
            key={i}
            className={i === 0 ? "text-Body1_M_16" : "text-Body1_R_16"}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default function BirdSelectionPage() {
  const {
    setSelectedBird,
    selectedBird,
    setMyBirdName,
    categoryName,
    title,
    letter,
  } = useLetterStore();

  const router = useRouter();
  const swiperRef = useRef<SwiperClass | null>(null);

  const [birds, setBirds] = useState<Bird[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await getBirdyInfo();
        console.log("response", response);
        if (response?.data?.birdyList) {
          setBirds(response.data.birdyList);
          setSelectedBird(response.data.birdyList[0]?.birdName);
        } else {
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
        setMyBirdName(response.data.myBirdName);
      }

      console.log("response", response);
      router.push("/send/complete");
    } catch (error) {
      console.error("❌ 편지 전송 실패:", error);
      alert("편지 전송에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  if (birds.length === 0) {
    return <div />;
  }

  return (
    <div className="relative flex flex-col items-center">
      <CommonHeader addPaddingX />

      <div className="mt-global mb-[21px] px-global text-center">
        <p className="text-Title3_B_20">어떤 새에게 답장을 받아볼까요?</p>

        <p className="text-gray06 text-Body1_R_16 mt-[6px]">
          선택한 새와 다른 새에게 답장이 올 수도 있어요
        </p>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={8}
        slidesPerView="auto"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          setSelectedBird(birds[swiper.realIndex]?.birdName);
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className={clsx("w-full select-bird-swiper mb-[94px]")}
        pagination={{
          clickable: true,
        }}
        slidesOffsetBefore={21}
        slidesOffsetAfter={21}
      >
        {birds.map((bird, index) => (
          <SwiperSlide key={index} className="max-w-[80%]">
            <BirdCard
              bird={bird}
              active={activeIndex === index}
              onClick={() => {
                swiperRef.current?.slideTo(index);
                setActiveIndex(index);
                setSelectedBird(bird.birdName);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <BottomFixedElement>
        <StyledButton onClick={handleSendLetter} disabled={isSending}>
          편지 보내기
        </StyledButton>
      </BottomFixedElement>
    </div>
  );
}
