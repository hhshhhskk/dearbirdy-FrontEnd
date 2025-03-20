import { create } from "zustand";

interface BookMarkState {
  bookMark: number;
  setBookMark: (letterStatusSeq: number) => void;
}

export const useBookMarkStore = create<BookMarkState>((set) => ({
  bookMark: 0,
  setBookMark: (letterStatusSeq) =>
    set((state) => ({
      bookMark: state.bookMark === letterStatusSeq ? 0 : letterStatusSeq,
    })),
}));
