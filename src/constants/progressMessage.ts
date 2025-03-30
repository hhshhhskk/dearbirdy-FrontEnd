export const MIN_LETTER_COUNT = 30;
export const MAX_LETTER_COUNT = 300;

export const PROGRESS_MESSAGES = [
  {
    limit: MIN_LETTER_COUNT,
    text: `편지는 ${MIN_LETTER_COUNT}자 이상부터 보낼 수 있어요`,
    color: "#84A667",
  },
  { limit: 80, text: "정성스런 편지를 써주면 좋겠어요", color: "#84A667" },
  { limit: 200, text: "차근차근 편지를 잘 써주고 계세요", color: "#84A667" },
  { limit: 250, text: "정성스런 편지를 잘 써주고 계세요", color: "#8DC3DB" },
  {
    limit: MAX_LETTER_COUNT,
    text: "충분한 편지를 모두 적어주셨네요",
    color: "#8DC3DB",
  },
  {
    limit: Infinity,
    text: `편지는 ${MAX_LETTER_COUNT}자 까지만 쓸 수 있어요`,
    color: "#FF2A2C",
  },
];
