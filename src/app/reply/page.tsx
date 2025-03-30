"use client";

import ReplyPreview from "@/components/letter/ReplyPreview";
import WriteLetter from "@/components/letter/WriteLetter";
import React, { useState } from "react";

const ReplyPage: React.FC = () => {
  const [previewModal, setPreviewModal] = useState(false);

  return (
    <>
      {previewModal && <ReplyPreview setPreviewModal={setPreviewModal} />}

      <WriteLetter userRole="MENTOR" />

      <div
        onClick={() => setPreviewModal(true)}
        className="cursor-pointer absolute bottom-23 right-0 p-[10px] flex justify-center items-center gap-[4px] rounded-[10px] border border-[#84A667] bg-white shadow-[1px_1px_8px_0px_#D2D4CB] mr-4"
      >
        <span className="text-[#84A667] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
          편지 다시 보기
        </span>
      </div>
    </>
  );
};

export default ReplyPage;
