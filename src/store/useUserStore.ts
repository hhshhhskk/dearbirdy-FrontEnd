import { create } from "zustand";

interface User {
  birdName: string;
  nickname: string;
  quota?: number;
  userRole: string;
  read?: boolean;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  loadUserFromSession: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => {
    set({ user });
    sessionStorage.setItem("userData", JSON.stringify(user)); // ✅ sessionStorage에 저장
  },

  loadUserFromSession: () => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("userData");
      if (storedData) {
        set({ user: JSON.parse(storedData) });
      }
    }
  },
}));
