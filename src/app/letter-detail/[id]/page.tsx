"use client";

import MenteeLetterView from "@/components/letter-storage/MenteeLetterView";
import MentorLetterView from "@/components/letter-storage/MentorLetterView";
import { BirdNameKr } from "@/constants/birdNameMap";
import { getLetterDetail } from "@/services/letterDetail";
import { getReactionIdByMessage } from "@/util/letterUtils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface ILetter {
  letterSeq: number;
  replyUserBird: BirdNameKr;
  replyUser: string;
  letterTitle: string;
  categoryName: string;
  letter: string;
  creatAt: string;
  sendUserBird: BirdNameKr;
  sendUser: string;
}

export interface IData {
  replyLetter: ILetter;
  sendLetter: ILetter;
  saved: boolean;
  letterStatusSeq: number;
  thanksToMentor: string;
}

export default function LetterDetailPage() {
  const params = useParams();
  const { id } = params;
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");
    if (storedData) {
      const userInfo = JSON.parse(storedData);
      setUserRole(userInfo.roleName);
    }
  }, []);

  const [letter, setLetter] = useState<IData | null>(null);

  useEffect(() => {
    const fetchLetterDetail = async () => {
      try {
        if (id) {
          const data = await getLetterDetail(id);
          setLetter(data);
        } else {
          console.error("ID가 없습니다.");
        }
      } catch (error) {
        console.error("편지 상세 정보 가져오기 실패:", error);
      }
    };

    fetchLetterDetail();
  }, [id]);

  console.log(letter);

  if (!letter) return <div />;

  if (userRole === "MENTOR") {
    return (
      <MentorLetterView
        myLetterSeq={letter?.letterStatusSeq}
        outgoingLetter={letter?.sendLetter}
        incomingLetter={letter?.replyLetter}
        reactionId={getReactionIdByMessage(letter?.thanksToMentor) || null}
        isSaved={letter?.saved}
      />
    );
  } else {
    return (
      <MenteeLetterView
        myLetterSeq={letter?.letterStatusSeq}
        outgoingLetter={letter?.sendLetter}
        incomingLetter={letter?.replyLetter}
        reactionId={getReactionIdByMessage(letter?.thanksToMentor) || null}
        isSaved={letter?.saved}
      />
    );
  }
}
