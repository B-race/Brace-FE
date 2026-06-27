export type MyPageProjectStatus =
  | "reviewing"
  | "accepted"
  | "rejected"
  | "notApplied"
  | "recruiting"
  | "completed";

export interface MyPageProjectCardItem {
  id: number;
  title: string;
  role: string;
  status: MyPageProjectStatus;
  statusLabel: string;
  thumbnailLabel: string;
}
