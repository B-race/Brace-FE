import type { ApplicantProject, ManagedApplicant } from "../types/applicant";

export const mockApplicantProjects: ApplicantProject[] = [
  {
    id: 101,
    title: "로컬 스터디 매칭 서비스",
    deadlineLabel: "마감 D-7",
    recruitingStatus: "팀 모집 중",
    applicantCount: 3,
  },
  {
    id: 102,
    title: "로컬 맛집 추천 앱",
    deadlineLabel: "마감 D-7",
    recruitingStatus: "팀 모집 중",
    applicantCount: 2,
  },
  {
    id: 103,
    title: "환경 데이터 시각화 프로젝트",
    deadlineLabel: "마감 D-7",
    recruitingStatus: "팀 모집 중",
    applicantCount: 1,
  },
];

export const mockManagedApplicants: ManagedApplicant[] = [
  {
    id: 501,
    projectId: 101,
    status: "accepted",
    appliedAt: "2026-06-27T09:30:00.000Z",
    profile: {
      id: 501,
      name: "민준",
      role: "프론트엔드 개발자",
      bio: "React와 TypeScript 기반의 서비스 UI 구현 경험이 있습니다.",
      skills: ["React", "TypeScript", "Vite"],
      portfolioUrl: "https://github.com/minjun",
    },
    message:
      "스터디 매칭 서비스의 문제 정의가 좋아서 지원했습니다. 빠르게 화면을 만들고 사용자 흐름을 정리하는 역할을 맡고 싶습니다.",
    contact: {
      email: "minjun@example.com",
      openChatUrl: "https://open.kakao.com/o/brace-minjun",
    },
  },
  {
    id: 502,
    projectId: 101,
    status: "rejected",
    appliedAt: "2026-06-26T13:20:00.000Z",
    profile: {
      id: 502,
      name: "서연",
      role: "UI/UX 디자이너",
      bio: "모바일 서비스 디자인과 프로토타입 제작을 주로 해왔습니다.",
      skills: ["Figma", "UX Research", "Prototype"],
      portfolioUrl: "https://portfolio.example.com/seoyeon",
    },
    message: "사용자 리서치부터 와이어프레임 제작까지 함께 기여하고 싶습니다.",
    contact: {
      email: "seoyeon@example.com",
      openChatUrl: "https://open.kakao.com/o/brace-seoyeon",
    },
  },
  {
    id: 503,
    projectId: 101,
    status: "pending",
    appliedAt: "2026-06-25T16:45:00.000Z",
    profile: {
      id: 503,
      name: "도윤",
      role: "백엔드 개발자",
      bio: "Node.js와 DB 설계를 활용해 API 서버를 구현할 수 있습니다.",
      skills: ["Node.js", "Express", "PostgreSQL"],
      portfolioUrl: "https://github.com/doyun",
    },
    message:
      "프로젝트의 매칭 로직과 지원자 관리 API 설계에 관심이 있어 지원했습니다.",
    contact: {
      email: "doyun@example.com",
      openChatUrl: "https://open.kakao.com/o/brace-doyun",
    },
  },
  {
    id: 504,
    projectId: 102,
    status: "pending",
    appliedAt: "2026-06-24T10:00:00.000Z",
    profile: {
      id: 504,
      name: "하린",
      role: "서비스 기획자",
      bio: "지역 기반 서비스의 기능 정책과 사용자 시나리오를 정리해왔습니다.",
      skills: ["Service Planning", "User Flow", "Notion"],
    },
    message:
      "로컬 맛집 추천 앱의 초기 기능 범위와 추천 기준을 함께 구체화하고 싶습니다.",
    contact: {
      email: "harin@example.com",
    },
  },
  {
    id: 505,
    projectId: 102,
    status: "accepted",
    appliedAt: "2026-06-23T18:10:00.000Z",
    profile: {
      id: 505,
      name: "지후",
      role: "백엔드 개발자",
      bio: "위치 기반 API와 검색 기능 구현 경험이 있습니다.",
      skills: ["NestJS", "MySQL", "Redis"],
      portfolioUrl: "https://github.com/jihu",
    },
    message:
      "지도와 검색 API를 붙여본 경험이 있어 프로젝트 구현에 바로 기여할 수 있습니다.",
    contact: {
      email: "jihu@example.com",
      openChatUrl: "https://open.kakao.com/o/brace-jihu",
    },
  },
  {
    id: 506,
    projectId: 103,
    status: "pending",
    appliedAt: "2026-06-22T11:30:00.000Z",
    profile: {
      id: 506,
      name: "나은",
      role: "데이터 분석가",
      bio: "공공데이터 분석과 시각화 대시보드 제작 경험이 있습니다.",
      skills: ["Python", "Data Visualization", "Tableau"],
      portfolioUrl: "https://portfolio.example.com/naeun",
    },
    message:
      "환경 데이터를 분석해 의미 있는 인사이트를 보여주는 화면을 만들고 싶습니다.",
    contact: {
      email: "naeun@example.com",
    },
  },
];

export const getManagedApplicantsByProjectId = (projectId: number) =>
  mockManagedApplicants.filter(
    (applicant) => applicant.projectId === projectId,
  );
