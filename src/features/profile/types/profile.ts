export interface Skill {
  skillId: number;
  skillTag: string;
}

export interface MyProfile {
  userId: number;
  name: string;
  email: string;
  role: string;
  introduction: string;
  profileImageUrl: string;
  skills: Skill[];
  githubUrl: string;
  notionUrl: string;
  extraUrl: string;
  createdAt: string;
  registeredProjects: number;
  appliedProjects: number;
  bookmarkedProjects: number;
}
