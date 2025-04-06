"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface TutorialProps {
  tutorialStep: number;
  setIsTutorial?: (value: boolean) => void;
}

const Tutorial: React.FC<TutorialProps> = ({ tutorialStep, setIsTutorial }) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col justify-center z-999">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* ActionSheet container */}
      <div
        className={clsx(
          "relative z-50 w-full h-full flex justify-center items-center"
        )}
      >
        {tutorialStep === 1 ? (
          <Image
            src="/images/birds/home/tutorial_bluebird1.png"
            alt="tutorial_bluebird"
            width={375}
            height={420}
            onClick={() => {
              router.push("/send");
            }}
          />
        ) : (
          <Image
            src="/images/birds/home/tutorial_bluebird2.png"
            alt="tutorial_bluebird"
            width={375}
            height={567}
            className="self-start"
            onClick={() => {
              if (setIsTutorial) {
                setIsTutorial(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Tutorial;
