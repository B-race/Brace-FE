import { Link } from "react-router-dom";
import { MyPageProjectListPage } from "../../features/profile/components/MyPageProjectListPage";
import { useMyPageProjects } from "../../features/profile/hooks/useMyPageProjects";
import {
  ROUTES,
  createProjectApplicantsPath,
} from "../../shared/constants/routes";

export const MyProjectsPage = () => {
  const { items, isLoading, isError, errorMessage, refetch } =
    useMyPageProjects({
      listType: "myProjects",
    });

  return (
    <MyPageProjectListPage
      title="내 프로젝트"
      description="내가 등록한 프로젝트와 모집 상태를 확인할 수 있습니다."
      items={items}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      emptyTitle="아직 등록한 프로젝트가 없어요"
      emptyDescription="모집할 프로젝트를 등록하면 이곳에서 관리할 수 있습니다."
      onRetry={refetch}
      action={
        <div className="mypage-list-actions">
          <Link
            className="mypage-list-action"
            to={ROUTES.PROJECT_REGISTER}
          >
            모집하기
          </Link>
          <Link
            className="mypage-list-action mypage-list-action--secondary"
            to={createProjectApplicantsPath(101)}
          >
            지원자 관리
          </Link>
        </div>
      }
    />
  );
};
