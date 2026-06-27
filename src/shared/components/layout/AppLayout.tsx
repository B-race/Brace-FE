import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const navigationItems = [
  { label: "홈", to: ROUTES.HOME },
  { label: "프로젝트", to: ROUTES.PROJECTS },
  { label: "알림", to: ROUTES.NOTIFICATIONS },
  { label: "마이페이지", to: ROUTES.MYPAGE },
];

export const AppLayout = () => (
  <div className="app-shell">
    <header className="app-header">
      <NavLink
        className="app-logo"
        to={ROUTES.HOME}
      >
        Brace
      </NavLink>
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
