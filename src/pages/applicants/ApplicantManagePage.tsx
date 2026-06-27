import { ApplicantDetailPanel } from "../../features/applicants/components/ApplicantDetailPanel";
import { ApplicantList } from "../../features/applicants/components/ApplicantList";
import { ApplicantProjectList } from "../../features/applicants/components/ApplicantProjectList";
import { ApplicantSkeletonPanel } from "../../features/applicants/components/ApplicantSkeletonPanel";
import { ApplicantStatePanel } from "../../features/applicants/components/ApplicantStatePanel";
import { useApplicantManagement } from "../../features/applicants/hooks/useApplicantManagement";

export const ApplicantManagePage = () => {
  const {
    projects,
    applicants,
    selectedProject,
    selectedProjectId,
    selectedApplicant,
    selectedApplicantId,
    isLoading,
    isError,
    errorMessage,
    selectProject,
    selectApplicant,
    reviewApplicant,
    refetch,
  } = useApplicantManagement();
  const hasProjects = projects.length > 0;

  return (
    <section className="applicant-manage-page">
      <div className="applicant-manage-hero">
        <h1>지원자 관리</h1>
        <p>제안자가 확인하고 응답할 수 있습니다.</p>
      </div>

      {isLoading && <ApplicantSkeletonPanel />}

      {isError && (
        <ApplicantStatePanel
          title="지원자 정보를 불러오지 못했어요"
          description={errorMessage}
          actionLabel="다시 시도"
          onAction={refetch}
        />
      )}

      {!isLoading && !isError && !hasProjects && (
        <ApplicantStatePanel
          title="관리할 프로젝트가 없어요"
          description="프로젝트를 등록하면 지원자 목록과 검토 상태가 이곳에 표시됩니다."
        />
      )}

      {!isLoading && !isError && hasProjects && (
        <>
          <ApplicantProjectList
            projects={projects}
            selectedProjectId={selectedProjectId ?? 0}
            onSelectProject={selectProject}
          />

          <div className="applicant-management-section">
            <div className="applicant-list-panel">
              <div className="applicant-section-heading">
                <p>지원자 목록</p>
                <h2>{selectedProject?.title ?? "프로젝트"} 지원자</h2>
                <span>
                  프로필, 역할, 기술태그, 메시지 프리뷰를 확인할 수 있습니다.
                </span>
              </div>
              <ApplicantList
                applicants={applicants}
                selectedApplicantId={selectedApplicantId}
                onSelectApplicant={selectApplicant}
              />
            </div>

            <ApplicantDetailPanel
              applicant={selectedApplicant}
              onReview={reviewApplicant}
            />
          </div>
        </>
      )}
    </section>
  );
};
