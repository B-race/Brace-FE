import type {
  ApplicantReviewStatus,
  ManagedApplicant,
} from "../types/applicant";

const statusLabel: Record<ApplicantReviewStatus, string> = {
  pending: "검토중",
  accepted: "수락됨",
  rejected: "거절됨",
};

const formatAppliedAt = (appliedAt: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(appliedAt));

interface ApplicantDetailPanelProps {
  applicant: ManagedApplicant | null;
}

export const ApplicantDetailPanel = ({
  applicant,
}: ApplicantDetailPanelProps) => {
  if (!applicant) {
    return (
      <div
        className="applicant-detail-empty"
        aria-live="polite"
      >
        <strong>지원자를 선택해주세요</strong>
        <p>
          목록에서 지원자를 선택하면 상세 프로필과 지원 메시지가 표시됩니다.
        </p>
      </div>
    );
  }

  const { profile, status, message, appliedAt } = applicant;

  return (
    <article
      className="applicant-detail-panel"
      aria-live="polite"
    >
      <div className="applicant-detail-header">
        <span
          className="applicant-detail-avatar"
          aria-hidden="true"
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt=""
            />
          ) : null}
        </span>
        <div>
          <div className="applicant-detail-title-row">
            <h2>{profile.name}</h2>
            <span className={`applicant-status ${status}`}>
              {statusLabel[status]}
            </span>
          </div>
          <p>{profile.bio}</p>
          <span>지원일 {formatAppliedAt(appliedAt)}</span>
        </div>
      </div>

      <dl className="applicant-detail-list">
        <div>
          <dt>이름</dt>
          <dd>{profile.name}</dd>
        </div>
        <div>
          <dt>역할</dt>
          <dd>{profile.role}</dd>
        </div>
        <div>
          <dt>기술태그</dt>
          <dd>
            <span className="applicant-detail-skills">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </span>
          </dd>
        </div>
        <div>
          <dt>지원 메시지</dt>
          <dd>{message}</dd>
        </div>
        <div>
          <dt>포트폴리오</dt>
          <dd>
            {profile.portfolioUrl ? (
              <a
                className="applicant-portfolio-link"
                href={profile.portfolioUrl}
                target="_blank"
                rel="noreferrer"
              >
                포트폴리오 보기
              </a>
            ) : (
              <span className="applicant-muted-text">등록된 링크가 없어요</span>
            )}
          </dd>
        </div>
      </dl>

      <div className="applicant-detail-action-placeholder">
        수락/거절 액션은 다음 작업에서 연결됩니다.
      </div>
    </article>
  );
};
