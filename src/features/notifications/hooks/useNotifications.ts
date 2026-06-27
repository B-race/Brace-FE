import { useCallback, useEffect, useMemo, useState } from "react";
import { mockNotifications } from "../api/notification.mock";

const READ_NOTIFICATION_IDS_STORAGE_KEY = "brace:read-notification-ids";

const getStoredReadNotificationIds = () => {
  const storedReadNotificationIds = localStorage.getItem(
    READ_NOTIFICATION_IDS_STORAGE_KEY,
  );

  if (!storedReadNotificationIds) {
    return [];
  }

  return JSON.parse(storedReadNotificationIds) as number[];
};

const setStoredReadNotificationIds = (notificationIds: number[]) => {
  localStorage.setItem(
    READ_NOTIFICATION_IDS_STORAGE_KEY,
    JSON.stringify(notificationIds),
  );
};

export const useNotifications = () => {
  const [readNotificationIds, setReadNotificationIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refetch = useCallback(() => {
    setIsLoading(true);

    try {
      const storedReadNotificationIds = getStoredReadNotificationIds();

      setReadNotificationIds(storedReadNotificationIds);
      setErrorMessage("");
    } catch {
      localStorage.removeItem(READ_NOTIFICATION_IDS_STORAGE_KEY);
      setReadNotificationIds([]);
      setErrorMessage(
        "알림 상태를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(refetch, 0);

    return () => {
      window.clearTimeout(loadTimer);
    };
  }, [refetch]);

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

  const markAllAsRead = useCallback(() => {
    setReadNotificationIds((currentReadNotificationIds) => {
      const unreadNotificationIds = mockNotifications
        .map((notification) => notification.id)
        .filter(
          (notificationId) =>
            !currentReadNotificationIds.includes(notificationId),
        );

      if (unreadNotificationIds.length === 0) {
        return currentReadNotificationIds;
      }

      const nextReadNotificationIds = [
        ...currentReadNotificationIds,
        ...unreadNotificationIds,
      ];

      setStoredReadNotificationIds(nextReadNotificationIds);

      return nextReadNotificationIds;
    });
  }, []);

  return {
    notifications,
    totalCount: notifications.length,
    unreadCount,
    isLoading,
    isError: Boolean(errorMessage),
    errorMessage,
    markAsRead,
    markAllAsRead,
    refetch,
  };
};
