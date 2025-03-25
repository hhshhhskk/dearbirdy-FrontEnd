import { getKakaoLoginUrl } from "@/lib/kakaoAuth";
import Image from "next/image";

export default function CustomKakaoLogin() {
  return (
    <button
      className="cursor-pointer w-full rounded-[12px] flex items-center justify-center gap-[8px] px-global py-[13px] bg-[#FEE500]"
      onClick={() => {
        window.location.href = getKakaoLoginUrl();
      }}
    >
      <Image
        src="/images/logo/kakao-logo.svg"
        alt="카카오 로고"
        width={18}
        height={18}
      />
      <span className="text-[15px] font-semibold text-[rgba(0,0,0,0.85)]">
        카카오로 시작하기
      </span>
    </button>
  );
}
