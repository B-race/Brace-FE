import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import "../../../styles/appLayout.css";

export const AppLayout = () => {
  return (
    <div className="app-shell">
      <Header />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};
