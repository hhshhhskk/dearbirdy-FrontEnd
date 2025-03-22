import { create } from "zustand";

interface User {
  birdName: string;
  nickname: string;
  quota?: number;
  userRole: string;
  read?: boolean;

  setRead: (value: boolean) => void;
}

export const useUserStore = create<User>((set) => ({
  birdName: "",
  nickname: "",
  quota: 0,
  userRole: "",
  read: false,

  setRead: (value: boolean) => set({ read: value }),
}));
