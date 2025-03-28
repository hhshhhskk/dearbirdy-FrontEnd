"use client";

import CommonHeader from "@/components/layout/CommonHeader";
import SettingItem from "@/components/settings/settingItem";
import { SETTINGS_OPTIONS, SettingSection } from "@/constants/settings";
import { useState } from "react";

const SettingsPage = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="-mx-global">
      <CommonHeader title="설정" />

      {SETTINGS_OPTIONS.map((section: SettingSection) => (
        <div key={section.category}>
          {/* 카테고리 헤더 */}
          <div className="w-full bg-line01 px-global py-[10px]">
            <h2 className="text-Body1_M_16 text-gray06">{section.category}</h2>
          </div>

          {/* "알림" 카테고리일 때 추가 UI 표시 */}
          {section.category === "알림" ? (
            <div className="px-global py-[14px]">
              {/* 편지 알림 받기 */}
              <div className="w-full flex justify-between items-center">
                <span className="text-Body1_M_16">편지 알림 받기</span>
                <div
                  className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all ${
                    isToggled ? "bg-[#292d32]" : "bg-[#D1D1D6]"
                  }`}
                  onClick={() => setIsToggled(!isToggled)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${
                      isToggled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* 알림 받을 이메일 */}
              <div className="mt-3 w-full bg-[#F4F5EF] border-1 border-[#E5E5EA] rounded-[10px] p-4 ">
                <span className="block text-gray-600 text-sm">
                  알림 받을 이메일
                </span>
                <span className="block text-gray-900 text-md font-medium mt-1">
                  준비중입니다..
                </span>
              </div>
            </div>
          ) : (
            section.items.map((item, index) => (
              <SettingItem
                key={index}
                type={item.type}
                label={item.label}
                url={item.url}
                isToggled={item.type === "toggle" ? isToggled : undefined}
                onToggle={
                  item.type === "toggle"
                    ? () => setIsToggled(!isToggled)
                    : undefined
                }
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;
