import { mockMyApplications } from "../../features/profile/api/mypageProject.mock";
import { MyPageProjectListPage } from "../../features/profile/components/MyPageProjectListPage";

export const MyApplicationsPage = () => (
  <MyPageProjectListPage
    title="지원 현황 목록"
    description="내가 지원한 프로젝트들을 확인할 수 있습니다."
    items={mockMyApplications}
  />
);
