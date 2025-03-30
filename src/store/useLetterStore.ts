import { create } from "zustand";
import { CategoryType } from "@/constants/letterCategoryList";

interface LetterState {
  myBirdName: string; // 사용자의 새
  nickname: string; // 사용자 닉네임 추가
  selectedBird: string; // 선택한 새
  categoryName: CategoryType | null;
  title: string;
  letter: string;
  isNotificationOn: boolean; // 알림 설정 여부

  setMyBirdName: (name: string) => void;
  setNickname: (name: string) => void;
  setSelectedBird: (name: string) => void;
  setCategory: (category: CategoryType) => void;
  setTitle: (title: string) => void;
  setLetter: (letter: string) => void;
  toggleNotification: () => void;
  resetLetter: () => void;
}

export const useLetterStore = create<LetterState>((set) => ({
  myBirdName: "",
  nickname: "",
  selectedBird: "",
  categoryName: null,
  title: "",
  letter: "",
  isNotificationOn: false,

  setMyBirdName: (name) => set({ myBirdName: name }),
  setNickname: (name) => set({ nickname: name }),
  setSelectedBird: (name) => set({ selectedBird: name }),
  setCategory: (category) => set({ categoryName: category }),
  setTitle: (title) => set({ title }),
  setLetter: (letter) => set({ letter }),
  toggleNotification: () =>
    set((state) => ({ isNotificationOn: !state.isNotificationOn })),

  resetLetter: () =>
    set({
      myBirdName: "",
      nickname: "",
      selectedBird: "",
      categoryName: null,
      title: "",
      letter: "",
      isNotificationOn: false,
    }),
}));
