import { mockBookmarkedProjects } from "../../features/profile/api/mypageProject.mock";
import { MyPageProjectListPage } from "../../features/profile/components/MyPageProjectListPage";

export const BookmarksPage = () => (
  <MyPageProjectListPage
    title="북마크"
    description="내가 찜한 프로젝트를 확인할 수 있습니다."
    items={mockBookmarkedProjects}
  />
);
