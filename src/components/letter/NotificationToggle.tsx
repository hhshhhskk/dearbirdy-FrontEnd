"use client";

import { useLetterStore } from "@/store/useLetterStore";
import ToggleSwitch from "../ui/ToggleSwitch";

export default function NotificationToggle() {
  const { isNotificationOn, toggleNotification } = useLetterStore();

  return (
    <ToggleSwitch isActive={isNotificationOn} onChange={toggleNotification} />
  );
}
