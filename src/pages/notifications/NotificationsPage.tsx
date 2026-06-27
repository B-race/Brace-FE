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
            disabled={!hasUnreadNotifications || isLoading || isError}
            onClick={markAllAsRead}
          >
            전체 읽음
          </button>
        </div>
      </div>

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
    </section>
  );
};
