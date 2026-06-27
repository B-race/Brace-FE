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
  onReview: (applicantId: number, status: ApplicantReviewStatus) => void;
}

export const ApplicantDetailPanel = ({
  applicant,
  onReview,
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
  const isPending = status === "pending";

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

      <div className="applicant-review-actions">
        <div>
          <strong>
            {isPending
              ? "지원자를 검토하고 응답해주세요"
              : `이미 ${statusLabel[status]} 처리된 지원자입니다`}
          </strong>
          <p>
            {isPending
              ? "수락하면 팀 합류 대상자로, 거절하면 미선정 지원자로 표시됩니다."
              : "처리 결과는 지원자 목록과 상세 상태에 함께 반영됩니다."}
          </p>
        </div>
        <div className="applicant-review-button-group">
          <button
            className="applicant-review-button accept"
            type="button"
            disabled={!isPending}
            onClick={() => onReview(applicant.id, "accepted")}
          >
            수락
          </button>
          <button
            className="applicant-review-button reject"
            type="button"
            disabled={!isPending}
            onClick={() => onReview(applicant.id, "rejected")}
          >
            거절
          </button>
        </div>
      </div>
    </article>
  );
};
