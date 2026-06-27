interface NotificationStatePanelProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const NotificationStatePanel = ({
  title,
  description,
  actionLabel,
  onAction,
}: NotificationStatePanelProps) => (
  <div className="notification-state-panel">
    <strong>{title}</strong>
    <p>{description}</p>
    {actionLabel && onAction && (
      <button
        className="notifications-read-all-button"
        type="button"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    )}
  </div>
);
