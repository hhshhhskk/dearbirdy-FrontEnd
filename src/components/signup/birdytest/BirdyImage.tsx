import Image from "next/image";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ birdName 변환 맵 추가

interface BirdyImageProps {
  birdName: string;
}

const BirdyImage = ({ birdName }: BirdyImageProps) => {
  // ✅ 한글 birdName을 영문으로 변환
  const birdKey = birdNameMap[birdName] || "default";

  return (
    <div className="mb-4 mt-4 flex justify-center">
      <Image
        src={`/images/birds/${birdKey}_280.png`}
        alt={birdName}
        width={200}
        height={200}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/birds/default_280.png";
        }} // ✅ 이미지 로드 실패 시 기본 이미지 적용
      />
    </div>
  );
};

export default BirdyImage;
