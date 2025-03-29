import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/useSignupStore";
import { postAdditionalInfo } from "@/services/authService";
import StyledButton from "@/components/ui/StyledButton";
import BottomFixedElement from "@/components/layout/BottomFixedElement";

const BirdyResultActions = () => {
  const router = useRouter();
  const { birdName, nickname, userRole, userCategory, resetSignup } =
    useSignupStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const userData = {
        birdName,
        nickname,
        userRole,
        userCategory,
      };

      await postAdditionalInfo(userData);
      resetSignup();

      sessionStorage.removeItem("signup-storage");
      sessionStorage.removeItem("birdytest-storage");
      sessionStorage.removeItem("userData");

      router.replace("/home");
    } catch (error) {
      console.error("❌ 추가 정보 전송 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BottomFixedElement>
      <StyledButton onClick={handleNext} disabled={isSubmitting}>
        환영해, 나의 버디!
      </StyledButton>
    </BottomFixedElement>
  );
};

export default BirdyResultActions;
