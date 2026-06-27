import { useParams } from "react-router-dom";
import { PlaceholderPage } from "../../shared/components/layout/PlaceholderPage";

export const NotificationDetailPage = () => {
  const { notificationId } = useParams();

  return (
    <PlaceholderPage
      title="알림 상세"
      description={`알림 ${notificationId ?? ""}의 상세 정보와 공개된 연락처를 확인하는 화면입니다.`}
    />
  );
};
