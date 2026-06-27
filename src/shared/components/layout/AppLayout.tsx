import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/brace-logo.png";
import "../../../styles/appLayout.css";
import { ROUTES } from "../../constants/routes";
import { Sidebar } from "./Sidebar";

// 로그인 없이 접근 가능한 페이지
const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.NAVER_CALLBACK,
];

const navigationItems = [
  { label: "Value", to: ROUTES.HOME },
  { label: "모집하기", to: ROUTES.PROJECT_REGISTER },
  { label: "알림", to: ROUTES.NOTIFICATIONS },
  { label: "마이페이지", to: ROUTES.MYPAGE },
];

export const AppLayout = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 로그인 보호 처리
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const isPublic = PUBLIC_ROUTES.some((route) => location.pathname === route);

    if (!accessToken && !isPublic) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "sidebar-drawer-open",
      isSidebarOpen,
    );
    document.body.classList.toggle("sidebar-drawer-open", isSidebarOpen);

    return () => {
      document.documentElement.classList.remove("sidebar-drawer-open");
      document.body.classList.remove("sidebar-drawer-open");
    };
  }, [isSidebarOpen]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <button
            className="app-menu-button"
            type="button"
            aria-label={isSidebarOpen ? "사이드바 닫기" : "사이드바 열기"}
            aria-expanded={isSidebarOpen}
            aria-controls="global-sidebar-drawer"
            onClick={() =>
              setIsSidebarOpen((currentIsSidebarOpen) => !currentIsSidebarOpen)
            }
          >
            <span />
            <span />
            <span />
          </button>

          <NavLink
            className="app-logo"
            to={ROUTES.HOME}
            aria-label="Brace 홈으로 이동"
          >
            <img
              src={logoImage}
              alt="Brace"
            />
          </NavLink>
        </div>

        <div className="app-search">
          <input
            className="app-search__input"
            type="text"
            placeholder="Value"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            className="app-search__btn"
            type="button"
            aria-label="검색"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5"
                stroke="#888"
                strokeWidth="1.5"
              />
              <path
                d="M10.5 10.5L14 14"
                stroke="#888"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        <nav
          className="app-nav"
          aria-label="주요 메뉴"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                isActive ? "app-nav-link active" : "app-nav-link"
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {isSidebarOpen && (
        <div
          className="sidebar-drawer-backdrop"
          role="presentation"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="sidebar-drawer-panel"
            id="global-sidebar-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="사이드바 메뉴"
            onClick={(event) => event.stopPropagation()}
          >
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};
