import type { NotificationItem } from "../types/notification";

export const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "newApplicant",
    status: "unread",
    title: "새 지원자가 도착했어요",
    message:
      "프론트엔드 개발자 민준님이 2024 소셜벤처 아이디어 공모전에 지원했어요.",
    createdAt: "2026-06-27T09:30:00.000Z",
    projectId: 101,
    projectTitle: "2024 소셜벤처 아이디어 공모전",
    applicantId: 501,
    sender: {
      id: 501,
      name: "민준",
      role: "프론트엔드 개발자",
    },
    link: {
      label: "지원자 확인하기",
      href: "/projects/101/applicants",
    },
  },
  {
    id: 2,
    type: "applicationAccepted",
    status: "unread",
    title: "지원이 수락됐어요",
    message:
      "로컬 맛집 추천 앱 프로젝트 합류가 확정됐어요. 제안자 연락처를 확인해보세요.",
    createdAt: "2026-06-26T12:10:00.000Z",
    projectId: 102,
    projectTitle: "로컬 맛집 추천 앱",
    sender: {
      id: 302,
      name: "수현",
      role: "아이디어 제안자",
    },
    contact: {
      email: "suhyun@example.com",
      openChatUrl: "https://open.kakao.com/o/brace-local-food",
    },
    link: {
      label: "연락처 확인하기",
      href: "/notifications/2",
    },
  },
  {
    id: 3,
    type: "applicationRejected",
    status: "read",
    title: "지원 결과가 도착했어요",
    message:
      "환경 데이터 시각화 프로젝트 지원이 아쉽게도 거절됐어요. 다른 프로젝트도 둘러보세요.",
    createdAt: "2026-06-25T15:45:00.000Z",
    projectId: 103,
    projectTitle: "환경 데이터 시각화 프로젝트",
    link: {
      label: "프로젝트 둘러보기",
      href: "/projects",
    },
  },
  {
    id: 4,
    type: "projectCreated",
    status: "read",
    title: "프로젝트 등록이 완료됐어요",
    message: "2024 소셜벤처 아이디어 공모전이 피드에 노출되기 시작했어요.",
    createdAt: "2026-06-24T08:20:00.000Z",
    projectId: 101,
    projectTitle: "2024 소셜벤처 아이디어 공모전",
    link: {
      label: "프로젝트 확인하기",
      href: "/projects/101",
    },
  },
  {
    id: 5,
    type: "recruitmentCompleted",
    status: "unread",
    title: "모집이 완료됐어요",
    message: "2024 소셜벤처 아이디어 공모전의 모집 인원이 모두 충족됐어요.",
    createdAt: "2026-06-23T18:00:00.000Z",
    projectId: 101,
    projectTitle: "2024 소셜벤처 아이디어 공모전",
    link: {
      label: "모집 현황 보기",
      href: "/projects/101",
    },
  },
];
