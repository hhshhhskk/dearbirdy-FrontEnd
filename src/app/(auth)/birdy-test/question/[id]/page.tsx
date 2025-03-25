"use client"; // 클라이언트 컴포넌트로 지정

import { useParams } from "next/navigation";
import BirdyTestForm from "@/components/signup/birdyTestTemp/BirdyTestForm";
import { notFound } from "next/navigation";

export default function BirdyTestQuestion() {
  const { id } = useParams();
  const step = Number(id);

  if (isNaN(step) || step < 1 || step > 12) {
    return notFound(); // 범위 밖의 값이면 404 페이지 처리
  }

  return <BirdyTestForm step={step} />;
}
