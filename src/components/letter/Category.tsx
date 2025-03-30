"use client";

import { categories } from "@/constants/letterCategoryList";
import { useLetterStore } from "@/store/useLetterStore";
import Image from "next/image";
import CommonHeader from "../layout/CommonHeader";
import clsx from "clsx";

function CategoryCard({
  name,
  description,
  src,
  selected,
  onClick,
}: {
  name: string;
  description: string;
  src: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(
        "w-full h-full py-global px-3 select-none flex flex-col items-center justify-center gap-[6px] bg-white01 rounded-2xl cursor-pointer border",
        selected ? "border-green03" : "border-transparent"
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

  const handleCategoryClick = (categoryName: string) => {
    setCategory(categoryName);
    setStep(2);
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
                onClick={() => handleCategoryClick(category.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
