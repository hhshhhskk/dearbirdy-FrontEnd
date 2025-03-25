"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBirdyTestStore } from "@/store/useBirdyTestStore";

export default function BirdyTestEntryPage() {
  const router = useRouter();
  const { answers } = useBirdyTestStore();

  if (!answers || answers.length === 0) {
    router.replace("/birdy-test/intro");
    return;
  }

  useEffect(() => {
    // 처음으로 null인 질문 index 찾기
    const nextUnansweredIndex = answers.findIndex((a) => a === null);

    if (nextUnansweredIndex === -1) {
      // 모든 질문에 답변 완료했다면 결과 페이지로
      router.replace("/birdy-test/result");
    } else {
      // 아직 안 푼 질문이 있으면 해당 페이지로
      router.replace(`/birdy-test/question/${nextUnansweredIndex + 1}`);
    }
  }, [answers, router]);

  return null;
}
