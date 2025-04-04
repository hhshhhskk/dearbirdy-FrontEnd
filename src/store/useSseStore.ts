import { fetchEventSource } from "@microsoft/fetch-event-source";
import { create } from "zustand";

interface SSEState {
  data: boolean; // SSE에서 받아온 데이터
  isConnected: boolean; // SSE 연결 상태
  connect: () => void;
  disconnect: () => void;
  messageCheck: () => void;
}

export const useSseStore = create<SSEState>((set) => {
  let eventSource: EventSource | null = null;

  return {
    data: false,
    isConnected: false,

    //  SSE 연결\

    connect: async () => {
      set({ isConnected: true });

      try {
        const token = await sessionStorage.getItem("token");
        if (token) {
          const parsedData = JSON.parse(token);
          const accessToken = parsedData.state.accessToken;

          await fetchEventSource(
            `${process.env.NEXT_PUBLIC_API_URL}/notification/subscribe`,
            {
              headers: {
                access: accessToken,
              },
              onmessage(event) {
                console.log("📩 받은 데이터:", event.data);
                if (event.data === "알림도착") {
                  useSseStore.setState({ data: true }); // Zustand 상태 변경
                }
              },
              onerror(err) {
                console.error("❌ SSE 오류 발생:", err);
                set({ isConnected: false });
              },
            }
          );
        }
      } catch (err) {
        console.error("❌ SSE 연결 실패:", err);
        set({ isConnected: false });
      }
    },

    messageCheck: () => {
      set({ data: false });
    },

    // SSE 연결 해제
    disconnect: () => {
      if (eventSource) {
        eventSource.close();
        console.log("🔌 SSE 연결 종료");
        set({ isConnected: false, data: false });
        eventSource = null;
      }
    },
  };
});
