import { mockMyProfile } from "../../features/profile/api/profile.mock";
import { MyPageLayout } from "../../features/profile/components/MyPageLayout";
import { ProfileDashboard } from "../../features/profile/components/ProfileDashboard";

export const MyPage = () => (
  <MyPageLayout>
    <ProfileDashboard profile={mockMyProfile} />
  </MyPageLayout>
);
