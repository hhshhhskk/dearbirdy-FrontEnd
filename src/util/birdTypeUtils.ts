import { birdNameMap } from "@/constants/birdNameMap";

// 한글 새 이름을 영문으로 변환하여 이미지 경로 생성하는 함수
export const getBirdImageSrc = (birdName: string) => {
  const englishName = birdNameMap[birdName] || "default";
  return `/images/letter-slide/${englishName}_profile.png`;
};
