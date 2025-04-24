export type LetterType = "OUTGOING" | "REPLY";

export const reactionList = [
  {
    id: "MOVED",
    message: "정성어린 답장에 감동 받았어요!",
    imageSrc: "/images/birds/thanks/MOVED.png",
    borderColor: "#FFE151",
    bgColor: "#FFE4E5",
  },
  {
    id: "HELPFUL",
    message: "편지 내용이 도움이 되었어요!",
    imageSrc: "/images/birds/thanks/HELPFUL.png",
    borderColor: "#FFE151",
    bgColor: "#ECFFE4",
  },
  {
    id: "NOT_ALONE",
    message: "혼자가 아닌 것 같아 기뻐요!",
    imageSrc: "/images/birds/thanks/NOT_ALONE.png",
    borderColor: "#FFE151",
    bgColor: "#FFFFE4",
  },
] as const;

export type Reaction = (typeof reactionList)[number];
export type ReactionId = Reaction["id"];
