import type {
  MyPageProjectCardItem,
  MyPageProjectListType,
} from "../types/mypageProject";

export const mockMyProjects: MyPageProjectCardItem[] = [
  {
    projectId: 101,
    title: "로컬 스터디 매칭 서비스",
    description: "",
    activityType: "PERSONAL_PROJECT",
    meetingType: "ONLINE",
    deadline: "2026-08-01",
    status: "RECRUITING",
    tags: "",
    writerName: "기획/프론트엔드 모집",
  },
  {
    projectId: 102,
    title: "로컬 맛집 추천 앱",
    description: "",
    activityType: "PERSONAL_PROJECT",
    meetingType: "ONLINE",
    deadline: "2026-08-01",
    status: "RECRUITING",
    tags: "",
    writerName: "백엔드 모집",
  },
];

export const mockMyApplications: MyPageProjectCardItem[] = [
  {
    projectId: 201,
    title: "팀 에어러블 해커톤",
    description: "",
    activityType: "CONTEST",
    meetingType: "ONLINE",
    deadline: "2026-08-01",
    status: "PROGRESS",
    tags: "",
    writerName: "",
    roleName: "백엔드 개발자",
  },
  {
    projectId: 202,
    title: "AI 챗봇 경진대회",
    description: "",
    activityType: "CONTEST",
    meetingType: "ONLINE",
    deadline: "2026-08-01",
    status: "PASS",
    tags: "",
    writerName: "",
    roleName: "프론트엔드 개발자",
  },
];

export const mockBookmarkedProjects: MyPageProjectCardItem[] = [
  {
    projectId: 301,
    title: "팀 에어러블 해커톤",
    description: "",
    activityType: "CONTEST",
    meetingType: "ONLINE",
    deadline: "2026-08-01",
    status: "RECRUITING",
    tags: "",
    writerName: "백엔드 개발자",
  },
];

export const mockMyPageProjectLists: Record<
  MyPageProjectListType,
  MyPageProjectCardItem[]
> = {
  myProjects: mockMyProjects,
  applications: mockMyApplications,
  bookmarks: mockBookmarkedProjects,
};
