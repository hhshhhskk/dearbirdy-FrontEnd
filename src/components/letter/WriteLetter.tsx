"use client";

import { useLetterStore } from "@/store/useLetterStore";
import { useState } from "react";
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
import { LetterType } from "@/constants/letter";
import ChevronLeft from "../../components/Icons/common/LeftArrow";
import LetterBackModal from "./LetterBackModal";

function ExitLetterButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        aria-label="뒤로가기"
        className="cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" stroke="#292D32" />
      </button>

      {isDialogOpen && (
        <LetterBackModal onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  );
}

interface FormValues {
  title: string;
  letter: string;
}

interface WriteLetterProps {
  type: LetterType;
}

export default function WriteLetter({ type }: WriteLetterProps) {
  const { categoryName, setTitle, setLetter } = useLetterStore();
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

  const [charCount, setCharCount] = useState<string>("");

  const onSubmit = async (data: FormValues) => {
    setTitle(data.title);
    setLetter(data.letter);

    if (type === "OUTGOING") {
      router.push("/send/select-bird");
    } else {
      setIsSending(true);

      try {
        const replyForm = {
          ...data,
          categoryName: replyCategoryName,
          letterStatusSeq,
        };

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
          left={<ExitLetterButton />}
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
              {type === "OUTGOING" ? "편지" : "답장"} 이렇게 쓰세요
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
                maxLength={400}
                {...register("letter", {
                  required: "편지 내용을 입력해주세요",
                })}
                placeholder="편지 내용을 입력해주세요"
                className="w-full placeholder-gray03 text-Body1_R_16 caret-green01 focus:outline-none resize-none"
                onChange={(e) => setCharCount(e.target.value)}
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
          type={type}
        />
      )}
    </>
  );
}
