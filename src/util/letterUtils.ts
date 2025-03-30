import { ReactionId, reactionList } from "@/constants/letter";

export const formatLetterDate = (dateString: string): string => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const hours = date.getHours() + 9;

  // 시간에 따라 아침, 점심, 저녁 구분
  let timeOfDay = "";
  if (hours >= 6 && hours < 12) {
    timeOfDay = "아침";
  } else if (hours >= 12 && hours < 14) {
    timeOfDay = "점심";
  } else if (hours >= 14 && hours < 19) {
    timeOfDay = "저녁";
  } else {
    timeOfDay = "밤";
  }

  const hour = hours % 12 || 12; // 12시간제 포맷으로 변환

  return `${month}월 ${day}일, ${timeOfDay} ${hour}시의 마음`;
};

export const getReactionIdByMessage = (
  message: string
): ReactionId | undefined => {
  const reaction = reactionList.find((item) => item.message === message);
  return reaction?.id;
};
