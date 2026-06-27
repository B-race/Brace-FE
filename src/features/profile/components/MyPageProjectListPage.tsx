import type { ReactNode } from "react";
import { MyPageLayout } from "./MyPageLayout";
import { MyPageProjectGrid } from "./MyPageProjectGrid";
import { MyPageProjectSkeletonGrid } from "./MyPageProjectSkeletonGrid";
import { MyPageStatePanel } from "./MyPageStatePanel";
import type { MyPageProjectCardItem } from "../types/mypageProject";

interface MyPageProjectListPageProps {
  title: string;
  description: string;
  items: MyPageProjectCardItem[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  onRetry?: () => void;
  action?: ReactNode;
}

export const MyPageProjectListPage = ({
  title,
  description,
  items,
  isLoading = false,
  isError = false,
  errorMessage = "",
  emptyTitle = "표시할 프로젝트가 없어요",
  emptyDescription = "프로젝트 활동이 생기면 이곳에 표시됩니다.",
  onRetry,
  action,
}: MyPageProjectListPageProps) => (
  <MyPageLayout>
    <section className="mypage-list-page">
      <div className="mypage-list-header">
        <h1>{title}</h1>
        <p>{description}</p>
        {action}
      </div>
      {isLoading && <MyPageProjectSkeletonGrid />}
      {isError && (
        <MyPageStatePanel
          title="프로젝트 목록을 불러오지 못했어요"
          description={errorMessage}
          actionLabel="다시 시도"
          onAction={onRetry}
        />
      )}
      {!isLoading && !isError && items.length === 0 && (
        <MyPageStatePanel
          title={emptyTitle}
          description={emptyDescription}
        />
      )}
      {!isLoading && !isError && items.length > 0 && (
        <MyPageProjectGrid items={items} />
      )}
    </section>
  </MyPageLayout>
);
