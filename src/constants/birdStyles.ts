export const birdStyleMap: Record<
  string,
  { color: string; background: string }
> = {
  앵무새: { color: "#FF6365", background: "rgba(255, 42, 44, 0.10)" },
  올빼미: { color: "#6D6DDA", background: "rgba(211, 211, 236, 0.50)" },
  카나리아: { color: "#ECBF30", background: "rgba(255, 216, 91, 0.10)" },
  뱁새: { color: "#AD966F", background: "rgba(196, 179, 151, 0.20)" },
  벌새: { color: "#84A667", background: "#F4FAEE" },
  파랑새: { color: "#4CA7D0", background: "rgba(230, 251, 255, 0.60)" },
};

// 기본 스타일
export const defaultBirdStyle = { color: "#84A667", background: "#F4FAEE" };
