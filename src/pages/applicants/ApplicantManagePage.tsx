import { useMemo, useState } from "react";
import {
  getManagedApplicantsByProjectId,
  mockManagedApplicants,
  mockApplicantProjects,
} from "../../features/applicants/api/applicant.mock";
import { ApplicantDetailPanel } from "../../features/applicants/components/ApplicantDetailPanel";
import { ApplicantList } from "../../features/applicants/components/ApplicantList";
import { ApplicantProjectList } from "../../features/applicants/components/ApplicantProjectList";
import type { ApplicantReviewStatus } from "../../features/applicants/types/applicant";

const initialProjectId = mockApplicantProjects[0]?.id ?? 0;
const initialApplicantId =
  getManagedApplicantsByProjectId(initialProjectId)[0]?.id ?? null;

export const ApplicantManagePage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId);
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    initialApplicantId,
  );
  const [managedApplicants, setManagedApplicants] = useState(
    mockManagedApplicants,
  );
  const selectedProject = mockApplicantProjects.find(
    (project) => project.id === selectedProjectId,
  );
  const applicants = useMemo(
    () =>
      managedApplicants.filter(
        (applicant) => applicant.projectId === selectedProjectId,
      ),
    [managedApplicants, selectedProjectId],
  );
  const selectedApplicant = useMemo(
    () =>
      applicants.find((applicant) => applicant.id === selectedApplicantId) ??
      null,
    [applicants, selectedApplicantId],
  );

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setSelectedApplicantId(
      getManagedApplicantsByProjectId(projectId)[0]?.id ?? null,
    );
  };

  const handleReviewApplicant = (
    applicantId: number,
    status: ApplicantReviewStatus,
  ) => {
    setManagedApplicants((currentApplicants) =>
      currentApplicants.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status } : applicant,
      ),
    );
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

        <ApplicantDetailPanel
          applicant={selectedApplicant}
          onReview={handleReviewApplicant}
        />
      </div>
    </section>
  );
};
