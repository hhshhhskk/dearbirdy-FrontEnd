import React from "react";
import NextArrow from "@/components/common/NextArrow";
import { SettingType } from "@/constants/settings";
import { useRouter } from "next/navigation";

interface ISettingItem {
  type: SettingType;
  label: string;
  url?: string;
  isToggled?: boolean;
  onToggle?: () => void;
}

const SettingItem: React.FC<ISettingItem> = ({
  type,
  label,
  url,
  isToggled,
  onToggle,
}) => {
  const router = useRouter(); // ✅ 내부 이동을 위한 router 추가

  return (
    <div
      className="w-full cursor-pointer select-none flex justify-between items-center px-4 mt-4"
      onClick={() => {
        if (type === "internal") {
          router.push("/mybirdy/my-account"); // ✅ "내 정보 수정" 클릭 시 이동
        }
      }}
    >
      <span className="text-gray-700 text-[16px] font-medium">{label}</span>

      {type === "toggle" && (
        <div
          className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all ${
            isToggled ? "bg-[#292d32]" : "bg-[#D1D1D6]"
          }`}
          onClick={onToggle}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${
              isToggled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      )}

      {/* ✅ "내 정보 수정"도 NextArrow 아이콘 추가 */}
      {(type === "link" || type === "internal") && <NextArrow url={url} />}
    </div>
  );
};

export default SettingItem;
