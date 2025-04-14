"use client";

import CommonHeader from "@/components/layout/CommonHeader";
import React from "react";

const NoticePage = () => {
  return (
    <div className={"flex flex-col w-full  px-global overflow-y-auto"}>
      <CommonHeader title="공지" />
      <div className="text-Title3_B_20 text-black01">
        업데이트 소식을 전해드려요
      </div>
      <div className="text-Body2_R_14 text-gray06">4월 15일</div>
      <div className="mt-4">
        안녕하세요, 디어버디 사용자 여러분! ✨ 여러분의 많은 요청에 답하여
        드디어 기다리던 새 기능이 업데이트 되었어요!
      </div>
      <div className="text-black01">
        <div className="mt-4 text-black01 text-Body1_B_16">
          무엇이 새로워졌나요?
        </div>
        <div className="text-black01 text-Body1_R_16">
          1. 인생선배를 위한 카테고리 변경 기능: 이제 인생선배들은 자신의 전문
          분야나 관심사에 맞는 카테고리를 언제든 변경할 수 있어요!
          <br />
          2. 신고기능 추가: 더 안전하고 건강한 커뮤니티를 위해 부적절한 콘텐츠를
          신고할 수 있는 기능이 추가되었어요.
          <br />
          3. 이메일 알림 확인 기능: 회원가입 시 등록한 이메일로 디어버디의 중요
          알림을 받아볼 수 있어요!
        </div>
        <div className="mt-4 text-black01 text-Body1_B_16">
          어떻게 이용하나요?
        </div>
        <div className="text-black01 text-Body1_R_16">
          카테고리 변경 (인생선배) <br />
          1. 마이버디로 들어가 주세요
          <br /> 2. 인생선배 프로필 아래의 설정으로 들어가주세요
          <br />
          3. 편지 카테고리 변경으로 들어가주세요
          <br />
          4. 원하는 카테고리를 선택하고 저장 버튼을 누르면 완료!
        </div>
        <div className="mt-4 text-black01 text-Body1_R_16">
          신고기능 사용하기
        </div>
        <div className="text-black01 text-Body1_R_16">
          1. 해당 게시물 우측 상단 점 세 개를 탭해주세요 <br />
          2. 신고 사유를 선택하고 신고 버튼을 누르면 완료!
        </div>
        <div className="mt-4 text-black01 text-Body1_R_16">
          이메일 알림 설정하기
        </div>
        <div className="text-black01 text-Body1_R_16">
          1. 마이버디 설정 메뉴로 이동해주세요
          <br />
          2. 편지 알림 받기 버튼을 눌러 알림 설정을 ON/OFF 할 수 있어요!
        </div>
        <div className="mt-4 text-black01 text-Body1_B_16">알아두세요!</div>
        <ul className="text-black01 text-Body1_R_16">
          <li>• 인생선배님 카테고리 변경은 언제든지 가능해요</li>
          <li>
            • 신고된 내용은 운영팀에 의해 검토되며, 커뮤니티 가이드라인에 따라
            조치됩니다
          </li>
          <li>• 이메일 알림은 언제든지 설정에서 켜고 끌 수 있어요</li>
        </ul>
        <div className="mt-4 text-black01 text-Body1_B_16">앞으로의 계획</div>
        <div className="text-black01 text-Body1_R_16">
          디어버디 팀은 여러분의 의견을 항상 소중히 듣고 있어요. 앞으로도 더
          많은 재미있고 유용한 기능들을 계속해서 추가할 예정이니 많은 기대와
          관심 부탁드려요!
          <br />
          <br />
          다음 업데이트도 기대해주세요! 곧 여러분을 더 놀라게 해드릴 특별한
          기능이 준비 중이랍니다. 👀 디어버디와 함께 더 즐거운 하루 보내세요!
        </div>
        <div className="mb-12">
          <br />
          디어버디 팀 드림 🕊️💌
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
