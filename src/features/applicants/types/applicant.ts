export type ApplicantReviewStatus = "pending" | "accepted" | "rejected";

export interface ApplicantProject {
  id: number;
  title: string;
  thumbnailUrl?: string;
  deadlineLabel: string;
  recruitingStatus: string;
  applicantCount: number;
}

export interface ApplicantProfile {
  id: number;
  name: string;
  role: string;
  avatarUrl?: string;
  bio: string;
  skills: string[];
  portfolioUrl?: string;
}

export interface ApplicantContact {
  email: string;
  openChatUrl?: string;
  phone?: string;
}

export interface ManagedApplicant {
  id: number;
  projectId: number;
  status: ApplicantReviewStatus;
  appliedAt: string;
  profile: ApplicantProfile;
  message: string;
  contact: ApplicantContact;
}
