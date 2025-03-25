"use client";

import InfoBox from "@/components/common/InfoBox";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StyledButton from "@/components/ui/StyledButton";
import { UserCategory, useSignupStore } from "@/store/useSignupStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CategoryType = keyof UserCategory;

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
      className={`w-full px-4 rounded-[16px] flex flex-col items-center justify-center 
    cursor-pointer bg-white01 border ${
      isSelected ? "border-green03" : "border-line01"
    }`}
      style={{
        height: "clamp(100px, 15vh, 124px)",
      }}
      onClick={() => onToggle(id)}
    >
      <Image src={icon} alt={name} width={34} height={34} className="mb-2" />
      <p
        className={
          isSelected
            ? "text-black01 text-Body1_B_16"
            : "text-gray06 text-Body1_M_16"
        }
      >
        {name}
      </p>
    </div>
  );
};

export default function UserCategoryPage() {
  const router = useRouter();
  const { userCategory, setUserCategory } = useSignupStore();

  const [selected, setSelected] = useState<Set<CategoryType>>(
    new Set(
      Object.entries(userCategory)
        .filter(([, v]) => v)
        .map(([k]) => k as CategoryType)
    )
  );
  const [isNavigating, setIsNavigating] = useState(false);

  const handleToggle = (id: CategoryType) => {
    setSelected((prev) => {
      const currentSelection = new Set(prev);
      currentSelection.has(id)
        ? currentSelection.delete(id)
        : currentSelection.add(id);
      return currentSelection;
    });
  };

  const handleNext = () => {
    if (selected.size > 0) {
      const result = Object.fromEntries(
        categories.map(({ id }) => [id, selected.has(id)])
      ) as Record<CategoryType, boolean>;

      setUserCategory(result);
      setIsNavigating(true);
    }
  };

  if (isNavigating) {
    return (
      <LoadingSpinner
        message={`이제 나의 버디들을\n만나러 가볼까요?`}
        onDone={() => router.push("/birdy-test/intro")}
      />
    );
  }

  return (
    <div>
      <InfoBox
        imageSrc="/images/signup/bluebird-3.svg"
        altText="카테고리 선택 아이콘"
        text="우선적으로 편지를 받고 싶은 내용의 카테고리를 선택해주세요."
      />

      <div className="mt-11 mb-global flex-1 w-full h-full">
        <div className="select-none grid grid-cols-3 gap-x-[7px] gap-y-[8px]">
          {categories.map(({ id, name, icon }) => (
            <CategoryCard
              key={id}
              id={id}
              name={name}
              icon={icon}
              isSelected={selected.has(id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-[44px] left-0 right-0 px-global">
        <StyledButton onClick={handleNext} disabled={selected.size === 0}>
          완료
        </StyledButton>
      </div>
    </div>
  );
}
