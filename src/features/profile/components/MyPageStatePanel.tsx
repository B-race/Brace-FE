interface MyPageStatePanelProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const MyPageStatePanel = ({
  title,
  description,
  actionLabel,
  onAction,
}: MyPageStatePanelProps) => (
  <div className="mypage-state-panel">
    <strong>{title}</strong>
    <p>{description}</p>
    {actionLabel && onAction && (
      <button
        className="mypage-state-button"
        type="button"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    )}
  </div>
);
