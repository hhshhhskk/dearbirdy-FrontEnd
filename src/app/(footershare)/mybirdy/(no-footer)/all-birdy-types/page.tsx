"use client";

import "swiper/css";
import "swiper/css/pagination";
import "./all-birdy-types.css";
import CommonHeader from "@/components/layout/CommonHeader";
import LoadingWave from "@/components/ui/LoadingWave";
import { getAllbirdytype } from "@/services/myBirdy";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { birdNameMap } from "@/constants/birdNameMap";
import { BIRD_TRAIT_STYLES } from "@/constants/birdTraitsStyles";

interface IBirds {
  birdName: string;
  traits: string;
  explanation: string;
}

export default function AllBirdyTypesPage() {
  const [birds, setBirds] = useState<IBirds[]>([]);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await getAllbirdytype();
        setBirds(response.data.birdyList);
      } catch (error) {
        console.error("❌ 새 정보 불러오기 실패:", error);
        setBirds([]);
      }
    };
    fetchBirds();
  }, []);

  if (!birds) {
    return <LoadingWave />;
  }

  return (
    <div className="flex flex-col items-center px-global birdy-type-swiper">
      <CommonHeader />
      <div className="mt-4 text-center text-Title3_B_20 text-black01">
        모든 버디들은 따뜻함을
        <br />
        전해주기 위해 태어났어요
      </div>
      <div className="w-full max-w-md h-[500px] mt-5">
        <Swiper
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            el: ".birdy-type-swiper-pagination",
            clickable: true,
          }}
          autoHeight={true}
          className=""
        >
          {birds.map((bird, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col min-h-[506px]  items-center justify-center py-8 bg-white02
              rounded-[30px] shadow-[0_0_20px_0_rgba(107,107,107,0.10)] px-4"
              >
                <div className="text-Body2_R_14 text-gray06">
                  만나서 반가워요
                </div>
                <Image
                  src={`/images/birds/home/${birdNameMap[bird.birdName]}.png`}
                  alt="홈 나의 새 프로필사진"
                  width={280}
                  height={226}
                  className="mb-6 mt-global"
                />
                <div
                  className={`
                text-Caption1_M_12 
                px-1.5 
                py-0.5 rounded-[4px]
                `}
                  style={{
                    color: BIRD_TRAIT_STYLES[bird.birdName]?.textColor,
                    background: BIRD_TRAIT_STYLES[bird.birdName]?.background,
                  }}
                >
                  {bird.traits}
                </div>
                <div className="mt-2 text-Title3_B_20 text-black01">
                  {bird.birdName}
                </div>
                <div className="mt-6 text-Body2_R_14 text-black01">
                  {bird.explanation}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="birdy-type-swiper-pagination"></div>
      </div>
    </div>

    // <div className="flex flex-col items-center px-global">
    //   <CommonHeader title="버디 유형 모두 보기" />

    //   <Image
    //       src={`/images/my-birdy/birdy_collection.png`}
    //     alt="마이버디 새 버디 찾기"
    //     width={198}
    //     height={152}
    //     className="mt-6"
    //   />
    //   <p className="text-[#8E8E93] text-center text-base font-bold leading-[24px] tracking-[-0.064px] mt-5">
    //     곧 업데이트 예정이에요
    //   </p>
    //   <p className="text-[#8E8E93] text-center text-base font-normal leading-[24px] tracking-[-0.064px] mt-4">
    //     멋진 그림으로 찾아뵐게요.
    //     <br />
    //     모든 버디 유형이 궁금하다면 디어버디
    //     <br />
    //     인스타그램을 찾아주세요.
    //   </p>
    //   <div className="flex w-full p-[16px_20px] flex-col items-start rounded-[10px] border border-[#E5E5EA] bg-[#F0F1EC] mt-5">
    //     <p className="text-[#6B7178] text-xs font-normal leading-[16px] tracking-[-0.048px]">
    //       디어버디 인스타그램
    //     </p>
    //     <p className="text-[#6B7178] text-sm font-medium leading-[20px] tracking-[-0.056px] mt-1.5">
    //       @dearbirdy.xyz
    //     </p>
    //   </div>
    // </div>
  );
}
