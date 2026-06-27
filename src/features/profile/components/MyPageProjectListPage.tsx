import type { ReactNode } from "react";
import { MyPageLayout } from "./MyPageLayout";
import { MyPageProjectGrid } from "./MyPageProjectGrid";
import type { MyPageProjectCardItem } from "../types/mypageProject";

interface MyPageProjectListPageProps {
  title: string;
  description: string;
  items: MyPageProjectCardItem[];
  action?: ReactNode;
}

export const MyPageProjectListPage = ({
  title,
  description,
  items,
  action,
}: MyPageProjectListPageProps) => (
  <MyPageLayout>
    <section className="mypage-list-page">
      <div className="mypage-list-header">
        <h1>{title}</h1>
        <p>{description}</p>
        {action}
      </div>
      <MyPageProjectGrid items={items} />
    </section>
  </MyPageLayout>
);
