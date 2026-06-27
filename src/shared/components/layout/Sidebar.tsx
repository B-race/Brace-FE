import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const LogoutModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div
    className="sidebar-modal-overlay"
    onClick={onCancel}
  >
    <div
      aria-labelledby="logout-modal-title"
      aria-modal="true"
      className="sidebar-modal"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
    >
      <p
        className="sidebar-modal__msg"
        id="logout-modal-title"
      >
        로그아웃 하시겠습니까?
      </p>
      <div className="sidebar-modal__actions">
        <button
          className="sidebar-modal__btn sidebar-modal__btn--cancel"
          onClick={onCancel}
          type="button"
        >
          아니오
        </button>
        <button
          className="sidebar-modal__btn sidebar-modal__btn--confirm"
          onClick={onConfirm}
          type="button"
        >
          예
        </button>
      </div>
    </div>
  </div>
);

export const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("accessToken");
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <aside className="app-sidebar">
        <nav className="app-sidebar__nav">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "app-sidebar__item app-sidebar__item--active"
                : "app-sidebar__item"
            }
            to={ROUTES.MY_PROJECTS}
          >
            <span className="app-sidebar__icon">👤</span>내 프로젝트
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "app-sidebar__item app-sidebar__item--active"
                : "app-sidebar__item"
            }
            to={ROUTES.MY_APPLICATIONS}
          >
            <span className="app-sidebar__icon">📋</span>
            지원 현황
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "app-sidebar__item app-sidebar__item--active"
                : "app-sidebar__item"
            }
            to={ROUTES.MY_BOOKMARKS}
          >
            <span className="app-sidebar__icon">🔖</span>
            북마크
          </NavLink>
          <button
            className="app-sidebar__item app-sidebar__item--logout"
            onClick={() => setShowLogout(true)}
            type="button"
          >
            <span className="app-sidebar__icon">📕</span>
            로그아웃
          </button>
        </nav>
      </aside>

      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </>
  );
};
