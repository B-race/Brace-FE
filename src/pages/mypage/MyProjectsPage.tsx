import { Link } from "react-router-dom";
import { mockMyProjects } from "../../features/profile/api/mypageProject.mock";
import { MyPageProjectListPage } from "../../features/profile/components/MyPageProjectListPage";
import { ROUTES } from "../../shared/constants/routes";

export const MyProjectsPage = () => (
  <MyPageProjectListPage
    title="내 프로젝트"
    description="내가 등록한 프로젝트와 모집 상태를 확인할 수 있습니다."
    items={mockMyProjects}
    action={
      <Link
        className="mypage-list-action"
        to={ROUTES.PROJECT_REGISTER}
      >
        모집하기
      </Link>
    }
  />
);
