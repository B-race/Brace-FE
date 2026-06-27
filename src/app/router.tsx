import { createBrowserRouter } from "react-router-dom";
import { ApplicantManagePage } from "../pages/applicants/ApplicantManagePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { LandingPage } from "../pages/landing/LandingPage";
import { BookmarksPage } from "../pages/mypage/BookmarksPage";
import { MyApplicationsPage } from "../pages/mypage/MyApplicationsPage";
import { MyPage } from "../pages/mypage/MyPage";
import { MyProjectsPage } from "../pages/mypage/MyProjectsPage";
import { ProfileEditPage } from "../pages/mypage/ProfileEditPage";
import { NotFoundPage } from "../pages/not-found/NotFoundPage";
import { NotificationsPage } from "../pages/notifications/NotificationsPage";
import { ProfileSetupPage } from "../pages/onboarding/ProfileSetupPage";
import { ProjectCreateCompletePage } from "../pages/projects/ProjectCreateCompletePage";
import { ProjectCreatePage } from "../pages/projects/ProjectCreatePage";
import { ProjectDetailPage } from "../pages/projects/ProjectDetailPage";
import { ProjectFeedPage } from "../pages/projects/ProjectFeedPage";
import { AppLayout } from "../shared/components/layout/AppLayout";
import { ROUTES } from "../shared/constants/routes";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <LandingPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.PROFILE_SETUP,
        element: <ProfileSetupPage />,
      },
      {
        path: ROUTES.PROJECTS,
        element: <ProjectFeedPage />,
      },
      {
        path: ROUTES.PROJECT_NEW,
        element: <ProjectCreatePage />,
      },
      {
        path: ROUTES.PROJECT_NEW_COMPLETE,
        element: <ProjectCreateCompletePage />,
      },
      {
        path: ROUTES.PROJECT_DETAIL,
        element: <ProjectDetailPage />,
      },
      {
        path: ROUTES.PROJECT_APPLICANTS,
        element: <ApplicantManagePage />,
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: <NotificationsPage />,
      },
      {
        path: ROUTES.MYPAGE,
        element: <MyPage />,
      },
      {
        path: ROUTES.MY_PROJECTS,
        element: <MyProjectsPage />,
      },
      {
        path: ROUTES.MY_APPLICATIONS,
        element: <MyApplicationsPage />,
      },
      {
        path: ROUTES.MY_BOOKMARKS,
        element: <BookmarksPage />,
      },
      {
        path: ROUTES.MY_PROFILE,
        element: <ProfileEditPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
