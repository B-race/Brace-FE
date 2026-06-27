export type NotificationType =
  | "newApplicant"
  | "applicationAccepted"
  | "applicationRejected"
  | "projectCreated"
  | "recruitmentCompleted";

export type NotificationReadStatus = "read" | "unread";

export interface NotificationSender {
  id: number;
  name: string;
  role: string;
}

export interface NotificationContact {
  email?: string;
  openChatUrl?: string;
}

export interface NotificationLink {
  label: string;
  href: string;
}

export interface NotificationItem {
  id: number;
  type: NotificationType;
  status: NotificationReadStatus;
  title: string;
  message: string;
  createdAt: string;
  projectId?: number;
  projectTitle?: string;
  applicantId?: number;
  sender?: NotificationSender;
  contact?: NotificationContact;
  link: NotificationLink;
}
