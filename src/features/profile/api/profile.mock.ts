import type { MyProfile } from "../types/profile";

export const mockMyProfile: MyProfile = {
  userId: 1,
  name: "유제아",
  email: "dbwpdk0404@gmail.com",
  role: "프론트엔드",
  introduction: "웹 UI/UX를 좋아하는 인턴입니다",
  createdAt: "2026-06-27T00:00:00.000Z",
  profileImageUrl: "",
  skills: [
    { skillId: 1, skillTag: "REACT" },
    { skillId: 2, skillTag: "TYPESCRIPT" },
    { skillId: 3, skillTag: "NEXT_JS" },
  ],
  githubUrl: "https://github.com/Jea7",
  notionUrl: "https://notion.so/blabla",
  extraUrl: "",
  registeredProjects: 4,
  appliedProjects: 4,
  bookmarkedProjects: 4,
};
