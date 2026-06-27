import type { MyPageProjectCardItem } from "../types/mypageProject";
import { MyPageProjectCard } from "./MyPageProjectCard";

interface MyPageProjectGridProps {
  items: MyPageProjectCardItem[];
}

export const MyPageProjectGrid = ({ items }: MyPageProjectGridProps) => (
  <div className="mypage-project-grid">
    {items.map((project) => (
      <MyPageProjectCard
        key={project.projectId}
        project={project}
      />
    ))}
  </div>
);
