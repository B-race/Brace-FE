import type { NotificationItem as NotificationItemType } from "../types/notification";
import { NotificationItem } from "./NotificationItem";

interface NotificationListProps {
  notifications: NotificationItemType[];
  onMarkAsRead: (notificationId: number) => void;
}

export const NotificationList = ({
  notifications,
  onMarkAsRead,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="notification-empty">
        <strong>아직 도착한 알림이 없어요</strong>
        <p>지원 결과나 프로젝트 활동 소식이 생기면 이곳에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <ul className="notification-list">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </ul>
  );
};
