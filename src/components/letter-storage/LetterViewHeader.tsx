import CommonHeader from "../layout/CommonHeader";
import ChevronLeft from "../../components/Icons/common/LeftArrow";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import LetterReport from "../letter/LetterReport";
import BookMark from "./BookMark";
import { BirdNameEn } from "@/constants/birdNameMap";

function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="뒤로가기"
      className="cursor-pointer"
    >
      <ChevronLeft className="w-6 h-6" stroke="#292D32" />
    </button>
  );
}

interface LetterViewHeaderProps {
  userRole: "MENTOR" | "MENTEE";
  otherUserName: string;
  otherUserBirdType: BirdNameEn;
  isSaved: boolean;
  myLetterSeq: number;
  replyLetterSeq?: number;
}

export default function LetterViewHeader({
  userRole,
  otherUserName,
  otherUserBirdType,
  isSaved,
  myLetterSeq,
  replyLetterSeq,
}: LetterViewHeaderProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const HeaderLeft = () => {
    return (
      <div className="flex items-center">
        <BackButton />

        <div className="flex items-center gap-1">
          <Image
            src={`/images/birds/${otherUserBirdType ?? "default"}_24.svg`}
            alt="프로필 새 24"
            width={24}
            height={24}
            className="ml-2"
          />

          <span className="text-Body1_B_16">
            {otherUserName ?? "답장을 기다리는 중"}
          </span>
        </div>
      </div>
    );
  };

  const HeaderRight = () => {
    return (
      <div className="flex items-center gap-2">
        {/* Temporarily hide report button (TODO: 신고 기능 반영) */}

        {/* {userRole === "MENTEE" && replyLetterSeq && (
          <Image
            src="/images/icons/more_icon.svg"
            alt="더보기 아이콘"
            width={24}
            height={24}
            className="cursor-pointer mr-2"
            onClick={() => {
              setIsReportModalOpen(true);
              console.log("clicked");
            }}
          />
        )} */}

        <BookMark letterStatusSeq={myLetterSeq} isSaved={isSaved} />
      </div>
    );
  };

  return (
    <>
      <CommonHeader left={<HeaderLeft />} right={<HeaderRight />} />

      {userRole === "MENTEE" && replyLetterSeq && (
        <LetterReport
          showReportModal={isReportModalOpen}
          setShowReportModal={setIsReportModalOpen}
          letterSeq={replyLetterSeq}
        />
      )}
    </>
  );
}
