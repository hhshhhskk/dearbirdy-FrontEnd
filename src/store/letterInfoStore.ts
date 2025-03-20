import { create } from "zustand";

interface LetterInfoState {
  letterStatusSeq: number;
  nickname: string;
  birdName: string;
  categoryName?: string;
  setLetterStatusSeq: (letterStatusSeq: number) => void;
  setNickname: (nickname: string) => void;
  setBirdName: (birdName: string) => void;
  setCategoryName: (categoryName: string) => void;
}

export const useLetterInfoStore = create<LetterInfoState>((set) => ({
  letterStatusSeq: 0,
  nickname: "",
  birdName: "",
  categoryName: "",

  setLetterStatusSeq: (letterStatusSeq) =>
    set(() => ({
      letterStatusSeq,
    })),

  setNickname: (nickname) =>
    set(() => ({
      nickname,
    })),

  setBirdName: (birdName) =>
    set(() => ({
      birdName,
    })),

  setCategoryName: (categoryName) =>
    set(() => ({
      categoryName,
    })),
}));
