"use client";

import Category from "@/components/letter/Category";
import LetterSent from "@/components/letter/LetterSent";
import SelectBird from "@/components/letter/SelectBird";
import WriteLetter from "@/components/letter/WriteLetter";
import { useLetterStore } from "@/store/useLetterStore";

export default function AppRouter() {
  const { step } = useLetterStore();

  return (
    <div>
      {step === 1 && <Category />}
      {step === 2 && <WriteLetter userRole="MENTEE" />}
      {step === 3 && <SelectBird />}
      {step === 4 && <LetterSent type="send" />}
    </div>
  );
}
