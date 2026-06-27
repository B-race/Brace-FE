import { useMemo, useState } from "react";
import {
  getManagedApplicantsByProjectId,
  mockApplicantProjects,
} from "../../features/applicants/api/applicant.mock";
import { ApplicantList } from "../../features/applicants/components/ApplicantList";
import { ApplicantProjectList } from "../../features/applicants/components/ApplicantProjectList";

const initialProjectId = mockApplicantProjects[0]?.id ?? 0;

export const ApplicantManagePage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId);
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null,
  );
  const selectedProject = mockApplicantProjects.find(
    (project) => project.id === selectedProjectId,
  );
  const applicants = useMemo(
    () => getManagedApplicantsByProjectId(selectedProjectId),
    [selectedProjectId],
  );

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setSelectedApplicantId(null);
  };

  return (
    <section className="applicant-manage-page">
      <div className="applicant-manage-hero">
        <h1>지원자 관리</h1>
        <p>제안자가 확인하고 응답할 수 있습니다.</p>
      </div>

      <ApplicantProjectList
        projects={mockApplicantProjects}
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectProject}
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
            onSelectApplicant={setSelectedApplicantId}
          />
        </div>

        <div
          className="applicant-detail-placeholder"
          aria-live="polite"
        >
          <strong>지원자 상세 정보</strong>
          <p>지원자 상세 프로필과 수락/거절 액션은 다음 작업에서 연결됩니다.</p>
        </div>
      </div>
    </section>
  );
};
