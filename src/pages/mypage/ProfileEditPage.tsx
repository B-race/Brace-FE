import { mockMyProfile } from "../../features/profile/api/profile.mock";
import { ProfileEditForm } from "../../features/profile/components/ProfileEditForm";

export const ProfileEditPage = () => (
  <ProfileEditForm profile={mockMyProfile} />
);
