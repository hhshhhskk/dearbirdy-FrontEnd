"use client";

import { useRouter } from "next/navigation";
import { useBirdyTestStore } from "@/store/useBirdyTestStore";
import ProgressBar from "../../ui/ProgressBar";
import { OptionValue, questions } from "@/constants/birdyTest";
import clsx from "clsx";

export const ProgressLabel = ({
  value,
  max,
}: {
  value: number;
  max: number;
}) => {
  return (
    <div className="rounded-[6px] bg-white01 px-[6px] py-[1px] border border-[#F0F1EC] self-center">
      <span className="text-Body2_B_14 text-green03">{value}</span>
      <span className="text-Body2_M_14 text-gray04"> / {max}</span>
    </div>
  );
};

interface AnswerOptionButtonProps {
  emoji: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const AnswerOptionButton = ({
  emoji,
  label,
  isSelected,
  onClick,
}: AnswerOptionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer rounded-xl px-4 py-[27px] transition-all w-full flex align-center gap-2 text-Body0_M_18 text-left",
        isSelected
          ? "border border-green03 bg-line01"
          : "border border-line01 bg-white01"
      )}
    >
      <span className="mr-2">{emoji}</span>
      <span>{label}</span>
    </button>
  );
};

interface Props {
  step: number;
}

export default function BirdyTestForm({ step }: Props) {
  const router = useRouter();
  const { answers, setAnswer, calculateResults } = useBirdyTestStore();
  const currentIndex = step - 1;
  const question = questions[currentIndex];

  if (!question) return null;

  const handleSelect = (answerValue: OptionValue) => {
    setAnswer(currentIndex, answerValue);

    setTimeout(() => {
      if (step < questions.length) {
        router.push(`/birdy-test/question/${step + 1}`);
      } else {
        calculateResults();
        router.push("/birdy-test/result");
      }
    }, 200);
  };

  return (
    <>
      <div className="flex flex-col gap-[6px] mb-[30px]">
        <ProgressLabel value={step} max={questions.length} />
        <ProgressBar value={step} max={questions.length} color="green" />
      </div>

      <div className="text-center mb-[64px]">
        <h2 className="text-Body1_R_16 text-gray06">질문 {step}</h2>
        <p className="text-Title3_B_20 whitespace-pre-wrap">{question.text}</p>
      </div>

      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => (
          <AnswerOptionButton
            key={i}
            emoji={opt.emoji}
            label={opt.label}
            isSelected={answers[currentIndex] === i}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </>
  );
}
