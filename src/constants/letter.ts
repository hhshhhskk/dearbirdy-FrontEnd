export type LetterType = "OUTGOING" | "REPLY";

export const reactionList = [
  {
    id: "MOVED",
    message: "정성어린 답장에 감동 받았어요!",
    imageSrc: "/images/birds/MOVED_40.svg",
  },
  {
    id: "HELPFUL",
    message: "편지 내용이 도움이 되었어요!",
    imageSrc: "/images/birds/HELPFUL_40.svg",
  },
  {
    id: "NOT_ALONE",
    message: "혼자가 아닌 것 같아 기뻐요!",
    imageSrc: "/images/birds/NOT_ALONE_40.svg",
  },
] as const;

export type Reaction = (typeof reactionList)[number];
export type ReactionId = Reaction["id"];
