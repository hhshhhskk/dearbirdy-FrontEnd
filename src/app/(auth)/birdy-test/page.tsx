"use client";

import { useRouter } from "next/navigation";
import { useBirdyTestStore } from "@/store/useBirdyTestStore";
import { useEffect } from "react";

export default function BirdyTestEntryPage() {
  const router = useRouter();
  const { answers } = useBirdyTestStore();

  useEffect(() => {
    // 만약 answers가 없거나 길이가 0이면 intro로 리디렉션
    if (!answers || answers.length === 0) {
      router.replace("/birdy-test/intro");
      return; // early return 후 useEffect 종료
    }

    // 처음으로 null인 질문 index 찾기
    const nextUnansweredIndex = answers.findIndex((a) => a === null);

    if (nextUnansweredIndex === -1) {
      // 모든 질문에 답변 완료했다면 결과 페이지로
      router.replace("/birdy-test/result");
    } else {
      // 아직 안 푼 질문이 있으면 해당 페이지로
      router.replace(`/birdy-test/question/${nextUnansweredIndex + 1}`);
    }
  }, [answers, router]); // 의존성 배열에 answers와 router 추가

  return null; // 렌더링되는 UI 없음
}
