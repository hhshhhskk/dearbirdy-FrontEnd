import { BirdNameKr, birdNameMap } from "@/constants/birdNameMap";
import { LetterType, ReactionId } from "@/constants/letter";
import { CategoryNameType } from "@/constants/letterCategoryList";
import { formatLetterDate } from "@/util/letterUtils";
import clsx from "clsx";
import Image from "next/image";
import SendReactionButton from "../letter-storage/SendReactionButton";
import ReactionDisplay from "../letter-storage/ReactionDisplay";

interface LetterDisplayProps {
  type: LetterType;
  categoryName: CategoryNameType;
  toUserName: string;
  toUserBirdName: BirdNameKr;
  fromUserName: string;
  fromUserBirdName: BirdNameKr;
  title: string;
  content: string;
  letterDate: string;
  letterSeq: number;
  reactionId: ReactionId | null;
  userRole: "MENTOR" | "MENTEE";
}

export default function LetterDisplay({
  type,
  categoryName,
  toUserName,
  toUserBirdName,
  fromUserName,
  fromUserBirdName,
  title,
  content,
  letterDate,
  letterSeq,
  reactionId,
  userRole,
}: LetterDisplayProps) {
  const formattedLetterDate = formatLetterDate(letterDate);

  return (
    <div className="bg-white01 rounded-[20px] border border-line02 px-global py-5">
      <div className="flex items-center gap-2 mb-global">
        <Image
          src={`/images/icons/direct_${
            type === "OUTGOING" ? "send" : "inbox"
          }_icon.svg`}
          alt="받은편지 아이콘"
          width={16}
          height={16}
        />

        <p
          className={clsx(
            "text-Caption1_R_12",
            type === "OUTGOING" ? "text-gray05" : "text-blue01"
          )}
        >
          {type === "OUTGOING" ? "보낸" : "받은"} 편지
        </p>
      </div>

      <div className="flex items-end justify-start gap-2">
        <Image
          src={`/images/birds/${birdNameMap[toUserBirdName]}_50.svg`}
          alt="프로필 새 50"
          width={50}
          height={50}
        />

        <p className="text-[23px] font-bold leading-[27.6px] iceJaram-Rg">
          Dear. {toUserName}
        </p>

        <p className="p-[1px_6px] rounded-[6px] bg-gray01 text-[#6B7178] text-Body2_M_14">
          {categoryName}
        </p>
      </div>

      <div className="py-6 break-words whitespace-pre-wrap">
        <h2 className="mb-2 text-Body1_M_16">{title}</h2>
        <p className="text-Body1_R_16">{content}</p>
      </div>

      <div>
        <p className="text-[#8E8E93] text-Caption1_R_12 mb-2">
          {formattedLetterDate}
        </p>

        <div className="flex items-center gap-2">
          <Image
            src={`/images/birds/${birdNameMap[fromUserBirdName]}_24.svg`}
            alt="프로필 새 24"
            width={24}
            height={24}
          />
          <p className="font-[Sandoll BaikzongyulPil] text-[18px] font-bold leading-[21.6px] iceJaram-Rg">
            from. {fromUserName}
          </p>
        </div>
      </div>

      {userRole === "MENTEE" &&
        type === "REPLY" &&
        !reactionId &&
        letterSeq && (
          <div className="mt-global">
            <SendReactionButton
              fromUserBirdName={fromUserBirdName}
              letterSeq={letterSeq}
            />
          </div>
        )}

      {type === "REPLY" && reactionId && (
        <div className="mt-global">
          <ReactionDisplay reactionId={reactionId} />
        </div>
      )}
    </div>
  );
}
