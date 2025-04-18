"use client";

import { IUserData } from "@/app/(footershare)/home/page";
import { useDebounce } from "@/app/hooks/useDebounce";
import BottomFixedElement from "@/components/layout/BottomFixedElement";
import CommonHeader from "@/components/layout/CommonHeader";
import LoadingWave from "@/components/ui/LoadingWave";
import StyledButton from "@/components/ui/StyledButton";
import { getUserInfo } from "@/services/homeGetApi";
import { nickNameUpdateApi } from "@/services/myBirdy";
import { checkNickname } from "@/services/userService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [userData, setUserData] = useState<IUserData>();
  const router = useRouter();
  const [nickNameUpdate, setNickNameUpdate] = useState(false);
  const [newNickName, setNewNickName] = useState("");

  const [errorType, setErrorType] = useState<
    "tooShort" | "tooLong" | "invalidChar" | "fail" | null
  >(null);

  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const debouncedNickname = useDebounce(newNickName, 200);

  const getTrueLength = (val: string) => Array.from(val).length;
  const isValidNickname = (nickname: string) =>
    /^[가-힣a-zA-Z0-9]+$/.test(nickname);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewNickName(val);

    const len = getTrueLength(val);

    if (len > 10) {
      setErrorType("tooLong");
      setIsAvailable(false);
      return;
    }
    if (len < 2) {
      setErrorType("tooShort");
      setIsAvailable(false);
      return;
    }
    if (!isValidNickname(val)) {
      setErrorType("invalidChar");
      setIsAvailable(false);
      return;
    }

    setErrorType(null);
  };

  const helperMessage =
    errorType === "tooShort"
      ? "닉네임은 2자 이상으로 작성해주세요."
      : errorType === "tooLong"
      ? "최대 글자수는 10자까지입니다."
      : errorType === "invalidChar"
      ? "특수문자 제외 한글, 영문, 숫자만 사용할 수 있어요."
      : errorType === "fail"
      ? "이미 존재하는 닉네임입니다."
      : isAvailable
      ? "사용 가능한 닉네임입니다."
      : "특수문자 제외 한글, 영문, 숫자로만 작성해주세요.";

  const textColor = errorType
    ? "text-[#FF2A2C]"
    : isAvailable && "text-[#30B16C]";

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // 토큰이 없으면 로그인 페이지로 리디렉션
    const fetchData = async () => {
      if (!token) {
        router.push("/"); // 로그인 페이지로 리디렉션
      } else {
        const response = await getUserInfo();
        sessionStorage.setItem("userInfo", JSON.stringify(response.data));
        setUserData(response.data);
      }
    };
    fetchData();
  }, [router, nickNameUpdate]);

  useEffect(() => {
    const len = getTrueLength(debouncedNickname);
    console.log(len);

    if (len < 2 || len > 10 || !isValidNickname(debouncedNickname)) return;

    if (debouncedNickname) {
      const checkNicknamefetch = async () => {
        const available = await checkNickname(debouncedNickname);
        // console.log("중복아니면 true: ", available);

        setIsAvailable(available);
        setErrorType(available ? null : "fail");
      };
      checkNicknamefetch();
    }
  }, [debouncedNickname]);

  const buttonClicked = async () => {
    const status = await nickNameUpdateApi(debouncedNickname);
    if (status === 200) {
      setNickNameUpdate(false);
    }
  };

  if (!userData) {
    return <LoadingWave />;
  }
  // console.log("isAvailable", isAvailable);
  // console.log("새로운 닉네임: ", newNickName);

  return (
    <>
      <CommonHeader title="내 정보 수정" addPaddingX />

      <div className="w-full bg-line01 px-global py-[10px]">
        <h2 className="py-2 text-Body1_M_16 text-gray06">닉네임</h2>
      </div>

      <div className="px-global">
        <div className="my-[14px] w-full bg-line02 border-1 border-gray01 rounded-[10px] px-5 py-global text-gray06">
          <p className="text-Caption1_R_12">현재 설정된 닉네임</p>

          <div className="flex items-center justify-between">
            {/* 수정중 */}
            {nickNameUpdate ? (
              <>
                <input
                  autoFocus
                  type="text"
                  value={newNickName}
                  onChange={handleChange}
                  className="py-1 text-Body0_B_18 focus:outline-none focus:ring-0"
                />
              </>
            ) : (
              <>
                <p className="py-1 text-Body0_B_18">{userData.nickname}</p>
                <button
                  className="flex items-center pl-1 pr-2 py-1 gap-0.5 rounded-[6px] bg-black01 cursor-pointer"
                  onClick={() => {
                    setNickNameUpdate(true);
                  }}
                >
                  <Image
                    src="/images/common/icon-edit.svg"
                    alt="수정 아이콘"
                    width={24}
                    height={24}
                  />
                  <span className="text-gray01 text-Caption1_B_12">수정</span>
                </button>
              </>
            )}
          </div>
        </div>

        {newNickName && nickNameUpdate ? (
          <div className={`${textColor}`}>{helperMessage}</div>
        ) : (
          <ul className="ml-6 list-disc list-outside text-gray04 text-Body2_R_14">
            <li>
              <span>
                닉네임을 변경할 경우 14일 이후에 다시 변경할 수 있어요.
              </span>
            </li>
            <li>
              <span>특수문자는 사용할 수 없어요. (예: @, #, $, %, &, ~)</span>
            </li>
          </ul>
        )}
        {nickNameUpdate && (
          <BottomFixedElement>
            <StyledButton
              className="h-[50px]"
              onClick={buttonClicked}
              disabled={isAvailable ? false : true}
            >
              수정완료
            </StyledButton>
          </BottomFixedElement>
        )}
      </div>

      {/* <div className="w-full px-4 ">
        <button className="w-full px-4 py-[13px] bg-[#292D32] text-white text-[16px] leading-[24px] font-medium rounded-[12px] flex items-center justify-center select-none cursor-pointer">
          수정완료
        </button>
      </div> */}
    </>
    // <div className="flex flex-col items-center px-global">
    //   <CommonHeader title="닉네임 수정" />
    //   <div className="w-full bg-line01 px-global py-[10px]">
    //     <h2 className="text-Body1_M_16 text-gray06">닉네임</h2>
    //   </div>
    //   <Image
    //     src={`/images/my-birdy/birdy_coding.png`}
    //     alt="닉네임 수정"
    //     width={198}
    //     height={152}
    //     className="mt-6"
    //   />
    //   <p className="text-[#8E8E93] text-center text-base font-bold leading-[24px] tracking-[-0.064px] mt-5">
    //     닉네임 변경은 준비 중이에요
    //   </p>
    //   <p className="text-[#8E8E93] text-center text-base font-normal leading-[24px] tracking-[-0.064px] mt-4">
    //     얼른 만들어서 재치있는 새로운 닉네임을
    //     <br />
    //     설정할 수 있도록 해드릴게요.
    //     <br />
    //     조금만 기다려주세요!
    //   </p>
    // </div>
  );
};

export default Page;
