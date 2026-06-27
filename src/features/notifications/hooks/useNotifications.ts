import { useCallback, useMemo, useState } from "react";
import { mockNotifications } from "../api/notification.mock";

export const useNotifications = () => {
  const [notificationItems, setNotificationItems] = useState(mockNotifications);

  const notifications = useMemo(
    () =>
      [...notificationItems].sort(
        (firstNotification, secondNotification) =>
          new Date(secondNotification.createdAt).getTime() -
          new Date(firstNotification.createdAt).getTime(),
      ),
    [notificationItems],
  );

  const unreadCount = useMemo(
    () =>
      notifications.filter((notification) => notification.status === "unread")
        .length,
    [notifications],
  );

  const markAsRead = useCallback((notificationId: number) => {
    setNotificationItems((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, status: "read" }
          : notification,
      ),
    );
  }, []);

  return {
    notifications,
    totalCount: notifications.length,
    unreadCount,
    markAsRead,
  };
};
