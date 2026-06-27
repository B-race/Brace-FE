export type MyPageProjectListType = "myProjects" | "applications" | "bookmarks";

export interface MyPageProjectCardItem {
  projectId: number;
  title: string;
  description: string;
  activityType: string;
  meetingType: string;
  deadline: string;
  status: string;
  tags: string;
  writerName: string;
  thumbnailUrl?: string;
  // applications 전용
  applicationId?: number;
  roleName?: string;
  appliedAt?: string;
  projectStatus?: string;
}
