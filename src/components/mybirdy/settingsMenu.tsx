"use client";

import { myBirdyMenuItems } from "@/constants/mybirdymenu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SettingsMenu() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-4 ">
      {myBirdyMenuItems.map((item, index) => (
        <div
          key={index}
          className="flex justify-between cursor-pointer items-center"
          onClick={() => router.push(item.route)}
        >
          <div className="flex items-center gap-[4px] ">
            <Image src={item.icon} alt={item.text} width={20} height={20} />
            <span className="text-[#292D32] text-[16px] font-medium">
              {item.text}
            </span>
          </div>
          <Image
            src="/images/icons/arrow-right.svg"
            alt=">"
            width={16}
            height={16}
          />
        </div>
      ))}
    </div>
  );
}
