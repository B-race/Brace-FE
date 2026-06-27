import { useState } from "react";
import { mockApplicantProjects } from "../../features/applicants/api/applicant.mock";
import { ApplicantProjectList } from "../../features/applicants/components/ApplicantProjectList";

const initialProjectId = mockApplicantProjects[0]?.id ?? 0;

export const ApplicantManagePage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId);
  const selectedProject = mockApplicantProjects.find(
    (project) => project.id === selectedProjectId,
  );

  return (
    <section className="applicant-manage-page">
      <div className="applicant-manage-hero">
        <h1>지원자 관리</h1>
        <p>제안자가 확인하고 응답할 수 있습니다.</p>
      </div>

      <ApplicantProjectList
        projects={mockApplicantProjects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
      />

      <div
        className="applicant-next-section"
        aria-live="polite"
      >
        <strong>{selectedProject?.title ?? "프로젝트"} 지원자 목록</strong>
        <p>지원자 목록과 상세 정보는 다음 작업에서 연결됩니다.</p>
      </div>
    </section>
  );
};
