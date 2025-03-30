"use client";

import { useLetterStore } from "@/store/useLetterStore";
import { useState, useRef } from "react";
import LetterProgress from "./LetterProgress";
import { useForm } from "react-hook-form";
import CommonHeader from "../layout/CommonHeader";
import SmallButton from "../ui/SmallButton";
import LetterGuideModal from "./LetterGuideModal";
import {
  MAX_LETTER_COUNT,
  MIN_LETTER_COUNT,
} from "@/constants/progressMessage";
import BottomFixedElement from "../layout/BottomFixedElement";
import { postReply } from "@/services/letterReply";
import { useRouter } from "next/navigation";
import { useLetterInfoStore } from "@/store/letterInfoStore";

interface FormValues {
  title: string;
  letter: string;
}

interface WriteLetterProps {
  userRole: "MENTOR" | "MENTEE";
}

export default function WriteLetter({ userRole }: WriteLetterProps) {
  const { categoryName, setTitle, setLetter, setStep } = useLetterStore();
  const { categoryName: replyCategoryName, letterStatusSeq } =
    useLetterInfoStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

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
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const onSubmit = async (data: FormValues) => {
    setTitle(data.title);
    setLetter(data.letter);

    if (userRole === "MENTEE") {
      setStep(3);
    } else {
      setIsSending(true);

      try {
        const replyForm = {
          ...data,
          categoryName: replyCategoryName,
          letterStatusSeq,
        };

        console.log("replyForm", replyForm);

        await postReply(replyForm);
        router.push("/reply/complete");
      } catch (error) {
        console.error("❌ 편지 전송 실패:", error);
        alert("편지 전송에 실패했어요. 다시 시도해주세요.");
      } finally {
        setIsSending(false);
      }
    }
  };

  const isDisabled =
    charCount.length < MIN_LETTER_COUNT || charCount.length > MAX_LETTER_COUNT;

  return (
    <>
      <div className="min-h-safe-screen flex flex-col">
        <CommonHeader
          right={
            <SmallButton
              disabled={isDisabled || isSending}
              onClick={() => handleSubmit(onSubmit)()}
            >
              다음
            </SmallButton>
          }
          addPaddingX
          className="border-b border-line02"
        />

        <div className="flex flex-col flex-1 overflow-y-auto mb-[87px]">
          <div className="px-global py-[10px]">
            <h2 className="text-Title3_B_20">
              {categoryName || replyCategoryName}에 대한 고민
              <br />
              이야기를 편지에 담아주세요
            </h2>

            <button
              className="cursor-pointer text-Body2_R_14 text-green03 mt-[6px] underline underline-offset-2"
              onClick={() => setIsDrawerOpen(true)}
            >
              {userRole === "MENTEE" ? "편지" : "답장"} 이렇게 쓰세요
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col flex-1"
          >
            {/* 제목 입력 필드 */}
            <div className="px-5 py-global border-b border-line02">
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
                className="w-full caret-green01 placeholder-gray03 text-Body1_M_16 focus:outline-none"
              />

              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* 내용 필드 */}
            <div className="flex flex-1 px-5 py-global">
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
                className="w-full placeholder-gray03 text-Body1_R_16 caret-green01 focus:outline-none resize-none"
                onChange={(e) => handleChange(e)}
              />

              {errors.letter && (
                <p className="text-sm text-red-500">{errors.letter.message}</p>
              )}
            </div>
          </form>
        </div>

        <BottomFixedElement className="bg-white02 pt-2">
          <LetterProgress
            letterLength={charCount.trim().length}
            maxLength={MAX_LETTER_COUNT}
          />
        </BottomFixedElement>
      </div>

      {isDrawerOpen && (
        <LetterGuideModal
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          type={userRole === "MENTEE" ? "letter" : "reply"}
        />
      )}
    </>
  );
}
