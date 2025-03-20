export const categories = [
  {
    id: "career",
    name: "커리어",
    description: "직장, 취업 등",
    src: "/images/send-category/career.png",
  },
  {
    id: "mental",
    name: "마음건강",
    description: "스트레스, 우울, 불안",
    src: "/images/send-category/mental.png",
  },
  {
    id: "love",
    name: "사랑",
    description: "연애, 결혼, 이별 등",
    src: "/images/send-category/love.png",
  },
  {
    id: "relationship",
    name: "대인관계",
    description: "가족, 친구, 동료 등",
    src: "/images/send-category/relationship.png",
  },
  {
    id: "life",
    name: "삶의 방향",
    description: "미래, 가치관",
    src: "/images/send-category/life.png",
  },
  {
    id: "housing",
    name: "독립",
    description: "자취, 생활, 주거 등",
    src: "/images/send-category/housing.png",
  },
  {
    id: "finance",
    name: "자산관리",
    description: "생활비, 돈 관련",
    src: "/images/send-category/finance.png",
  },

  {
    id: "other",
    name: "그 외 기타",
    description: "카테고리에 없는",
    src: "/images/send-category/other.png",
  },
];

export type CategoryType = (typeof categories)[number]["id"];
