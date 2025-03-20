// /pages/api/notifications.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // 인증 로직 추가 (예: 토큰 검증)

  if (req.method === "GET") {
    // SSE 연결을 위한 응답 설정
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // 알림을 보내는 함수 (예: 5초마다)
    const sendNotification = () => {
      res.write(
        `data: ${JSON.stringify({ message: "새 알림이 도착했습니다!" })}\n\n`
      );
    };

    // 5초마다 알림 전송
    const intervalId = setInterval(sendNotification, 5000);

    req.on("close", () => {
      clearInterval(intervalId);
    });
  } else {
    res.status(405).end();
  }
}
