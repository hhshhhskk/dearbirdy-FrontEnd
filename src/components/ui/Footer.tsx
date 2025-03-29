"use client";

import { menuItems } from "@/constants/menuItems";
import { useUserStore } from "@/store/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { read } = useUserStore();

  const initialIcon = menuItems.find((item) => item.path === pathname)?.id || 1;
  const [selectedIcon, setSelectedIcon] = useState<number>(initialIcon);

  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelectedIcon(currentItem.id);
    }
  }, [pathname]);

  const iconClicked = (id: number) => {
    setSelectedIcon(id);
    const selectedItem = menuItems.find((item) => item.id === id);
    if (selectedItem) {
      router.push(selectedItem.path);
    }
  };
  console.log("ㅁㅁㅁ read: ", read);

  return (
    <div className="flex justify-center ">
      <div className="fixed bottom-0 w-full max-w-global h-[60px] flex justify-around items-center border-t border-[#F0F1EC] bg-[#F9F8F3] min-w-[375px] ">
        {menuItems.map(({ id, Icon, label }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
            onClick={() => iconClicked(id)}
          >
            <Icon selectedIcon={selectedIcon} read={read} />
            <span
              className={`select-none cursor-pointer text-center font-pretendard text-xs font-medium leading-4 tracking-tight ${
                selectedIcon === id ? "text-[#292D32]" : "text-[#AEAEB2]"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
