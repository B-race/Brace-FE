import { MyPageProjectListPage } from "../../features/profile/components/MyPageProjectListPage";
import { useMyPageProjects } from "../../features/profile/hooks/useMyPageProjects";

export const MyApplicationsPage = () => {
  const { items, isLoading, isError, errorMessage, refetch } =
    useMyPageProjects({
      listType: "applications",
    });

  return (
    <MyPageProjectListPage
      title="지원 현황 목록"
      description="내가 지원한 프로젝트들을 확인할 수 있습니다."
      items={items}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      emptyTitle="아직 지원한 프로젝트가 없어요"
      emptyDescription="관심 있는 프로젝트에 지원하면 이곳에서 상태를 확인할 수 있습니다."
      onRetry={refetch}
    />
  );
};
