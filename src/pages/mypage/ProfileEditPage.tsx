import { MyPageStatePanel } from "../../features/profile/components/MyPageStatePanel";
import { ProfileEditForm } from "../../features/profile/components/ProfileEditForm";
import { useMyProfile } from "../../features/profile/hooks/useMyProfile";

export const ProfileEditPage = () => {
  const { profile, isLoading, isError, errorMessage, refetch } = useMyProfile();

  if (isLoading) {
    return (
      <MyPageStatePanel
        title="프로필 정보를 불러오는 중입니다"
        description="잠시만 기다려주세요."
      />
    );
  }

  if (isError || !profile) {
    return (
      <MyPageStatePanel
        title="프로필 정보를 불러오지 못했어요"
        description={errorMessage}
        actionLabel="다시 시도"
        onAction={refetch}
      />
    );
  }

  return <ProfileEditForm profile={profile} />;
};
