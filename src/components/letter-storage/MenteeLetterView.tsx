"use client";

import { ReactionId } from "@/constants/letter";
import LetterDisplay from "./LetterDisplay";
import LetterViewHeader from "./LetterViewHeader";
import { birdNameMap } from "@/constants/birdNameMap";
import { ILetter } from "@/app/letter-detail/[id]/page";

interface MenteeLetterViewProps {
  myLetterSeq: number;
  outgoingLetter: ILetter;
  incomingLetter: ILetter;
  reactionId: ReactionId | null;
  isSaved: boolean;
}

export default function MenteeLetterView({
  myLetterSeq,
  outgoingLetter,
  incomingLetter,
  reactionId,
  isSaved,
}: MenteeLetterViewProps) {
  const replyUserBirdType = birdNameMap[incomingLetter?.sendUserBird];

  return (
    <>
      <LetterViewHeader
        userRole="MENTEE"
        otherUserName={incomingLetter?.sendUser}
        otherUserBirdType={replyUserBirdType}
        myLetterSeq={myLetterSeq}
        replyLetterSeq={incomingLetter?.letterSeq}
        isSaved={isSaved}
      />

      <div className="flex flex-col gap-2 mt-2 mb-global">
        {!incomingLetter && (
          <div className="p-[14px] text-center gap-[8px] border border-blue01 bg-[#F0FDFF] rounded-[14px]">
            <p className="mb-2 text-gray06 text-Body2_B_14">
              따뜻한 말이 담긴 답장을 작성하고 있어요
            </p>
            <p className="text-Body1_R_16">
              빠르면 1일, 최대 7일이 걸릴 수 있어요.
            </p>
          </div>
        )}

        {incomingLetter && (
          <LetterDisplay
            type="REPLY"
            categoryName={incomingLetter.categoryName}
            toUserName={incomingLetter.replyUser}
            toUserBirdName={incomingLetter.replyUserBird}
            fromUserName={incomingLetter.sendUser}
            fromUserBirdName={incomingLetter.sendUserBird}
            title={incomingLetter.letterTitle}
            content={incomingLetter.letter}
            letterDate={incomingLetter.creatAt}
            letterSeq={incomingLetter.letterSeq}
            reactionId={reactionId}
            userRole="MENTEE"
          />
        )}

        <LetterDisplay
          type="OUTGOING"
          categoryName={outgoingLetter.categoryName}
          toUserName={outgoingLetter.replyUser}
          toUserBirdName={outgoingLetter.replyUserBird}
          fromUserName={outgoingLetter.sendUser}
          fromUserBirdName={outgoingLetter.sendUserBird}
          title={outgoingLetter.letterTitle}
          content={outgoingLetter.letter}
          letterDate={outgoingLetter.creatAt}
          letterSeq={outgoingLetter.letterSeq}
          reactionId={reactionId}
          userRole="MENTEE"
        />
      </div>
    </>
  );
}
