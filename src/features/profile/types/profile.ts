export interface ProfileLink {
  label: string;
  href: string;
}

export interface MyProfile {
  name: string;
  email: string;
  role: string;
  introduction: string;
  joinedAt: string;
  skills: string[];
  avatarUrl?: string;
  githubUrl: string;
  notionUrl: string;
  portfolioUrl: string;
  extraUrl: string;
  stats: {
    registeredProjects: number;
    appliedProjects: number;
    bookmarkedProjects: number;
  };
}
