"use client";

import { categories } from "@/constants/letterCategoryList";
import { useLetterStore } from "@/store/useLetterStore";
import Image from "next/image";
import clsx from "clsx";
import ChevronLeft from "../../../components/Icons/common/LeftArrow";
import { useRouter } from "next/navigation";
import Tutorial from "@/components/home/Tutorial";
import { useEffect, useState } from "react";

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

export default function LetterCategorySelectionPage() {
  const { categoryName, setCategory } = useLetterStore();
  const router = useRouter();

  const [istutorial, setIsTutorial] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    setCategory(categoryName);
    router.push("/send/write-letter");
  };

  useEffect(() => {
    const tutorial = localStorage.getItem("tutorialComplete");

    if (!tutorial) {
      localStorage.setItem("tutorialComplete", "true");
      setIsTutorial(true);
    }
  }, []);

  return (
    <>
      {istutorial && (
        <Tutorial tutorialStep={2} setIsTutorial={setIsTutorial} />
      )}
      <button
        onClick={() => router.push("/home")}
        aria-label="뒤로가기"
        className="cursor-pointer px-global"
      >
        <ChevronLeft className="w-6 h-6" stroke="#292D32" />
      </button>
      <div className="mt-2 px-global">
        <div>
          <p className="mb-2 text-Title3_B_20 whitespace-break-spaces">
            {"어떤 이야기를 \n나누고 싶으신가요?"}
          </p>
          <p className="text-Body1_R_16 text-gray06">
            아래 카테고리 중에서 선택해주세요
          </p>
        </div>

        <div className="flex justify-center w-full py-6">
          <div className="grid w-full grid-cols-2 gap-2">
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
