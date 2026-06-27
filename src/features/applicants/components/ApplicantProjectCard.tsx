import defaultProjectImage from "../../../assets/images/brace-logo.png";
import type { ApplicantProject } from "../types/applicant";

interface ApplicantProjectCardProps {
  project: ApplicantProject;
  isSelected: boolean;
  onSelect: (projectId: number) => void;
}

export const ApplicantProjectCard = ({
  project,
  isSelected,
  onSelect,
}: ApplicantProjectCardProps) => (
  <button
    className={`applicant-project-card${isSelected ? "selected" : ""}`}
    type="button"
    aria-pressed={isSelected}
    onClick={() => onSelect(project.id)}
  >
    <div className="applicant-project-thumbnail">
      <span className="applicant-project-deadline">
        {project.deadlineLabel}
      </span>
      <img
        className={project.thumbnailUrl ? "" : "default"}
        src={project.thumbnailUrl ?? defaultProjectImage}
        alt=""
      />
    </div>
    <div className="applicant-project-card-body">
      <span className="applicant-project-title">{project.title}</span>
      <strong>{project.recruitingStatus}</strong>
      <span className="applicant-project-count">
        지원자 {project.applicantCount}명
      </span>
    </div>
  </button>
);
