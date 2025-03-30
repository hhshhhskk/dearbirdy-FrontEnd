"use client";

import CommonHeader from "@/components/layout/CommonHeader";
import SettingItem from "@/components/settings/settingItem";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { SETTINGS_OPTIONS, SettingSection } from "@/constants/settings";
import { useState } from "react";

const SettingsPage = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <CommonHeader title="설정" addPaddingX />

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

                <ToggleSwitch
                  isActive={isToggled}
                  onChange={() => setIsToggled(!isToggled)}
                />
              </div>

              {/* 알림 받을 이메일 */}
              <div className="mt-3 w-full bg-line02 border-1 border-gray01 rounded-[10px] px-5 py-global text-gray06">
                <p className="text-Caption1_R_12 mb-[6px]">알림 받을 이메일</p>
                <p className="text-Body2_M_14">준비중입니다...</p>
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
    </>
  );
};

export default SettingsPage;
