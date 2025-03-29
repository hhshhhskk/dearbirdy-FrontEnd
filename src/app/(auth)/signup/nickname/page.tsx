"use client";

import InfoBox from "@/components/common/InfoBox";
import BottomFixedElement from "@/components/layout/BottomFixedElement";
import StyledButton from "@/components/ui/StyledButton";
import StyledInput from "@/components/ui/StyledInput";
import { checkNickname } from "@/services/userService";
import { useSignupStore } from "@/store/useSignupStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const isValidNickname = (nickname: string) => {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  return nicknameRegex.test(nickname);
};

export default function NicknamePage() {
  const { setNickname } = useSignupStore();
  const router = useRouter();

  const [nickname, setInput] = useState("");
  const [debouncedNickname, setDebouncedNickname] = useState(""); // 디바운싱 적용 값
  const [errorType, setErrorType] = useState<
    "tooShort" | "tooLong" | "invalidChar" | "fail" | null
  >(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    if (val.length > 10) {
      setErrorType("tooLong");
      setIsAvailable(false);
      return;
    }
    if (val.length < 2) {
      setErrorType("tooShort");
      setIsAvailable(false);
      return;
    }
    if (!isValidNickname(val)) {
      setErrorType("invalidChar");
      setIsAvailable(false);
      return;
    }

    setErrorType(null);
    setDebouncedNickname(val);
  };

  useEffect(() => {
    if (debouncedNickname.length < 2 || debouncedNickname.length > 10) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      const available = await checkNickname(debouncedNickname);
      setIsAvailable(available);
      setErrorType(available ? null : "fail");
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedNickname]);

  const handleNext = () => {
    setNickname(nickname);
    router.push("/signup/user-role");
  };

  const helperMessage =
    errorType === "tooShort"
      ? "닉네임은 2자 이상으로 작성해주세요."
      : errorType === "tooLong"
      ? "최대 글자수는 10자까지입니다."
      : errorType === "invalidChar"
      ? "특수문자 제외 한글, 영문, 숫자만 사용할 수 있어요."
      : errorType === "fail"
      ? "이미 존재하는 닉네임입니다."
      : isAvailable
      ? "사용 가능한 닉네임입니다."
      : "특수문자 제외 한글, 영문, 숫자로만 작성해주세요.";

  return (
    <>
      <InfoBox
        imageSrc="/images/signup/bluebird.svg"
        altText="닉네임 아이콘"
        text="고마워요! 우선은요. 제가 당신을 기억할 수 있게 이름을 알려주세요!"
      />

      <div className="pt-[44px]">
        <StyledInput
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임을 알려주세요!"
          maxLength={10}
          isLoading={loading}
          isValid={isAvailable || false}
          error={!!errorType}
          rightIconSrc="/images/icons/icon_check.svg"
          helperText={helperMessage}
          count={`${nickname.length}/10`}
        />
      </div>

      <BottomFixedElement>
        <StyledButton onClick={handleNext} disabled={!isAvailable}>
          다음
        </StyledButton>
      </BottomFixedElement>
    </>
  );
}
