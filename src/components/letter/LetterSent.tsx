"use client";

import { birdNameMap } from "@/constants/birdNameMap"; // ✅ birdName 변환 맵 추가
import { useLetterStore } from "@/store/useLetterStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomFixedElement from "../layout/BottomFixedElement";
import StyledButton from "../ui/StyledButton";
import NotificationToggle from "./NotificationToggle";
import { useLetterInfoStore } from "@/store/letterInfoStore";

// ✅ Lottie를 SSR에서 제외하여 클라이언트에서만 로드
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LetterSent({ type }: { type: "send" | "reply" }) {
  const { myBirdName, setMyBirdName, selectedBird, resetLetter } =
    useLetterStore();
  const { nickname: replyNickname } = useLetterInfoStore();
  const router = useRouter();
  const [animationData, setAnimationData] = useState(null);

  /** ✅ 페이지 진입 시 세션스토리지에서 사용자 새 이름을 가져옴 */
  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.birdName) {
        setMyBirdName(parsedData.birdName);
      }
    }
  }, [setMyBirdName]);

  /** ✅ 애니메이션 로드 */
  useEffect(() => {
    if (!myBirdName) return; // ✅ myBirdName이 없으면 실행하지 않음

    const birdKey = birdNameMap[myBirdName] || "parrot";
    import(`@/animations/${birdKey}_deliver.json`)
      .then((data) => setAnimationData(data.default))
      .catch((err) => console.error("❌ 애니메이션 로드 실패:", err));
  }, [myBirdName]); // ✅ myBirdName이 설정된 후 실행

  return (
    <>
      <div className="flex flex-col min-h-safe-screen pt-[108px] px-global pb-[191px]">
        <div className="text-Title3_B_20 text-center">
          나의 {type === "send" ? myBirdName : "버디"}가{" "}
          {type === "send" ? selectedBird : replyNickname}에게 <br />
          마음을 정성껏 전달할 거예요
        </div>

        <div className="flex-grow flex items-center justify-center overflow-hidden">
          {animationData && (
            <Lottie
              animationData={animationData}
              className="max-w-full max-h-full w-[375px] h-[310px]"
            />
          )}
        </div>
      </div>

      <BottomFixedElement>
        <div className="px-global py-[10px] border border-gray01 bg-[#F0F1EC] rounded-[12px] flex justify-between items-center mb-[33px]">
          <div className="text-Body2_R_14 text-gray06">
            {type === "send"
              ? "빠르면 하루, 최대 7일이 걸릴 수 있어요."
              : "답장을 확인하면 고마움 표시가 도착해요."}
            <br />
            {type === "send" ? "답장이" : "고마움 표시가"} 오면 알림을 받을까요?
          </div>

          <NotificationToggle />
        </div>

        <StyledButton
          onClick={() => {
            resetLetter();
            router.push("/home");
          }}
        >
          홈으로
        </StyledButton>
      </BottomFixedElement>
    </>
  );
}
