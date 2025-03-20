import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SignupState {
  step: number;
  hideNav: boolean;
  formData: {
    nickname: string;
    userRole: string;
    userCategory: {
      career: boolean;
      mental: boolean;
      relationship: boolean;
      love: boolean;
      life: boolean;
      finance: boolean;
      housing: boolean;
      other: boolean;
    };
    birdName: string;
  };
  setStep: (step: number) => void;
  setHideNav: (hide: boolean | ((prev: boolean) => boolean)) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<SignupState["formData"]>) => void;
  resetSignup: () => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      step: 0,
      hideNav: false,
      formData: {
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
      },
      setStep: (step) => set({ step }),
      setHideNav: (hide) =>
        set((state) => ({
          hideNav: typeof hide === "function" ? hide(state.hideNav) : hide,
        })),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: Math.max(0, state.step - 1) })),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetSignup: () =>
        set({
          step: 0,
          formData: {
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
          },
        }),
    }),
    {
      name: "signup-storage", // ✅ sessionStorage 키
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
