"use client";
import React, { useEffect } from "react";
// import { EventSourcePolyfill } from "event-source-polyfill";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const NotificationComponent = () => {
  // const EventSource = EventSourcePolyfill;

  // const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("token");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const accessToken = parsedData.state.accessToken;

        fetchEventSource(
          "https://dev.dearbirdy.xyz/api/v1/notification/subscribe",
          {
            headers: {
              access: accessToken,
            },
            onmessage(event) {
              console.log(event.data); //"알림도착"
            },
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }, []);
  // console.log(notifications);

  return <div></div>;
};

export default NotificationComponent;
