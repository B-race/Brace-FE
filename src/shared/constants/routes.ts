export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE_SETUP: "/onboarding/profile",
  PROJECTS: "/projects",
  PROJECT_NEW: "/projects/new",
  PROJECT_NEW_COMPLETE: "/projects/new/complete",
  PROJECT_DETAIL: "/projects/:projectId",
  PROJECT_APPLICANTS: "/projects/:projectId/applicants",
  NOTIFICATIONS: "/notifications",
  MYPAGE: "/mypage",
  MY_PROJECTS: "/mypage/projects",
  MY_APPLICATIONS: "/mypage/applications",
  MY_BOOKMARKS: "/mypage/bookmarks",
  MY_PROFILE: "/mypage/profile",
} as const;

export const createProjectDetailPath = (projectId: number | string) =>
  `/projects/${projectId}`;

export const createProjectApplicantsPath = (projectId: number | string) =>
  `/projects/${projectId}/applicants`;
