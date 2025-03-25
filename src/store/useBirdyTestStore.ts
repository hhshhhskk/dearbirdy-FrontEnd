import { Answer } from "@/constants/birdyTest";
import { calculateBirdyTestScore, matchBirdType } from "@/util/birdyTestUtils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BirdyTestState {
  answers: Answer[];
  lifeScore: number;
  lifestyleScore: number;
  birdType: string | null;
  setAnswer: (index: number, answer: Answer) => void;
  calculateResults: () => void;
  resetTest: () => void;
}

export const useBirdyTestStore = create<BirdyTestState>()(
  persist(
    (set, get) => ({
      answers: Array(12).fill(null),
      lifeScore: 0,
      lifestyleScore: 0,
      birdType: null,

      setAnswer: (index, answer) =>
        set((state) => {
          const updated = [...state.answers];
          updated[index] = answer;
          return { answers: updated };
        }),

      calculateResults: () => {
        const answers = get().answers;
        const lifeScore = calculateBirdyTestScore(answers, "life");
        const lifestyleScore = calculateBirdyTestScore(answers, "lifestyle");
        const birdType = matchBirdType(lifeScore, lifestyleScore)?.name || null;

        set({ lifeScore, lifestyleScore, birdType });
      },

      resetTest: () =>
        set({
          answers: Array(12).fill(null),
          lifeScore: 0,
          lifestyleScore: 0,
          birdType: null,
        }),
    }),
    {
      name: "birdytest-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
