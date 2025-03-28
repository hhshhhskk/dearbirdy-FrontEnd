"use client";

import Image from "next/image";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ 외부에서 불러오기
import { IUserData } from "@/app/(footershare)/home/page";
import LoadingSpinner from "../ui/LoadingSpinner";

interface IProps {
  userData?: IUserData;
}
const ProfileSection: React.FC<IProps> = ({ userData }) => {
  const roleText = userData?.roleName === "MENTOR" ? "인생선배" : "인생후배";

  // ✅ 한글 → 영문 변환 후 이미지 경로 설정
  const getImageSrc = (birdName: string) => {
    const englishName = birdNameMap[birdName] || "default";

    return `/images/letter-slide/${englishName}_profile.png`;
  };

  if (!userData) return <LoadingSpinner />;

  return (
    <div>
      {/* 상단 프로필 이미지 */}
      <Image
        src={getImageSrc(userData.birdName)}
        alt="프로필 이미지"
        width={184}
        height={184}
        className="rounded-full mx-auto"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "/images/letter-slide/default_profile.png";
        }} // ✅ 이미지 로드 실패 시 기본 이미지 적용
      />

      <div className="mt-[10px]">
        {/* ✅ 닉네임 적용 */}
        <p className="text-white02 text-Title3_M_20 text-center mb-1">
          {userData?.nickname}
        </p>

        {/* 새 이름 & 역할 */}
        <div className="flex items-center justify-center gap-[6px]">
          <p className="text-gray04 text-Body1_R_16">{userData?.birdName}</p>
          <div className="bg-[#E6FFE9] text-[#26632C] text-Body2_M_14 px-[6px] py-[1px] rounded-[6px]">
            {roleText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
