import { mockNotifications } from "../api/notification.mock";

export const useNotifications = () => {
  const notifications = [...mockNotifications].sort(
    (firstNotification, secondNotification) =>
      new Date(secondNotification.createdAt).getTime() -
      new Date(firstNotification.createdAt).getTime(),
  );

  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread",
  ).length;

  return {
    notifications,
    totalCount: notifications.length,
    unreadCount,
  };
};
