import { MyPageLayout } from "../../features/profile/components/MyPageLayout";
import { MyPageStatePanel } from "../../features/profile/components/MyPageStatePanel";
import { ProfileDashboard } from "../../features/profile/components/ProfileDashboard";
import { ProfileDashboardSkeleton } from "../../features/profile/components/ProfileDashboardSkeleton";
import { useMyProfile } from "../../features/profile/hooks/useMyProfile";

export const MyPage = () => {
  const { profile, isLoading, isError, errorMessage, refetch } = useMyProfile();

  return (
    <MyPageLayout>
      {isLoading && <ProfileDashboardSkeleton />}
      {isError && (
        <MyPageStatePanel
          title="프로필 정보를 불러오지 못했어요"
          description={errorMessage}
          actionLabel="다시 시도"
          onAction={refetch}
        />
      )}
      {!isLoading && !isError && profile && (
        <ProfileDashboard profile={profile} />
      )}
    </MyPageLayout>
  );
};
