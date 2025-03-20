"use client";

import { useSignupStore } from "@/store/useSignupStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import InfoBox from "../common/InfoBox";
import NextButton from "../common/NextButton";

// 카테고리 타입 정의
type CategoryType =
  | "career"
  | "mental"
  | "relationship"
  | "love"
  | "life"
  | "finance"
  | "housing"
  | "other";

// 카테고리 데이터
const categories: {
  id: CategoryType;
  name: string;
  icon: string;
}[] = [
  { id: "career", name: "커리어", icon: "/images/category/career.svg" },
  { id: "mental", name: "마음건강", icon: "/images/category/mental.svg" },
  {
    id: "relationship",
    name: "대인관계",
    icon: "/images/category/relationship.svg",
  },
  { id: "love", name: "사랑", icon: "/images/category/love.svg" },
  { id: "life", name: "삶의 방향", icon: "/images/category/life.svg" },
  { id: "finance", name: "자산관리", icon: "/images/category/finance.svg" },
  { id: "housing", name: "독립", icon: "/images/category/housing.svg" },
  { id: "other", name: "그 외 기타", icon: "/images/category/other.svg" },
];

// 카테고리 카드 컴포넌트
interface CategoryCardProps {
  id: CategoryType;
  name: string;
  icon: string;
  isSelected: boolean;
  onToggle: (id: CategoryType) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  icon,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      className={`w-full max-h-[124px] py-[29px] rounded-lg flex flex-col items-center justify-center cursor-pointer ${
        isSelected ? "border border-[#84A667]" : "border border-[#EAEAEA]"
      }`}
      onClick={() => onToggle(id)}
    >
      <Image src={icon} alt={name} width={34} height={34} className="mb-2" />
      <p
        className={`text-sm ${
          isSelected ? "text-[#292D32] font-bold" : "text-[#6B7178] font-medium"
        }`}
      >
        {name}
      </p>
    </div>
  );
};

const CategoryStep = () => {
  const { updateFormData, nextStep, formData } = useSignupStore();
  const [selectedCategories, setSelectedCategories] = useState<
    Record<CategoryType, boolean>
  >(
    formData.userCategory || {
      career: false,
      mental: false,
      relationship: false,
      love: false,
      life: false,
      finance: false,
      housing: false,
      other: false,
    }
  );

  // 최소 하나 이상의 카테고리가 선택되었는지 확인
  const hasSelectedCategory = Object.values(selectedCategories).some(
    (selected) => selected
  );

  // 카테고리 토글 핸들러
  const handleToggleCategory = (categoryId: CategoryType) => {
    setSelectedCategories((prev) => {
      const updated = {
        ...prev,
        [categoryId]: !prev[categoryId],
      };
      return updated;
    });
  };

  // 선택된 카테고리가 변경될 때마다 Zustand 스토어 업데이트
  useEffect(() => {
    updateFormData({
      userCategory: selectedCategories,
    });
  }, [selectedCategories, updateFormData]);

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (hasSelectedCategory) {
      nextStep();
    }
  };

  return (
    <div className=" w-full max-w-[476px] pt-2">
      {/* InfoBox 컴포넌트 적용 */}
      <InfoBox
        imageSrc="/images/signup/bluebird-2.svg"
        altText="카테고리 선택 아이콘"
        text="어떤 고민을 나누고 싶으신가요? 관심 있는 주제를 선택해주세요."
      />

      {/* 카테고리 선택 영역 - Grid 사용 */}
      <div className="flex-1 w-full overflow-y-auto mt-2 mb-[52px]">
        <div className="select-none grid grid-cols-3 gap-x-[6px] gap-y-[6px]">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              isSelected={selectedCategories[category.id]}
              onToggle={handleToggleCategory}
            />
          ))}
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute left-4 right-4 bottom-0 flex justify-center bg-[#F9F8F3] w-auto h-[94px]">
        <NextButton
          text="다음"
          onClick={handleNextStep}
          disabled={!hasSelectedCategory}
        />
      </div>
    </div>
  );
};

export default CategoryStep;
