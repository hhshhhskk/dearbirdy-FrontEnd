export const bannerContents = [
  {
    id: 1,
    title: "패치 노트 소식을 알려드려요",
    type: "BUG",
    color: "bg-[#A2D0FF]",
  },
  {
    id: 2,
    title: "업데이트 소식을 전해드려요",
    type: "UPDATE",
    color: "bg-[#FFC0B8]",
  },
  {
    id: 3,
    title: "이번주에",
    type: "EVENT",
    color: "bg-[#FFF7BA]",
  },
  {
    id: 4,
    title: "에 서버 점검 예정이에요",
    type: "INSPECTION",
    color: "bg-[#BFFFC6]",
  },
] as const;

export type BannerContent = (typeof bannerContents)[number];

export type BannerImageType = BannerContent["type"];
