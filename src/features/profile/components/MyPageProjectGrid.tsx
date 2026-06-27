import type { MyPageProjectCardItem } from "../types/mypageProject";
import { MyPageProjectCard } from "./MyPageProjectCard";

interface MyPageProjectGridProps {
  items: MyPageProjectCardItem[];
}

const placeholderItems = Array.from({ length: 2 }, (_, index) => index);

export const MyPageProjectGrid = ({ items }: MyPageProjectGridProps) => (
  <div className="mypage-project-grid">
    {items.map((project) => (
      <MyPageProjectCard
        key={project.projectId}
        project={project}
      />
    ))}
    {placeholderItems.map((item) => (
      <div
        className="mypage-project-card placeholder"
        key={item}
        aria-hidden="true"
      >
        <div className="mypage-project-thumbnail">
          <span>빈 카드 플레이스홀더</span>
        </div>
        <div className="mypage-project-card-body" />
      </div>
    ))}
  </div>
);
