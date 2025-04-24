// "use client";

// import React from "react";

// const TestPage = () => {
//   return <></>;
// };

// export default TestPage;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
// import { getThanks } from "@/services/letterDetail";
import { Reaction, reactionList } from "@/constants/letter";
import { BirdNameKr } from "@/constants/birdNameMap";
// import { useRouter } from "next/navigation";
import ActionSheet from "@/components/ui/ActionSheet";
import EXCITED from "@/animations/thanks/EXCITED.json";
import dynamic from "next/dynamic";

interface ReactionOptionButtonProps {
  reaction: Reaction;
  letterSeq: number;
  onClose: () => void;
  setReactionId: React.Dispatch<React.SetStateAction<string>>;
  setIsThanksModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lottie = dynamic(() => import("lottie-react"), { ssr: false }); // 서버 사이드 렌더링 방지

const ReactionOptionButton = ({
  reaction,
  letterSeq,
  onClose,
  setReactionId,
  setIsThanksModalVisible,
}: ReactionOptionButtonProps) => {
  // const router = useRouter();
  const reactionButtonHandler = () => {
    // getThanks(letterSeq, reaction.id);
    console.log(letterSeq);
    setReactionId(reaction.id);
    onClose();
    setIsThanksModalVisible(true);
    // router.push("/letters");
  };

  return (
    <button className="flex items-center w-full px-global ">
      <Image
        src={reaction.imageSrc}
        alt={reaction.id}
        width={104}
        height={140}
        onClick={reactionButtonHandler}
        className="cursor-pointer"
      />
    </button>
  );
};

interface ReactionSelectionActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  fromUserBirdName?: BirdNameKr;
  letterSeq: number;
  setReactionId: React.Dispatch<React.SetStateAction<string>>;
  setIsThanksModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReactionSelectionActionSheet = ({
  isOpen,
  onClose,
  setReactionId,
  setIsThanksModalVisible,
  letterSeq,
}: ReactionSelectionActionSheetProps) => {
  return (
    <ActionSheet isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 text-center mt-global">
        <h2 className="text-Title3_B_20">
          선배버디로부터 받은
          <br />
          답장은 어땠나요?
        </h2>
        <p className="mt-5 text-Body2_M_14 text-gray06">
          선배버디에게 전달하고 싶은
          <br />
          고마움 카드를 들고 있는 버디를 선택해주세요!
        </p>
      </div>

      <div className="flex mb-40 mt-9">
        {reactionList.map((reaction) => (
          <ReactionOptionButton
            key={reaction.id}
            reaction={reaction}
            letterSeq={letterSeq}
            onClose={onClose}
            setReactionId={setReactionId}
            setIsThanksModalVisible={setIsThanksModalVisible}
          />
        ))}
      </div>
    </ActionSheet>
  );
};

interface SendReactionButtonProps {
  fromUserBirdName?: BirdNameKr;
  letterSeq: number;
}

export default function SendReactionButton({
  fromUserBirdName,
  letterSeq,
}: SendReactionButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isThanksModalVisible, setIsThanksModalVisible] = useState(false);

  const [lottieData, setLottieData] = useState(null);
  const [reactionId, setReactionId] = useState("");

  useEffect(() => {
    if (reactionId) {
      import(`@/animations/thanks/${reactionId}.json`).then((data) => {
        setLottieData(data.default);
      });
    }
  }, [reactionId]);

  return (
    <>
      <div
        className="flex px-global py-[13px] justify-between items-center rounded-[12px] bg-green03 cursor-pointer"
        onClick={() => setIsModalVisible(true)}
      >
        <div className="flex">
          <Image
            src="/images/icons/heart_icon.svg"
            alt="하트 아이콘"
            width={24}
            height={24}
            className="mr-1"
          />

          <span className="text-line02 text-Body1_M_16">고마움 표시하기</span>
        </div>

        <Image
          src="/images/icons/arrow_down_icon.svg"
          alt="아래방향 아이콘"
          width={24}
          height={24}
        />
      </div>

      <ReactionSelectionActionSheet
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        fromUserBirdName={fromUserBirdName}
        letterSeq={letterSeq}
        setReactionId={setReactionId}
        setIsThanksModalVisible={setIsThanksModalVisible}
      />
      {isThanksModalVisible && (
        <div>
          <div className="fixed inset-0 flex flex-col justify-end z-999">
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black opacity-70"
              onClick={() => setIsThanksModalVisible(false)}
            />

            {/* ActionSheet container */}

            <div
              className="absolute top-0 w-full -translate-x-1/2 translate-y-1/4 left-1/2"
              onClick={() => setIsThanksModalVisible(false)}
            >
              <div className="flex justify-center">
                <Lottie
                  animationData={lottieData}
                  loop={false}
                  autoplay={true}
                  className="w-3/4"
                />
              </div>
              <Lottie animationData={EXCITED} loop={true} autoplay={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
