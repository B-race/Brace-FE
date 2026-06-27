import type { ReactNode } from "react";

interface MyPageLayoutProps {
  children: ReactNode;
}

export const MyPageLayout = ({ children }: MyPageLayoutProps) => (
  <div className="mypage-layout">
    <div className="mypage-content">{children}</div>
  </div>
);
