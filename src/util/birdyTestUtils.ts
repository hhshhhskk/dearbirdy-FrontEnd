import { Answer, birdTypes, Direction, questions } from "@/constants/birdyTest";

/** ✅ 특정 방향(life/lifestyle)의 점수 계산 */
export const calculateBirdyTestScore = (
  answers: Answer[],
  direction: Direction
): number => {
  return answers.reduce((sum: number, answer, index) => {
    const isTargetDirection = questions[index].direction === direction;
    return isTargetDirection && answer !== null
      ? sum + (answer as number)
      : sum;
  }, 0);
};

/** ✅ 새 유형 매칭 */
export const matchBirdType = (lifeScore: number, lifestyleScore: number) => {
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
export const processBirdyTestResults = (answers: Answer[]) => {
  const lifeScore = calculateBirdyTestScore(answers, "life");
  const lifestyleScore = calculateBirdyTestScore(answers, "lifestyle");
  console.log("lifeScore : ", lifeScore);
  console.log("lifestyleScore : ", lifestyleScore);

  const matchedBird = matchBirdType(lifeScore, lifestyleScore);

  return {
    scores: { life: lifeScore, lifestyle: lifestyleScore },
    result: matchedBird,
  };
};
