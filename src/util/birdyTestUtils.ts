export type Answer = 0 | 1 | 2; // 0: 아니다, 1: 보통이다, 2: 그렇다
export type Direction = "life" | "lifestyle";

interface Question {
  id: number;
  direction: Direction;
}

// 질문 목록 (순서대로 life → lifestyle)
const questions: Question[] = [
  { id: 1, direction: "life" },
  { id: 2, direction: "life" },
  { id: 3, direction: "life" },
  { id: 4, direction: "life" },
  { id: 5, direction: "life" },
  { id: 6, direction: "life" },
  { id: 7, direction: "lifestyle" },
  { id: 8, direction: "lifestyle" },
  { id: 9, direction: "lifestyle" },
  { id: 10, direction: "lifestyle" },
  { id: 11, direction: "lifestyle" },
  { id: 12, direction: "lifestyle" },
];

// 새 유형 데이터
const birdTypes = [
  {
    name: "앵무새",
    lifeMin: 10,
    lifeMax: 12,
    lifestyleMin: 7,
    lifestyleMax: 12,
  },
  {
    name: "올빼미",
    lifeMin: 10,
    lifeMax: 12,
    lifestyleMin: 0,
    lifestyleMax: 6,
  },
  { name: "뱁새", lifeMin: 7, lifeMax: 9, lifestyleMin: 0, lifestyleMax: 12 },
  {
    name: "카나리아",
    lifeMin: 4,
    lifeMax: 6,
    lifestyleMin: 0,
    lifestyleMax: 12,
  },
  { name: "벌새", lifeMin: 0, lifeMax: 3, lifestyleMin: 7, lifestyleMax: 12 },
  { name: "파랑새", lifeMin: 0, lifeMax: 3, lifestyleMin: 0, lifestyleMax: 6 },
];

/** ✅ 특정 방향(life/lifestyle)의 점수 계산 */
const calculateScore = (answers: Answer[], direction: Direction): number => {
  return answers
    .filter((_, index) => questions[index].direction === direction)
    .reduce((sum, answer) => (sum + answer) as Answer, 0 as Answer); // ✅ 타입 명확하게 지정
};

/** ✅ 새 유형 매칭 */
const matchBirdType = (lifeScore: number, lifestyleScore: number) => {
  return (
    birdTypes.find(
      (bird) =>
        lifeScore >= bird.lifeMin &&
        lifeScore <= bird.lifeMax &&
        lifestyleScore >= bird.lifestyleMin &&
        lifestyleScore <= bird.lifestyleMax
    ) || birdTypes[0]
  ); // 기본값 (앵무새)
};

/** ✅ 결과 처리 */
export const processTestResults = (answers: Answer[]) => {
  const lifeScore = calculateScore(answers, "life");
  const lifestyleScore = calculateScore(answers, "lifestyle");
  console.log("lifeScore : ", lifeScore);
  console.log("lifestyleScore : ", lifestyleScore);

  const matchedBird = matchBirdType(lifeScore, lifestyleScore);

  return {
    scores: { life: lifeScore, lifestyle: lifestyleScore },
    result: matchedBird,
  };
};
