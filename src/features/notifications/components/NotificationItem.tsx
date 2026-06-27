import { Link } from "react-router-dom";
import type { NotificationItem as NotificationItemType } from "../types/notification";
import { NotificationTypeBadge } from "./NotificationTypeBadge";

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead: (notificationId: number) => void;
}

const formatNotificationDate = (createdAt: string) =>
  new Intl.DateTimeFormat("ko-KR", {
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
      <NotificationTypeBadge type={notification.type} />

      <div className="notification-item-main">
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
          <p>
            {notification.projectTitle && (
              <span className="notification-project">
                “{notification.projectTitle}”
              </span>
            )}
            {notification.message}
          </p>
          <Link
            className="notification-action"
            to={notification.link.href}
            onClick={() => {
              if (isUnread) {
                onMarkAsRead(notification.id);
              }
            }}
          >
            {notification.link.label}
          </Link>
        </div>
      </div>

      <div className="notification-side">
        <time dateTime={notification.createdAt}>
          {formatNotificationDate(notification.createdAt)}
        </time>
        <span
          className={
            isUnread ? "notification-status unread" : "notification-status"
          }
        >
          {isUnread ? "읽지 않음" : "읽음"}
        </span>
        {isUnread ? (
          <button
            className="notification-read-button"
            type="button"
            onClick={() => onMarkAsRead(notification.id)}
          >
            읽음 처리
          </button>
        ) : null}
      </div>
    </li>
  );
};
