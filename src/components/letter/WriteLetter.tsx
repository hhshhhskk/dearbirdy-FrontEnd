"use client";

import { useLetterStore } from "@/store/useLetterStore";
import { useState, useRef } from "react";
import LetterGuideModal from "./LetterGuideModal";
import LetterProgress from "./LetterProgress";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface FormValues {
  title: string;
  letter: string;
}

export default function WriteLetter() {
  const { categoryName, setTitle, setLetter, setStep } = useLetterStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // ✅ 스크롤을 따라가기 위한 ref 추가
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [charCount, setCharCount] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 300) {
      setCharCount(e.target.value);
      textAreaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      const target = e.target;
      target.style.height = "auto"; // 초기화 후 다시 설정
      target.style.height = `${Math.min(target.scrollHeight, 320)}px`; // 최대 높이 제한 (320px)
    }
  };

  const onSubmit = async (data: FormValues) => {
    setTitle(data.title);
    setLetter(data.letter);

    setStep(3);
  };

  return (
    <div className="relative w-full max-w-global min-h-screen bg-[#f9f8f3] flex flex-col">
      {isDrawerOpen && (
        <LetterGuideModal
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          type="letter"
        />
      )}
      <header className="absolute top-0 w-full min-w-[343px]  h-[56px] flex justify-between items-center bg-[#F9F8F3]">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          className=""
          onClick={() => setStep(1)}
        />
        <div
          className={`flex h-10 px-4 py-2 items-center gap-1 rounded-[10px] ${
            charCount.length >= 30
              ? "bg-[#84A667] cursor-pointer"
              : "bg-[#D1D1D6]"
          }`}
          onClick={() => {
            if (charCount.length >= 30) {
              handleSubmit(onSubmit)();
            }
          }}
        >
          <span
            className={`text-center text-sm font-medium leading-[20px] tracking-[-0.056px] ${
              charCount.length >= 30 ? "text-[#F0F1EC]" : "text-[#8E8E93]"
            } `}
          >
            다음
          </span>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center mt-[64px]">
        <div className="flex items-center justify-start w-full mt-2.5">
          <p className="text-[#292D32] text-xl font-bold leading-7 tracking-[-0.08px]">
            {categoryName}에 대한 고민
            <br />
            이야기를 편지에 담아주세요
          </p>
        </div>
        <div
          className="flex items-center justify-start w-full mt-[7px]"
          onClick={() => setIsDrawerOpen(true)}
        >
          <p className="cursor-pointer text-[#84A667] text-center text-sm font-medium leading-5 tracking-[-0.056px] underline">
            편지 이렇게 쓰세요
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-[14px]"
        >
          {/* 제목 입력 필드 */}
          <div className="flex min-w-[375px] w-screen max-w-global p-4 flex-col items-start border-b border-[#E5E5EA]">
            <input
              {...register("title", {
                required: "편지 제목을 입력 해 주세요",
                maxLength: {
                  value: 15,
                  message: "최대 15자까지 입력할 수 있어요",
                },
              })}
              maxLength={15}
              placeholder="이 편지의 제목을 알려주세요 (15자 이내)"
              className="w-full h-6 text-[#292D32] caret-[#D6E173] placeholder-[#C7C7CC] text-[16px] font-medium leading-6 tracking-[-0.064px] 
  focus:outline-none"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* 내용 필드 */}
          <div className="flex flex-col min-w-[375px] w-screen max-w-global p-4">
            <textarea
              maxLength={300}
              {...register("letter", {
                required: "편지 내용을 입력해주세요",
              })}
              ref={(e) => {
                textAreaRef.current = e;
                register("letter").ref(e);
              }}
              placeholder="편지 내용을 입력해주세요"
              className="w-full text-[#292D32] placeholder-[#C7C7CC] text-[16px] font-medium leading-6 tracking-[-0.064px] min-h-[320px] caret-[#D6E173] focus:outline-none overflow-y-auto resize-none "
              onChange={(e) => handleChange(e)}
            />
            {errors.letter && (
              <p className="text-sm text-red-500">{errors.letter.message}</p>
            )}
          </div>
          <div className="absolute bottom-[44px] left-4 right-4 w-auto">
            {/* 프로그레스바 컴포넌트 적용 */}
            <div className="px-4">
              <LetterProgress letterLength={charCount.trim().length} />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
