import Image from "next/image";
import React from "react";
import BellIcon from "../Icons/Header_bell_icon";
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData: IUserData;
  sse?: boolean;
  setSse: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IProps> = ({ userData, sse, setSse }) => {
  return (
    <header className="sticky top-0 z-10 bg-[#F9F8F3] flex select-none items-center justify-center h-[56px] px-4 mb-2">
      <div className="container flex items-center justify-between">
        <Image
          src="/images/logo/logo_black_M.svg"
          alt="홈 로고"
          width={98}
          height={24}
        />
        <BellIcon check={userData.read} sseCheck={sse} setSse={setSse} />
      </div>
    </header>
  );
};

export default Header;
