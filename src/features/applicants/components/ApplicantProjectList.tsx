import type { ApplicantProject } from "../types/applicant";
import { ApplicantProjectCard } from "./ApplicantProjectCard";

interface ApplicantProjectListProps {
  projects: ApplicantProject[];
  selectedProjectId: number;
  onSelectProject: (projectId: number) => void;
}

export const ApplicantProjectList = ({
  projects,
  selectedProjectId,
  onSelectProject,
}: ApplicantProjectListProps) => (
  <div className="applicant-project-section">
    <div className="applicant-section-heading">
      <p>프로젝트 선택</p>
      <h2>관리할 프로젝트를 선택하세요</h2>
    </div>
    <div className="applicant-project-grid">
      {projects.map((project) => (
        <ApplicantProjectCard
          key={project.id}
          project={project}
          isSelected={project.id === selectedProjectId}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  </div>
);
