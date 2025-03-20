import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Answer = 0 | 1 | 2; // ✅ 0: 아니다, 1: 보통이다, 2: 그렇다
export type Direction = "life" | "lifestyle";

interface BirdyTestState {
  testStep: number;
  answers: Answer[];
  lifeScore: number;
  lifestyleScore: number;
  birdType: string | null;
  setTestStep: (step: number) => void;
  nextTestStep: () => void;
  prevTestStep: () => void;
  setAnswer: (index: number, answer: Answer) => void;
  calculateResults: () => void;
}

export const useBirdyTestStore = create<BirdyTestState>()(
  persist(
    (set, get) => ({
      testStep: 0,
      answers: Array(12).fill(0) as Answer[], // ✅ 초기값을 `Answer[]`로 명확하게 지정
      lifeScore: 0,
      lifestyleScore: 0,
      birdType: null,

      setTestStep: (step) => set({ testStep: step }),
      nextTestStep: () => set((state) => ({ testStep: state.testStep + 1 })),
      prevTestStep: () =>
        set((state) => ({ testStep: Math.max(0, state.testStep - 1) })),

      /** ✅ 특정 질문에 대한 응답 저장 */
      setAnswer: (index, answer) =>
        set((state) => {
          const newAnswers = [...state.answers];
          newAnswers[index] = answer;
          return { answers: newAnswers };
        }),

      /** ✅ 점수 계산 및 결과 저장 */
      calculateResults: () => {
        const answers = get().answers;
        const lifeScore: number = calculateScore(answers, "life"); // ✅ `number` 타입으로 지정
        const lifestyleScore = calculateScore(answers, "lifestyle");
        const matchedBird = matchBirdType(lifeScore, lifestyleScore);

        set({ lifeScore, lifestyleScore, birdType: matchedBird.name });
      },
    }),
    {
      name: "birdytest-storage", // ✅ sessionStorage 키
      storage: createJSONStorage(() => sessionStorage), // ✅ sessionStorage 사용하여 새로고침 후에도 유지
    }
  )
);

/** ✅ 질문 데이터 */
const questions = [
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

/** ✅ 특정 방향(life/lifestyle)의 점수 계산 */
const calculateScore = (answers: Answer[], direction: Direction): number => {
  return answers
    .filter((_, index) => questions[index].direction === direction)
    .reduce((sum, answer) => (sum + answer) as Answer, 0 as Answer) as number;
};

/** ✅ 새 유형 매칭 */
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
  { name: "뱁새", lifeMin: 7, lifeMax: 9, lifestyleMin: 0, lifestyleMax: 6 },
  {
    name: "카나리아",
    lifeMin: 4,
    lifeMax: 6,
    lifestyleMin: 7,
    lifestyleMax: 12,
  },
  { name: "벌새", lifeMin: 0, lifeMax: 3, lifestyleMin: 7, lifestyleMax: 12 },
  { name: "파랑새", lifeMin: 0, lifeMax: 3, lifestyleMin: 0, lifestyleMax: 6 },
];

const matchBirdType = (lifeScore: number, lifestyleScore: number) => {
  return (
    birdTypes.find(
      (bird) =>
        lifeScore >= bird.lifeMin &&
        lifeScore <= bird.lifeMax &&
        lifestyleScore >= bird.lifestyleMin &&
        lifestyleScore <= bird.lifestyleMax
    ) || birdTypes[0]
  );
};
