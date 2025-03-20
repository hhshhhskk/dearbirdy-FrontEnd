import SettingNavBar from "@/components/common/SettingNavBar";
import Image from "next/image"; // ✅ Next.js의 Image 컴포넌트 추가

const Page = () => {
  return (
    <div className="flex flex-col">
      <SettingNavBar />
      <div className="bg-[#F4F5EF] px-4 py-[10px]">
        <span className="text-[#6B7178] text-base font-medium leading-6 tracking-tight">
          닉네임
        </span>
      </div>
      <div className="px-4 flex flex-col gap-[9px]">
        <div className="">
          <div className="flex flex-col mt-3 w-full gap-[6px] bg-[#F0F1EC] border-1 border-[#E5E5EA] rounded-[12px] p-4">
            <div>
              <span className="text-[#6B7178] text-xs font-normal leading-4 tracking-tighter">
                현재 설정된 닉네임
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7178] text-lg font-bold leading-[26px] tracking-tight">
                사용자 닉네임
              </span>
              {/* ✅ 수정 버튼 */}
              <button className="flex items-center pl-1 pr-2 py-1 gap-0.5 rounded-md bg-[#292D32]">
                <Image
                  src="/images/common/icon-edit.svg"
                  alt="수정 아이콘"
                  width={24}
                  height={24}
                />
                <span className="text-[#E5E5EA] text-xs font-bold leading-4 tracking-tighter">
                  수정
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-[#AEAEB2] text-sm font-normal leading-[22px] tracking-tight ">
          <p>닉네임을 변경할 경우 14일 이후에 다시 변경할 수 있어요.</p>
          <p>특수문자는 사용할 수 없어요. (예: @, #, $, %, &, ~) </p>
        </div>
      </div>
      {/* <div className="w-full px-4 ">
        <button className="w-full px-4 py-[13px] bg-[#292D32] text-white text-[16px] leading-[24px] font-medium rounded-[12px] flex items-center justify-center select-none cursor-pointer">
          수정완료
        </button>
      </div> */}
    </div>
  );
};

export default Page;
