import { NotificationList } from "../../features/notifications/components/NotificationList";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";

export const NotificationsPage = () => {
  const { notifications, unreadCount, totalCount, markAsRead, markAllAsRead } =
    useNotifications();
  const hasUnreadNotifications = unreadCount > 0;

  return (
    <section className="notifications-page">
      <div className="notifications-header">
        <div>
          <p className="notifications-kicker">알림</p>
          <h1>내 활동 알림</h1>
          <p>
            지원자 도착, 지원 결과, 프로젝트 등록과 모집 완료 소식을 확인하세요.
          </p>
        </div>
        <div className="notifications-summary">
          <span>전체 {totalCount}</span>
          <strong>읽지 않음 {unreadCount}</strong>
          <button
            className="notifications-read-all-button"
            type="button"
            disabled={!hasUnreadNotifications}
            onClick={markAllAsRead}
          >
            전체 읽음
          </button>
        </div>
      </div>

      <NotificationList
        notifications={notifications}
        onMarkAsRead={markAsRead}
      />
    </section>
  );
};
