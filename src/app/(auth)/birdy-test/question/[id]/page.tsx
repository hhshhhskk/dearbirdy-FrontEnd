import BirdyTestForm from "@/components/signup/birdyTestTemp/BirdyTestForm";
import { notFound } from "next/navigation";

// PageProps 타입 정의
type PageProps = {
  params: {
    id: string;
  };
};

export default function BirdyTestQuestion({ params }: PageProps) {
  const step = Number(params.id);

  if (isNaN(step) || step < 1 || step > 12) {
    return notFound(); // 범위 밖의 값이면 404 페이지 처리
  }

  return <BirdyTestForm step={step} />;
}
