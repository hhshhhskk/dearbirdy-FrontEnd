// src/constants/settings.ts

export type SettingType = "toggle" | "link" | "internal";

export interface SettingItem {
  type: SettingType;
  label: string;
  url?: string;
}

export interface SettingSection {
  category: string;
  items: SettingItem[];
}

export const SETTINGS_OPTIONS: SettingSection[] = [
  {
    category: "알림",
    items: [
      {
        type: "toggle",
        label: "편지 알림 받기",
      },
    ],
  },
  {
    category: "계정",
    items: [
      {
        type: "internal",
        label: "내 정보 수정",
      },
    ],
  },
  {
    category: "운영",
    items: [
      {
        type: "link",
        label: "개인정보 처리방침",
        url: "https://important-pansy-82d.notion.site/Dearbirdy-1b51b9cea31e8094b4fefdacee285ff7?pvs=4",
      },
      {
        type: "link",
        label: "서비스 이용안내",
        url: "https://important-pansy-82d.notion.site/DearBirdy-1b51b9cea31e80bb8702f6f0753d12df?pvs=4",
      },
      {
        type: "link",
        label: "피드백 보내기",
        url: "#",
      },
    ],
  },
];
