export interface BirdTraitStyle {
  background: string;
  textColor: string;
}

// ✅ 각 새 타입에 대한 스타일 지정
export const BIRD_TRAIT_STYLES: Record<string, BirdTraitStyle> = {
  카나리아: { background: "rgba(255, 216, 91, 0.10)", textColor: "#ECBF30" },
  뱁새: { background: "rgba(196, 179, 151, 0.20)", textColor: "#AD966F" },
  벌새: { background: "#F4FAEE", textColor: "#84A667" },
  앵무새: { background: "rgba(255, 42, 44, 0.10)", textColor: "#FF6365" },
  올빼미: { background: "rgba(211, 211, 236, 0.50)", textColor: "#6D6DDA" },
  파랑새: { background: "rgba(230, 251, 255, 0.60)", textColor: "#4CA7D0" },
};
