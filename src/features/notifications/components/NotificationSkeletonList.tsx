const skeletonItems = Array.from({ length: 3 }, (_, index) => index);

export const NotificationSkeletonList = () => (
  <ul
    className="notification-list"
    aria-label="알림 목록을 불러오는 중"
  >
    {skeletonItems.map((item) => (
      <li
        className="notification-skeleton-item"
        key={item}
      >
        <div className="notification-skeleton-main">
          <span className="notification-skeleton-badge" />
          <span className="notification-skeleton-title" />
          <span className="notification-skeleton-line" />
          <span className="notification-skeleton-line short" />
        </div>
        <span className="notification-skeleton-button" />
      </li>
    ))}
  </ul>
);
