import type { NotificationType } from "../types/notification";

interface NotificationTypeBadgeProps {
  type: NotificationType;
}

const notificationTypeLabels: Record<NotificationType, string> = {
  newApplicant: "새 지원자",
  applicationAccepted: "지원 수락",
  applicationRejected: "지원 거절",
  projectCreated: "등록 완료",
  recruitmentCompleted: "모집 완료",
};

const notificationTypeIcons: Record<NotificationType, string> = {
  newApplicant: "NEW",
  applicationAccepted: "✓",
  applicationRejected: "!",
  projectCreated: "+",
  recruitmentCompleted: "⌛",
};

export const NotificationTypeBadge = ({ type }: NotificationTypeBadgeProps) => (
  <span
    aria-label={notificationTypeLabels[type]}
    className={`notification-type ${type}`}
    role="img"
  >
    {notificationTypeIcons[type]}
  </span>
);
