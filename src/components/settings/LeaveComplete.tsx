"use client";

import { useRouter } from "next/navigation";
import React from "react";

const LeaveComplete = () => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex flex-col justify-end z-999">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="absolute z-50 w-full -translate-x-1/2 translate-y-1/2 left-1/2 max-w-global bottom-1/2 px-global ">
        <div className="flex flex-col px-4 py-5 rounded-[18px] bg-white01">
          <div className="text-black01 text-Body1_B_18 ">
            탈퇴가 완료되었습니다
          </div>
          <div className="mt-2 text-gray06 text-Body2_R_14">
            지금까지 디어버디를 이용해주셔서 감사드립니다
          </div>
          <div className="flex w-full gap-2 mt-4 text-center text-white text-Body2_M_14">
            <div
              className="w-full py-3 bg-black01 rounded-[10px]"
              onClick={() => router.push("/")}
            >
              종료
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveComplete;
