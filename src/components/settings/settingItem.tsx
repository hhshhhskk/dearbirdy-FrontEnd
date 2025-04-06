import React from "react";
import NextArrow from "@/components/common/NextArrow";
import { SettingType } from "@/constants/settings";
import { useRouter } from "next/navigation";
import ToggleSwitch from "../ui/ToggleSwitch";

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
  const router = useRouter();

  return (
    <div
      className="w-full cursor-pointer select-none flex justify-between items-center px-global py-[14px]"
      onClick={() => {
        if (type === "internal") {
          router.push("/mybirdy/my-account"); // ✅ "내 정보 수정" 클릭 시 이동
        } else if (type === "category") {
          router.push("/mybirdy/edit-category");
        }
      }}
    >
      <span className="text-Body1_M_16">{label}</span>

      {type === "toggle" && isToggled && onToggle && (
        <ToggleSwitch isActive={isToggled} onChange={onToggle} />
      )}

      {/* ✅ "내 정보 수정"도 NextArrow 아이콘 추가 */}
      {(type === "link" || type === "internal" || type === "category") && (
        <NextArrow url={url} />
      )}
    </div>
  );
};

export default SettingItem;
