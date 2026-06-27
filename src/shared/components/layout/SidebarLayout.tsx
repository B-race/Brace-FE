import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const SidebarLayout = () => {
  return (
    <div className="sidebar-layout">
      <Sidebar />
      <div className="sidebar-layout__content">
        <Outlet />
      </div>
    </div>
  );
};
