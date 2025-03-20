interface BirdyTraitsProps {
  birdName: string;
  traits: string;
  explanation: string;
  color: string;
  background: string;
}

const BirdyTraits = ({
  birdName,
  traits,
  explanation,
  color,
  background,
}: BirdyTraitsProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 태그 (traits) */}
      <div className="mb-1">
        <span
          className="px-3 py-1 rounded-[4px] text-xs font-medium leading-4 tracking-[-0.048px]"
          style={{ color, backgroundColor: background }}
        >
          {traits}
        </span>
      </div>

      {/* 버디 타입 제목 */}
      <h2 className="text-[20px] font-bold text-[#292D32] mb-6 leading-[28px] tracking-[-0.08px]">
        {birdName}
      </h2>

      {/* 버디 특성 설명 */}
      <div className="mb-6">
        <p className="text-[14px] text-[#292D32] leading-[22px] tracking-[-0.056px] font-normal">
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default BirdyTraits;
