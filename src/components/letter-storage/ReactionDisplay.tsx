import { ReactionId, reactionList } from "@/constants/letter";
import Image from "next/image";

interface ReactionDisplayProps {
  reactionId: ReactionId;
}

export default function ReactionDisplay({ reactionId }: ReactionDisplayProps) {
  const reaction = reactionList.find((item) => item.id === reactionId);

  if (!reaction) return null;

  return (
    <div className="bg-line02 px-global py-[13px] flex items-center rounded-[12px]">
      <Image
        src={reaction?.imageSrc}
        alt={reactionId}
        width={24}
        height={24}
        className="mr-2"
      />
      {reaction?.message}
    </div>
  );
}
