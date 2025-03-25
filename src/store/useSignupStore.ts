import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserCategory {
  career: boolean;
  mental: boolean;
  relationship: boolean;
  love: boolean;
  life: boolean;
  finance: boolean;
  housing: boolean;
  other: boolean;
}

interface SignupState {
  nickname: string;
  userRole: "MENTOR" | "MENTEE" | "";
  userCategory: UserCategory;
  birdName: string;

  setNickname: (nickname: string) => void;
  setUserRole: (role: "MENTOR" | "MENTEE") => void;
  setUserCategory: (category: Partial<UserCategory>) => void;
  setBirdName: (name: string) => void;
  resetSignup: () => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      nickname: "",
      userRole: "",
      userCategory: {
        career: false,
        mental: false,
        relationship: false,
        love: false,
        life: false,
        finance: false,
        housing: false,
        other: false,
      },
      birdName: "",

      setNickname: (nickname) => set({ nickname }),
      setUserRole: (role) => set({ userRole: role }),
      setUserCategory: (category) =>
        set((state) => ({
          userCategory: { ...state.userCategory, ...category },
        })),
      setBirdName: (birdName) => set({ birdName }),

      resetSignup: () =>
        set({
          nickname: "",
          userRole: "",
          userCategory: {
            career: false,
            mental: false,
            relationship: false,
            love: false,
            life: false,
            finance: false,
            housing: false,
            other: false,
          },
          birdName: "",
        }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// 가입 도중 복귀 시 이동 경로 판단
export const getSignupRedirectPath = (state: SignupState): string => {
  if (!state.nickname) return "/signup/intro";
  if (!state.userRole) return "/signup/user-role";
  if (state.userRole === "MENTOR") return "/signup/user-category";
  return "/birdy-test";
};
