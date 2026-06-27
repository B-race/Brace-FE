import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logoImage from "../../../assets/images/logo2.png";
import "../../../styles/appLayout.css";
import { ROUTES } from "../../constants/routes";

const navigationItems = [
  { label: "Value", to: ROUTES.HOME },
  { label: "모집하기", to: ROUTES.PROJECT_REGISTER },
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
          aria-label="Brace 홈으로 이동"
        >
          <img
            src={logoImage}
            alt="Brace"
          />
        </NavLink>

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

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};
