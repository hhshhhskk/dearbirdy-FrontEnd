"use client";

import BottomFixedElement from "@/components/layout/BottomFixedElement";
import CommonHeader from "@/components/layout/CommonHeader";
import LoadingWave from "@/components/ui/LoadingWave";
import StyledButton from "@/components/ui/StyledButton";
import { getUserInfo } from "@/services/homeGetApi";
import { categoryUpdate } from "@/services/myBirdy";
import { useEffect, useState } from "react";

type CategoryKey =
  | "career"
  | "finance"
  | "housing"
  | "life"
  | "love"
  | "mental"
  | "other"
  | "relationship";

export type CategoryState = Record<CategoryKey, boolean>;

const Page = () => {
  const labels: { id: number; label: string; key: CategoryKey }[] = [
    { id: 0, label: "커리어", key: "career" },
    { id: 1, label: "마음건강", key: "mental" },
    { id: 2, label: "대인관계", key: "relationship" },
    { id: 3, label: "사랑", key: "love" },
    { id: 4, label: "삶의 방향", key: "life" },
    { id: 5, label: "자산관리", key: "finance" },
    { id: 6, label: "독립", key: "housing" },
    { id: 7, label: "그 외 기타", key: "other" },
  ];
  const [update, setUpdate] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [categories, setCategories] = useState();
  const [selectedCategories, setSelectedCategories] = useState<CategoryState>({
    career: false,
    finance: false,
    housing: false,
    life: false,
    love: false,
    mental: false,
    other: false,
    relationship: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();

      setSelectedCategories(data.data.userCategory);
      setCategories(data.data.userCategory);
    };

    fetchData();
  }, [update]);

  const isEqual = (a: CategoryState, b: CategoryState): boolean => {
    return Object.keys(a).every(
      (key) => a[key as CategoryKey] === b[key as CategoryKey]
    );
  };

  const categoryClicked = (key: CategoryKey) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [key]: !prev[key], // 이전 값의 반대로 토글
    }));
  };

  const buttonClicked = async () => {
    console.log(selectedCategories);
    await categoryUpdate(selectedCategories);
    setUpdate((prev) => !prev);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  if (!categories) return <LoadingWave />;

  return (
    <>
      <CommonHeader title="내 정보 수정" addPaddingX />

      <div className="w-full bg-line01 px-global py-[10px]">
        <h2 className="text-Body1_M_16 text-gray06">편지 카테고리 변경</h2>
      </div>

      <div className="px-global flex flex-col gap-[22px] mt-5">
        <div className="flex flex-wrap w-[95%] gap-2 ">
          {labels.map((data) => (
            <div
              key={data.id}
              className={`inline-block px-4 py-3 text-Body2_M_14 rounded-[10px] text-white ${
                selectedCategories[data.key] ? "bg-green03" : "bg-gray03"
              }`}
              onClick={() => categoryClicked(data.key)}
            >
              {data.label}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap w-full gap-2 bg-white02 border-1 border-[#f0f1ec] rounded-[14px] p-3.5 text-black01">
          <div className="text-Body2_B_14 text-gray06">카테고리 안내</div>
          <div className="text-Body1_R_16">
            선택하신 카테고리의 편지를 우선적으로 전달해드려요. 본인의 경험과
            지혜로 따뜻한 조언을 해주실 수 있는 분야를 선택해주세요. 모든
            카테고리를 선택하지 않으셔도 괜찮아요.
          </div>
        </div>
      </div>
      <BottomFixedElement>
        <StyledButton
          className="h-[50px]"
          disabled={isEqual(categories, selectedCategories)}
          onClick={buttonClicked}
        >
          선택 카테고리 저장
        </StyledButton>
      </BottomFixedElement>
      {/* 카테고리 수정완료 토스트 */}
      {showToast && (
        <div className="fixed flex flex-col w-full items-center translate-x-1/2 bottom-[104px] right-1/2 z-[9999]">
          <div
            className="text-sm text-white rounded-xl bg-[rgba(100,100,100,0.8)]
 flex w-[90%] h-[56px] px-5 py-[19px] justify-center items-center"
          >
            선택한 카테고리를 저장했어요
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
