"use client";

import { categories } from "@/constants/letterCategoryList";
import { useLetterStore } from "@/store/useLetterStore";
import Image from "next/image";
import { useState } from "react";
import CommonHeader from "../layout/CommonHeader";
import clsx from "clsx";

function CategoryCard({
  name,
  description,
  src,
  selected,
  blinking,
  onClick,
}: {
  name: string;
  description: string;
  src: string;
  selected: boolean;
  blinking: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(
        "w-full h-full py-global px-3 select-none flex flex-col items-center justify-center gap-[6px] bg-white01 rounded-2xl shadow-sm cursor-pointer border",
        selected ? "border-green03" : "border-transparent",
        blinking && "animate-blink"
      )}
      onClick={onClick}
    >
      <div className="w-[77px] h-[63px] relative">
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
      <div className="text-center">
        <p className="text-Body2_M_14 text-gray06">{description}</p>
        <p className="text-Body1_B_16">{name}</p>
      </div>
    </div>
  );
}

export default function Category() {
  const { categoryName, setCategory, setStep } = useLetterStore();
  const [blinkingCategory, setBlinkingCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setCategory(categoryName); // category.name 저장
    setBlinkingCategory(categoryId); // 여전히 category.id를 사용

    setTimeout(() => {
      setBlinkingCategory(null);
      setStep(2);
    }, 1500);
  };

  return (
    <>
      <CommonHeader className="px-global" />

      <div className="px-global mt-2">
        <div>
          <p className="text-Title3_B_20 whitespace-break-spaces mb-2">
            {"어떤 이야기를 \n나누고 싶으신가요?"}
          </p>
          <p className="text-Body1_R_16 text-gray06">
            아래 카테고리 중에서 선택해주세요
          </p>
        </div>

        <div className="flex justify-center w-full py-6">
          <div className="grid grid-cols-2 gap-2 w-full">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                description={category.description}
                src={category.src}
                selected={categoryName === category.name}
                blinking={blinkingCategory === category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
              />
            ))}
          </div>
          <style>
            {`
          @keyframes blink {
            0% { border-color: #84A667; }
            50% { border-color: transparent; }
            100% { border-color: #84A667; }
          }
          .animate-blink {
            animation: blink 1s ease-in-out;
          }
        `}
          </style>
        </div>
      </div>
    </>
  );
}
