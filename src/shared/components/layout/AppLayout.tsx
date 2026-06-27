import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../constants/routes";
import "../../../styles/appLayout.css";

const navigationItems = [
  { label: "홈", to: ROUTES.HOME },
  { label: "프로젝트", to: ROUTES.PROJECTS },
  { label: "알림", to: ROUTES.NOTIFICATIONS },
  { label: "마이페이지", to: ROUTES.MYPAGE },
];

export const AppLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink
          className="app-logo"
          to={ROUTES.HOME}
        >
          <div className="app-logo__icon" />
          Brace
        </NavLink>

        <div className="app-search">
          <input
            className="app-search__input"
            type="text"
            placeholder="Value"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="app-search__btn"
            aria-label="검색"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
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
                strokeWidth="1.5"
                strokeLinecap="round"
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

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};
