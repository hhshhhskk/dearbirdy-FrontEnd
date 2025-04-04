"use client";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const Tutorial = () => {
  const [isNext, setIsNext] = useState(true);
  const router = useRouter();
  console.log("isNext : ", isNext);

  return (
    <div className="fixed inset-0 flex flex-col justify-center z-999">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* ActionSheet container */}
      <div
        className={clsx(
          "relative z-50 w-full flex justify-center items-center"
        )}
      >
        {isNext ? (
          <Image
            src="/images/birds/home/tutorial_bluebird1.png"
            alt="tutorial_bluebird"
            width={375}
            height={420}
            onClick={() => setIsNext(false)}
          />
        ) : (
          <Image
            src="/images/birds/home/tutorial_bluebird2.png"
            alt="tutorial_bluebird"
            width={375}
            height={567}
            className=""
            onClick={() => {
              router.push("/send");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Tutorial;
