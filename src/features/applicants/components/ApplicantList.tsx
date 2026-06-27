import { useEffect, useRef } from "react";
import type { ManagedApplicant } from "../types/applicant";
import { ApplicantListItem } from "./ApplicantListItem";

interface ApplicantListProps {
  applicants: ManagedApplicant[];
  selectedApplicantId: number | null;
  hasMoreApplicants: boolean;
  isLoadingMore: boolean;
  onSelectApplicant: (applicantId: number) => void;
  onLoadMore: () => void;
}

export const ApplicantList = ({
  applicants,
  selectedApplicantId,
  hasMoreApplicants,
  isLoadingMore,
  onSelectApplicant,
  onLoadMore,
}: ApplicantListProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !hasMoreApplicants) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "160px" },
    );

    observer.observe(loadMoreElement);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreApplicants, onLoadMore]);

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
    <>
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
      <div
        className="applicant-load-more"
        ref={loadMoreRef}
        aria-live="polite"
      >
        {isLoadingMore && <span>지원자를 더 불러오는 중입니다.</span>}
        {!isLoadingMore && !hasMoreApplicants && (
          <span>모든 지원자를 확인했어요.</span>
        )}
      </div>
    </>
  );
};
