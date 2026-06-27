import type { ReactNode } from "react";
import { Sidebar } from "../../../shared/components/layout/Sidebar";

interface MyPageLayoutProps {
  children: ReactNode;
}

export const MyPageLayout = ({ children }: MyPageLayoutProps) => (
  <div className="mypage-layout">
    <Sidebar />
    <div className="mypage-content">{children}</div>
  </div>
);
