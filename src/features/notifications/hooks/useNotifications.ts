import { useCallback, useMemo, useState } from "react";
import { mockNotifications } from "../api/notification.mock";

const READ_NOTIFICATION_IDS_STORAGE_KEY = "brace:read-notification-ids";

const getStoredReadNotificationIds = () => {
  try {
    const storedReadNotificationIds = localStorage.getItem(
      READ_NOTIFICATION_IDS_STORAGE_KEY,
    );

    if (!storedReadNotificationIds) {
      return [];
    }

    return JSON.parse(storedReadNotificationIds) as number[];
  } catch {
    return [];
  }
};

const setStoredReadNotificationIds = (notificationIds: number[]) => {
  localStorage.setItem(
    READ_NOTIFICATION_IDS_STORAGE_KEY,
    JSON.stringify(notificationIds),
  );
};

export const useNotifications = () => {
  const [readNotificationIds, setReadNotificationIds] = useState<number[]>(
    getStoredReadNotificationIds,
  );

  const notificationItems = useMemo(
    () =>
      mockNotifications.map((notification) =>
        readNotificationIds.includes(notification.id)
          ? { ...notification, status: "read" as const }
          : notification,
      ),
    [readNotificationIds],
  );

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
    setReadNotificationIds((currentReadNotificationIds) => {
      if (currentReadNotificationIds.includes(notificationId)) {
        return currentReadNotificationIds;
      }

      const nextReadNotificationIds = [
        ...currentReadNotificationIds,
        notificationId,
      ];

      setStoredReadNotificationIds(nextReadNotificationIds);

      return nextReadNotificationIds;
    });
  }, []);

  return {
    notifications,
    totalCount: notifications.length,
    unreadCount,
    markAsRead,
  };
};
