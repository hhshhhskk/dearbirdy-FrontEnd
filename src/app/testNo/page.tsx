import NotificationSSE from "@/components/home/NotificationSSE";
import React from "react";

// 실시간 알림 테스트용
const SendPage: React.FC = () => {
  return (
    <div>
      <NotificationSSE />
    </div>
  );
};

export default SendPage;
