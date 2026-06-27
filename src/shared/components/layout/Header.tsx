import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`${ROUTES.PROJECTS}?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="app-header">
      <NavLink
        className="app-logo"
        to={ROUTES.HOME}
      >
        <div className="app-logo__icon" />
        Brace
      </NavLink>

      <form
        className="app-search"
        onSubmit={handleSearch}
      >
        <input
          className="app-search__input"
          type="text"
          placeholder="프로젝트 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="app-search__btn"
          type="submit"
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
      </form>

      <nav
        className="app-nav"
        aria-label="주요 메뉴"
      >
        <NavLink
          className={({ isActive }) =>
            isActive ? "app-nav-link active" : "app-nav-link"
          }
          to={ROUTES.PROJECT_REGISTER}
        >
          모집하기
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "app-nav-link active" : "app-nav-link"
          }
          to={ROUTES.MYPAGE}
        >
          마이페이지
        </NavLink>
      </nav>
    </header>
  );
};
