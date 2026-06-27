import type {
  ApplicantReviewStatus,
  ManagedApplicant,
} from "../types/applicant";

const statusLabel: Record<ApplicantReviewStatus, string> = {
  pending: "검토중",
  accepted: "수락됨",
  rejected: "거절됨",
};

interface ApplicantListItemProps {
  applicant: ManagedApplicant;
  isSelected: boolean;
  onSelect: (applicantId: number) => void;
}

export const ApplicantListItem = ({
  applicant,
  isSelected,
  onSelect,
}: ApplicantListItemProps) => {
  const { profile, status, message } = applicant;
  const messagePreview =
    message.length > 76 ? `${message.slice(0, 76)}...` : message;

  return (
    <li>
      <button
        className={`applicant-list-item ${status}${isSelected ? "selected" : ""}`}
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelect(applicant.id)}
      >
        <span
          className="applicant-avatar"
          aria-hidden="true"
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt=""
            />
          ) : null}
        </span>
        <span className="applicant-list-content">
          <span className="applicant-list-top">
            <strong>{profile.name}</strong>
            <span className={`applicant-status ${status}`}>
              {statusLabel[status]}
            </span>
          </span>
          <span className="applicant-role">{profile.role}</span>
          <span className="applicant-message-preview">{messagePreview}</span>
          <span className="applicant-skill-list">
            {profile.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </span>
        </span>
      </button>
    </li>
  );
};
