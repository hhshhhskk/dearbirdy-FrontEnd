"use client";

import { myBirdyMenuItems } from "@/constants/mybirdymenu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SettingsMenu() {
  const router = useRouter();

  return (
    <div className="bg-white01 rounded-[20px] border border-line01 flex flex-col gap-[18px] p-global">
      {myBirdyMenuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between cursor-pointer"
          onClick={() => router.push(item.route)}
        >
          <div className="flex items-center gap-1 ">
            <Image src={item.icon} alt={item.text} width={24} height={24} />
            <span className="text-Body1_M_16">{item.text}</span>
          </div>

          <Image
            src="/images/icons/arrow-right.svg"
            alt=">"
            width={24}
            height={24}
          />
        </div>
      ))}
    </div>
  );
}
