import { useMemo } from "react";
import { mockNotifications } from "../api/notification.mock";

export const useNotifications = () => {
  const notifications = useMemo(
    () =>
      [...mockNotifications].sort(
        (firstNotification, secondNotification) =>
          new Date(secondNotification.createdAt).getTime() -
          new Date(firstNotification.createdAt).getTime(),
      ),
    [],
  );

  const unreadCount = useMemo(
    () =>
      notifications.filter((notification) => notification.status === "unread")
        .length,
    [notifications],
  );

  return {
    notifications,
    totalCount: notifications.length,
    unreadCount,
  };
};
