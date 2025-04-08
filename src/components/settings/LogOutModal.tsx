"use client";

import { useRouter } from "next/navigation";

interface LogOutModalProps {
  onClose: () => void;
}

export default function LogOutModal({ onClose }: LogOutModalProps) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex flex-col justify-end z-999">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="absolute z-50 w-full -translate-x-1/2 translate-y-1/2 left-1/2 max-w-global bottom-1/2 px-global ">
        <div className="flex flex-col gap-4 px-4 py-5 rounded-[18px] bg-white01">
          <div className="text-black01 text-Body1_B_16">
            로그아웃 하시겠어요?
          </div>
          <div className="flex w-full gap-2 text-center text-white text-Body2_M_14 ">
            <div
              className="w-full py-3 bg-gray06 rounded-[10px]"
              onClick={onClose}
            >
              취소
            </div>
            <div
              className="w-full py-3 bg-black01 rounded-[10px]"
              onClick={() => router.push("/")}
            >
              로그아웃
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
