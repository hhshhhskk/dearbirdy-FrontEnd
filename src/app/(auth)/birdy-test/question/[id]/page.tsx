import BirdyTestForm from "@/components/signup/birdyTestTemp/BirdyTestForm";
import { notFound } from "next/navigation";

export default function BirdyTestQuestion({
  params,
}: {
  params: { id: string };
}) {
  const step = Number(params.id);

  if (isNaN(step) || step < 1 || step > 12) {
    return notFound();
  }

  return <BirdyTestForm step={step} />;
}
