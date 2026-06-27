interface ApplicantStatePanelProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const ApplicantStatePanel = ({
  title,
  description,
  actionLabel,
  onAction,
}: ApplicantStatePanelProps) => (
  <div className="applicant-state-panel">
    <strong>{title}</strong>
    <p>{description}</p>
    {actionLabel && onAction && (
      <button
        className="applicant-state-button"
        type="button"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    )}
  </div>
);
