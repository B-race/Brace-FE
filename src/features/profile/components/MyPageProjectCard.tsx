import { Link } from "react-router-dom";
import { createProjectDetailPath } from "../../../shared/constants/routes";
import type { MyPageProjectCardItem } from "../types/mypageProject";

interface MyPageProjectCardProps {
  project: MyPageProjectCardItem;
}

export const MyPageProjectCard = ({ project }: MyPageProjectCardProps) => (
  <article className={`mypage-project-card ${project.status}`}>
    <Link
      className="mypage-project-card-main"
      to={createProjectDetailPath(project.id)}
    >
      <div className="mypage-project-thumbnail">
        <span className={`mypage-project-status ${project.status}`}>
          {project.statusLabel}
        </span>
        <span>{project.thumbnailLabel}</span>
      </div>
      <div className="mypage-project-card-body">
        <strong>{project.title}</strong>
        <p>역할: {project.role}</p>
      </div>
    </Link>
  </article>
);
