import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { createProjectApplyPath, ROUTES } from "../../shared/constants/routes";
import "../../styles/projectDetail.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// =====================
// 팩맨 모집률 그래프
// =====================
const PacmanChart: React.FC<{ rate: number }> = ({ rate }) => {
  const filled = Math.max(0, Math.min(1, rate));
  const mouthAngle = 40;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = 80,
    cy = 80,
    r = 70;
  const bx1 = cx + r * Math.cos(toRad(mouthAngle / 2));
  const by1 = cy + r * Math.sin(toRad(mouthAngle / 2));
  const bx2 = cx + r * Math.cos(toRad(360 - mouthAngle / 2));
  const by2 = cy + r * Math.sin(toRad(360 - mouthAngle / 2));
  const sliceAngle = filled * (360 - mouthAngle);
  const ex = cx + r * Math.cos(toRad(mouthAngle / 2 + sliceAngle));
  const ey = cy + r * Math.sin(toRad(mouthAngle / 2 + sliceAngle));
  const sliceLarge = sliceAngle > 180 ? 1 : 0;
  return (
    <div className="pd-pacman">
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
      >
        <path
          d={`M ${cx} ${cy} L ${bx1} ${by1} A ${r} ${r} 0 1 1 ${bx2} ${by2} Z`}
          fill="#e0e0e0"
        />
        {filled > 0 && (
          <path
            d={`M ${cx} ${cy} L ${bx1} ${by1} A ${r} ${r} 0 ${sliceLarge} 1 ${ex} ${ey} Z`}
            fill="#111111"
          />
        )}
      </svg>
    </div>
  );
};

// =====================
// 로그아웃 모달
// =====================
const LogoutModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => (
  <div
    className="pd-modal-overlay"
    onClick={onCancel}
  >
    <div
      className="pd-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="pd-modal__msg">로그아웃 하시겠습니까?</p>
      <div className="pd-modal__actions">
        <button
          className="pd-modal__btn pd-modal__btn--cancel"
          onClick={onCancel}
        >
          아니오
        </button>
        <button
          className="pd-modal__btn pd-modal__btn--confirm"
          onClick={onConfirm}
        >
          네
        </button>
      </div>
    </div>
  </div>
);

// =====================
// 사이드바
// =====================
const Sidebar: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(ROUTES.LOGIN);
  };
  return (
    <>
      <aside className="pd-sidebar">
        <nav className="pd-sidebar__nav">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "pd-sidebar__item pd-sidebar__item--active"
                : "pd-sidebar__item"
            }
            to={ROUTES.MY_PROJECTS}
          >
            <span className="pd-sidebar__icon">👤</span>내 프로젝트
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "pd-sidebar__item pd-sidebar__item--active"
                : "pd-sidebar__item"
            }
            to={ROUTES.MY_APPLICATIONS}
          >
            <span className="pd-sidebar__icon">📋</span>지원 현황
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "pd-sidebar__item pd-sidebar__item--active"
                : "pd-sidebar__item"
            }
            to={ROUTES.MY_BOOKMARKS}
          >
            <span className="pd-sidebar__icon">🔖</span>북마크
          </NavLink>
          <button
            className="pd-sidebar__item pd-sidebar__item--logout"
            onClick={() => setShowLogout(true)}
          >
            <span className="pd-sidebar__icon">📕</span>로그아웃
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

// =====================
// 타입
// =====================
interface RecruitmentRole {
  roleId: number;
  roleName: string;
  recruitCount: number;
  currentCount: number;
}

interface ProjectDetail {
  projectId: number;
  activityType: string;
  title: string;
  description: string;
  projectName: string;
  startDate: string;
  endDate: string;
  deadline: string;
  meetingType: string;
  status: string;
  writerName: string;
  writerRole: string;
  writerIntroduction: string;
  writerProfileImageUrl: string;
  recruitmentStatus: RecruitmentRole[];
}

// =====================
// Main: ProjectDetailPage
// =====================
export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `${API_BASE_URL}/api/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const data = await response.json();
        if (data.isSuccess) setProject(data.result);
      } catch {
        window.alert("프로젝트 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleApply = () => navigate(createProjectApplyPath(projectId ?? "1"));

  const totalRecruit =
    project?.recruitmentStatus.reduce((sum, r) => sum + r.recruitCount, 0) ?? 0;
  const currentCount =
    project?.recruitmentStatus.reduce((sum, r) => sum + r.currentCount, 0) ?? 0;
  const fillRate = totalRecruit > 0 ? currentCount / totalRecruit : 0;

  if (isLoading)
    return (
      <div className="pd-layout">
        <div className="pd-content">
          <p>불러오는 중...</p>
        </div>
      </div>
    );
  if (!project)
    return (
      <div className="pd-layout">
        <div className="pd-content">
          <p>프로젝트를 찾을 수 없습니다.</p>
        </div>
      </div>
    );

  return (
    <div className="pd-layout">
      <Sidebar />
      <div className="pd-content">
        <section className="pd-hero">
          <h1 className="pd-hero__title">프로젝트 상세</h1>
          <PacmanChart rate={fillRate} />
        </section>

        <section className="pd-contest">
          <div className="pd-contest__thumb" />
          <div className="pd-contest__body">
            <h2 className="pd-contest__name">{project.title}</h2>
            <p className="pd-contest__desc">{project.description}</p>
            <p className="pd-contest__desc">마감일: {project.deadline}</p>
            <p className="pd-contest__desc">미팅 방식: {project.meetingType}</p>
          </div>
        </section>

        <section className="pd-proposer">
          <div className="pd-proposer__avatar">
            {project.writerProfileImageUrl && (
              <img
                src={project.writerProfileImageUrl}
                alt={project.writerName}
              />
            )}
          </div>
          <div className="pd-proposer__info">
            <h3 className="pd-proposer__name">{project.writerName}</h3>
            <span className="pd-proposer__chip">
              역할: {project.writerRole}
            </span>
            <p className="pd-proposer__desc">{project.writerIntroduction}</p>
          </div>
        </section>

        <section className="pd-recruit">
          <h2 className="pd-recruit__title">모집 현황</h2>
          <div className="pd-recruit__right">
            {project.recruitmentStatus.map((role) => {
              const isClosed = role.currentCount >= role.recruitCount;
              return (
                <div
                  key={role.roleId}
                  className="pd-role"
                >
                  <p className="pd-role__label">
                    {role.roleName} {role.recruitCount}명
                  </p>
                  <div
                    className={`pd-role__badge ${isClosed ? "pd-role__badge--closed" : ""}`}
                  >
                    {isClosed ? "모집 마감" : "지원 가능"}
                  </div>
                  <p className="pd-role__hint">
                    {role.currentCount}/{role.recruitCount}명 지원
                  </p>
                </div>
              );
            })}
            {project.status === "RECRUITING" && (
              <button
                className="pd-apply-btn pd-apply-btn--apply"
                onClick={handleApply}
              >
                지원하기
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
