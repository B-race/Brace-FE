import { MyPageProjectListPage } from "../../features/profile/components/MyPageProjectListPage";
import { useMyPageProjects } from "../../features/profile/hooks/useMyPageProjects";

export const BookmarksPage = () => {
  const { items, isLoading, isError, errorMessage, refetch } =
    useMyPageProjects({
      listType: "bookmarks",
    });

  return (
    <MyPageProjectListPage
      title="북마크"
      description="내가 찜한 프로젝트를 확인할 수 있습니다."
      items={items}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      emptyTitle="아직 북마크한 프로젝트가 없어요"
      emptyDescription="관심 있는 프로젝트를 북마크하면 이곳에 모아볼 수 있습니다."
      onRetry={refetch}
    />
  );
};
