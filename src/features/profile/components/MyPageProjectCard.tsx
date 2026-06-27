import { Link } from "react-router-dom";
import { createProjectDetailPath } from "../../../shared/constants/routes";
import type { MyPageProjectCardItem } from "../types/mypageProject";

interface MyPageProjectCardProps {
  project: MyPageProjectCardItem;
}

const STATUS_LABEL: Record<string, string> = {
  RECRUITING: "모집중",
  COMPLETED: "완료",
  CLOSED: "마감",
  PROGRESS: "검토중",
  PASS: "수락됨",
  FAIL: "거절됨",
  CANCEL: "취소됨",
};

const ACTIVITY_LABEL: Record<string, string> = {
  CONTEST: "공모전",
  PERSONAL_PROJECT: "개인 프로젝트",
};

export const MyPageProjectCard = ({ project }: MyPageProjectCardProps) => {
  const statusLabel = STATUS_LABEL[project.status] ?? project.status;
  const activityLabel =
    ACTIVITY_LABEL[project.activityType] ?? project.activityType;
  const id = project.projectId;

  return (
    <Link
      className={`mypage-project-card ${project.status}`}
      to={createProjectDetailPath(id)}
    >
      <div className="mypage-project-thumbnail">
        <span className={`mypage-project-status ${project.status}`}>
          {statusLabel}
        </span>
        <span>{activityLabel}</span>
      </div>
      <div className="mypage-project-card-body">
        <strong>{project.title}</strong>
        <p>역할: {project.roleName ?? project.writerName}</p>
      </div>
    </Link>
  );
};
