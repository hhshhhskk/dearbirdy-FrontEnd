"use client";

import InfoBox from "@/components/common/InfoBox";
import RoleCard from "@/components/signup/RoleCard";
import TermsStep from "@/components/signup/TermsStep";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StyledButton from "@/components/ui/StyledButton";
import { useSignupStore } from "@/store/useSignupStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserRolePage() {
  const router = useRouter();
  const { setUserRole } = useSignupStore();

  const [selectedRole, setSelectedRole] = useState<"MENTEE" | "MENTOR" | null>(
    null
  );
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSelectRole = (role: "MENTEE" | "MENTOR") => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole) {
      setUserRole(selectedRole);
      setIsTermsOpen(true);
    }
  };

  const handleTermsClose = () => {
    setIsTermsOpen(false);
    if (selectedRole === "MENTEE") {
      setIsNavigating(true);
    } else {
      router.push("/signup/user-category");
    }
  };

  if (isNavigating) {
    return (
      <LoadingSpinner
        message={`이제 나의 버디들을\n만나러 가볼까요?`}
        onDone={() => router.push("/birdy-test/intro")}
      />
    );
  }

  return (
    <>
      <div>
        <InfoBox
          imageSrc="/images/signup/bluebird-3.svg"
          altText="역할 선택 아이콘"
          text="고민 상담이 필요한 후배와 들어줄 선배 중 어느 쪽에 해당하는지 궁금해요."
        />

        <div className="flex justify-center gap-[7px] mt-11">
          <RoleCard
            role="MENTEE"
            selectedRole={selectedRole}
            onSelect={handleSelectRole}
            imageSrc="/images/role/mentee.svg"
            description1="조언을 듣고 싶은"
            description2="2040"
            title="인생후배"
          />

          <RoleCard
            role="MENTOR"
            selectedRole={selectedRole}
            onSelect={handleSelectRole}
            imageSrc="/images/role/mentor.svg"
            description1="조언을 해주고픈"
            description2="5060"
            title="인생선배"
          />
        </div>

        <div className="absolute bottom-[44px] left-0 right-0 px-global">
          <StyledButton onClick={handleNext} disabled={!selectedRole}>
            다음
          </StyledButton>
        </div>
      </div>

      {isTermsOpen && <TermsStep isModal={true} onClose={handleTermsClose} />}
    </>
  );
}
