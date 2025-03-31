"use client";

import { ReactionId } from "@/constants/letter";
import ReplyButtonDiv from "./ReplyButtonDiv";
import LetterDisplay from "./LetterDisplay";
import LetterViewHeader from "./LetterViewHeader";
import { birdNameMap } from "@/constants/birdNameMap";
import { ILetter } from "@/app/letter-detail/[id]/page";

interface MentorLetterViewProps {
  myLetterSeq: number;
  outgoingLetter: ILetter;
  incomingLetter: ILetter;
  reactionId: ReactionId | null;
  isSaved: boolean;
}

export default function MentorLetterView({
  myLetterSeq,
  outgoingLetter,
  incomingLetter,
  reactionId,
  isSaved,
}: MentorLetterViewProps) {
  const otherUserBirdType = birdNameMap[incomingLetter.sendUserBird];

  return (
    <>
      <LetterViewHeader
        userRole="MENTOR"
        otherUserName={incomingLetter.sendUser}
        otherUserBirdType={otherUserBirdType}
        myLetterSeq={myLetterSeq}
        isSaved={isSaved}
      />

      <div className="flex flex-col gap-2 mt-2 mb-global">
        {!outgoingLetter && (
          <div className="p-[14px] text-center gap-[8px] border border-blue01 bg-[#F0FDFF] rounded-[14px]">
            {/* <p className="mb-2 text-gray06 text-Body2_B_14">
            답장 시간이 D일 hh시간 남았어요
          </p> */}
            <p className="text-Body1_R_16">
              후배버디가 답장을 기다리고 있어요.
            </p>
          </div>
        )}

        {outgoingLetter && (
          <LetterDisplay
            type="OUTGOING"
            categoryName={outgoingLetter.categoryName}
            fromUserName={outgoingLetter.sendUser}
            fromUserBirdName={outgoingLetter.sendUserBird}
            toUserName={outgoingLetter.replyUser}
            toUserBirdName={outgoingLetter.replyUserBird}
            title={outgoingLetter.letterTitle}
            content={outgoingLetter.letter}
            letterDate={outgoingLetter.creatAt}
            letterSeq={outgoingLetter.letterSeq}
            reactionId={reactionId}
            userRole={"MENTOR"}
          />
        )}
        <LetterDisplay
          type="REPLY"
          categoryName={incomingLetter.categoryName}
          fromUserName={incomingLetter.sendUser}
          fromUserBirdName={incomingLetter.sendUserBird}
          toUserName={incomingLetter.replyUser}
          toUserBirdName={incomingLetter.replyUserBird}
          title={incomingLetter.letterTitle}
          content={incomingLetter.letter}
          letterDate={incomingLetter.creatAt}
          letterSeq={incomingLetter.letterSeq}
          reactionId={reactionId}
          userRole={"MENTOR"}
        />
      </div>

      {!outgoingLetter && (
        <ReplyButtonDiv
          recipientName={incomingLetter.replyUserBird}
          myBirdType={incomingLetter.sendUser}
          categoryName={incomingLetter.categoryName}
          letterStatusSeq={myLetterSeq}
        />
      )}
    </>
  );
}
