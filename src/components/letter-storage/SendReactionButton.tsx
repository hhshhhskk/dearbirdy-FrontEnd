"use client";

import Image from "next/image";
import { useState } from "react";
import ActionSheet from "../ui/ActionSheet";
import { getThanks } from "@/services/letterDetail";
import { Reaction, reactionList } from "@/constants/letter";
import { BirdNameKr } from "@/constants/birdNameMap";
import { useRouter } from "next/navigation";

interface ReactionOptionButtonProps {
  reaction: Reaction;
  letterSeq: number;
  onClose: () => void;
}

const ReactionOptionButton = ({
  reaction,
  letterSeq,
}: ReactionOptionButtonProps) => {
  const router = useRouter();
  const reactionButtonHandler = () => {
    getThanks(letterSeq, reaction.id);
    router.push("/letters");
  };

  return (
    <button
      onClick={reactionButtonHandler}
      className="px-global py-5 border border-green01 bg-white01 rounded-[20px] w-full flex items-center"
    >
      <Image
        src={reaction.imageSrc}
        alt={reaction.id}
        width={40}
        height={40}
        className="mr-2"
      />

      <p className="text-[#292D32] font-Pretendard text-[18px] font-medium leading-[26px] tracking-[-0.072px]">
        {reaction.message}
      </p>
    </button>
  );
};

interface ReactionSelectionActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  fromUserBirdName: BirdNameKr;
  letterSeq: number;
}

const ReactionSelectionActionSheet = ({
  isOpen,
  onClose,
  fromUserBirdName,
  letterSeq,
}: ReactionSelectionActionSheetProps) => {
  return (
    <ActionSheet isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 text-center mt-global">
        <h2 className="text-Body1_B_18">답장이 도움이 되셨나요?</h2>
        <p className="mt-2 mb-6 text-Body2_R_14">
          {fromUserBirdName}가 보낸 답장에 고마움을 보내주세요!
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {reactionList.map((reaction) => (
          <ReactionOptionButton
            key={reaction.id}
            reaction={reaction}
            letterSeq={letterSeq}
            onClose={onClose}
          />
        ))}
      </div>
    </ActionSheet>
  );
};

interface SendReactionButtonProps {
  fromUserBirdName: BirdNameKr;
  letterSeq: number;
}

export default function SendReactionButton({
  fromUserBirdName,
  letterSeq,
}: SendReactionButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div
        className="flex px-global py-[13px] justify-between items-center rounded-[12px] bg-green03 cursor-pointer"
        onClick={() => setIsModalVisible(true)}
      >
        <div className="flex">
          <Image
            src="/images/icons/heart_icon.svg"
            alt="하트 아이콘"
            width={24}
            height={24}
            className="mr-1"
          />

          <span className="text-line02 text-Body1_M_16">고마움 표시하기</span>
        </div>

        <Image
          src="/images/icons/arrow_down_icon.svg"
          alt="아래방향 아이콘"
          width={24}
          height={24}
        />
      </div>

      <ReactionSelectionActionSheet
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        fromUserBirdName={fromUserBirdName}
        letterSeq={letterSeq}
      />
    </>
  );
}
