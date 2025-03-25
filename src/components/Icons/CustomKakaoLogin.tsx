import { getKakaoLoginUrl } from "@/lib/kakaoAuth";

export default function CustomKakaoLogin() {
  return (
    <button
      className="cursor-pointer w-full rounded-[12px] flex items-center justify-center gap-[8px] px-global py-[13px] bg-[#FEE500]"
      onClick={() => {
        window.location.href = getKakaoLoginUrl();
      }}
    >
      <img
        src="/images/logo/kakao-logo.svg"
        alt="카카오 로고"
        className="w-[18px] h-[18px]"
      />
      <span className="text-[15px] font-semibold text-[rgba(0,0,0,0.85)]">
        카카오로 시작하기
      </span>
    </button>
  );
}
