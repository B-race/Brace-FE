import { NotificationList } from "../../features/notifications/components/NotificationList";
import { NotificationSkeletonList } from "../../features/notifications/components/NotificationSkeletonList";
import { NotificationStatePanel } from "../../features/notifications/components/NotificationStatePanel";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";

export const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    totalCount,
    isLoading,
    isError,
    errorMessage,
    markAsRead,
    markAllAsRead,
    refetch,
  } = useNotifications();
  const hasUnreadNotifications = unreadCount > 0;

  return (
    <section className="notifications-page">
      <div className="notifications-header">
        <h1>알림</h1>
        <p>알림을 확인하세요.</p>
        <button
          className="notifications-read-all-button"
          type="button"
          disabled={!hasUnreadNotifications || isLoading || isError}
          onClick={markAllAsRead}
        >
          모두 읽음
        </button>
      </div>

      <div className="notifications-list-section">
        <p
          className="notifications-count"
          aria-live="polite"
        >
          전체 {totalCount}개 중 읽지 않은 알림 {unreadCount}개
        </p>

        {isLoading && <NotificationSkeletonList />}

        {isError && (
          <NotificationStatePanel
            title="알림을 불러오지 못했어요"
            description={errorMessage}
            actionLabel="다시 시도"
            onAction={refetch}
          />
        )}

        {!isLoading && !isError && (
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
          />
        )}
      </div>
    </section>
  );
};
