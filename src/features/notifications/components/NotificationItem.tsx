import type { NotificationItem as NotificationItemType } from "../types/notification";
import { NotificationTypeBadge } from "./NotificationTypeBadge";

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead: (notificationId: number) => void;
}

const formatNotificationDate = (createdAt: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(createdAt));

export const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  const isUnread = notification.status === "unread";

  return (
    <li className={isUnread ? "notification-item unread" : "notification-item"}>
      <div className="notification-item-main">
        <div className="notification-item-top">
          <NotificationTypeBadge type={notification.type} />
          <time dateTime={notification.createdAt}>
            {formatNotificationDate(notification.createdAt)}
          </time>
        </div>

        <div className="notification-item-content">
          <div className="notification-title-row">
            {isUnread && (
              <span
                className="notification-unread-dot"
                aria-hidden="true"
              />
            )}
            <h2>{notification.title}</h2>
          </div>
          <p>{notification.message}</p>
        </div>

        {notification.projectTitle && (
          <p className="notification-project">{notification.projectTitle}</p>
        )}
      </div>

      <div className="notification-side">
        <span
          className={
            isUnread ? "notification-status unread" : "notification-status"
          }
        >
          {isUnread ? "읽지 않음" : "읽음"}
        </span>
        {isUnread ? (
          <button
            className="notification-action"
            type="button"
            onClick={() => onMarkAsRead(notification.id)}
          >
            읽음 처리
          </button>
        ) : (
          <span className="notification-action disabled">
            {notification.link.label}
          </span>
        )}
      </div>
    </li>
  );
};
