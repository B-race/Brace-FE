import type { ManagedApplicant } from "../types/applicant";
import { ApplicantListItem } from "./ApplicantListItem";

interface ApplicantListProps {
  applicants: ManagedApplicant[];
  selectedApplicantId: number | null;
  onSelectApplicant: (applicantId: number) => void;
}

export const ApplicantList = ({
  applicants,
  selectedApplicantId,
  onSelectApplicant,
}: ApplicantListProps) => {
  if (applicants.length === 0) {
    return (
      <div className="applicant-empty">
        <strong>아직 지원자가 없어요</strong>
        <p>
          새 지원자가 도착하면 이곳에서 프로필과 메시지를 확인할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <ul className="applicant-list">
      {applicants.map((applicant) => (
        <ApplicantListItem
          key={applicant.id}
          applicant={applicant}
          isSelected={applicant.id === selectedApplicantId}
          onSelect={onSelectApplicant}
        />
      ))}
    </ul>
  );
};
