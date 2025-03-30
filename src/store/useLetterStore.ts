import { create } from "zustand";
import { CategoryType } from "@/constants/letterCategoryList";

interface LetterState {
  step: number;
  myBirdName: string; // 사용자의 새
  nickname: string; // ✅ 사용자 닉네임 추가
  selectedBird: string; // 선택한 새
  categoryName: CategoryType | null;
  title: string;
  letter: string;
  isNotificationOn: boolean; // 알림 설정 여부

  setStep: (step: number) => void;
  setMyBirdName: (name: string) => void;
  setNickname: (name: string) => void; // ✅ 닉네임 저장 함수 추가
  setSelectedBird: (name: string) => void;
  setCategory: (category: CategoryType) => void;
  setTitle: (title: string) => void;
  setLetter: (letter: string) => void;
  toggleNotification: () => void;
  resetLetter: () => void;
}

export const useLetterStore = create<LetterState>((set) => ({
  step: 1,
  myBirdName: "",
  nickname: "", // ✅ 초기 닉네임 값 추가
  selectedBird: "",
  categoryName: null,
  title: "",
  letter: "",
  isNotificationOn: false,

  setStep: (step) => set({ step }),
  setMyBirdName: (name) => set({ myBirdName: name }),
  setNickname: (name) => set({ nickname: name }), // ✅ 닉네임 저장 기능 추가
  setSelectedBird: (name) => set({ selectedBird: name }),
  setCategory: (category) => set({ categoryName: category }),
  setTitle: (title) => set({ title }),
  setLetter: (letter) => set({ letter }),
  toggleNotification: () =>
    set((state) => ({ isNotificationOn: !state.isNotificationOn })),

  resetLetter: () =>
    set({
      step: 1,
      myBirdName: "",
      nickname: "", // ✅ 닉네임 초기화
      selectedBird: "",
      categoryName: null,
      title: "",
      letter: "",
      isNotificationOn: false,
    }),
}));
