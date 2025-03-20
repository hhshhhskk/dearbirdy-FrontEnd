import HomeIcon from "@/components/Icons/Footer_home_icon";
import LetterIcon from "@/components/Icons/Footer_letter_icon";
import MyBirdyIcon from "@/components/Icons/Footer_mybirdy_icon";

export const menuItems = [
  { id: 1, Icon: HomeIcon, label: "홈", path: "/home" },
  { id: 2, Icon: LetterIcon, label: "편지 보관함", path: "/letter-storage" },
  { id: 3, Icon: MyBirdyIcon, label: "마이버디", path: "/mybirdy" },
] as const;
