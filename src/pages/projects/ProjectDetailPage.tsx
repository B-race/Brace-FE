import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ROUTES,
  createProjectApplicantsPath,
  createProjectApplyPath,
} from "../../shared/constants/routes";
import "../../styles/projectDetail.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BOOKMARK_STORAGE_KEY = "brace-bookmarked-projects";
const OWNER_PROJECT_IDS = new Set([101]);
const APPLIED_PROJECT_IDS = new Set([102]);

const PacmanChart: React.FC<{ rate: number }> = ({ rate }) => {
  const filled = Math.max(0, Math.min(1, rate));
  const mouthAngle = 40;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = 80;
  const cy = 80;
  const r = 70;
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

const LogoutModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div
    className="pd-modal-overlay"
    onClick={onCancel}
  >
    <div
      aria-labelledby="logout-modal-title"
      aria-modal="true"
      className="pd-modal"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
    >
      <p
        className="pd-modal__msg"
        id="logout-modal-title"
      >
        로그아웃 하시겠습니까?
      </p>
      <div className="pd-modal__actions">
        <button
          className="pd-modal__btn pd-modal__btn--cancel"
          onClick={onCancel}
          type="button"
        >
          아니오
        </button>
        <button
          className="pd-modal__btn pd-modal__btn--confirm"
          onClick={onConfirm}
          type="button"
        >
          예
        </button>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
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
            type="button"
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

interface StoredBookmarkProject {
  id: number;
  title: string;
  role: string;
  status: "reviewing" | "accepted" | "rejected" | "notApplied";
  statusLabel: string;
  thumbnailLabel: string;
}

const getProjectNumericId = (projectId?: string) => Number(projectId ?? 0);

const getDdayLabel = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  if (Number.isNaN(deadlineDate.getTime())) return "D-day";

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const deadlineStart = new Date(
    deadlineDate.getFullYear(),
    deadlineDate.getMonth(),
    deadlineDate.getDate(),
  );
  const diffDays = Math.ceil(
    (deadlineStart.getTime() - todayStart.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return "마감";
  if (diffDays === 0) return "D-day";
  return `D-${diffDays}`;
};

const readStoredBookmarks = (): StoredBookmarkProject[] => {
  const rawBookmarks = localStorage.getItem(BOOKMARK_STORAGE_KEY);
  if (!rawBookmarks) return [];

  try {
    return JSON.parse(rawBookmarks) as StoredBookmarkProject[];
  } catch {
    return [];
  }
};

const writeStoredBookmarks = (bookmarks: StoredBookmarkProject[]) => {
  localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
};

const createBookmarkItem = (
  project: ProjectDetail,
  projectId: number,
): StoredBookmarkProject => ({
  id: projectId,
  title: project.title,
  role: project.recruitmentStatus[0]?.roleName ?? "모집 역할",
  status: "notApplied",
  statusLabel: "미지원",
  thumbnailLabel: project.projectName || project.title,
});

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkRevision, setBookmarkRevision] = useState(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelledProjectIds, setCancelledProjectIds] = useState<Set<number>>(
    () => new Set(),
  );

  const numericProjectId = getProjectNumericId(projectId);
  const isOwnerProject = OWNER_PROJECT_IDS.has(numericProjectId);
  const hasAppliedProject =
    APPLIED_PROJECT_IDS.has(numericProjectId) &&
    !cancelledProjectIds.has(numericProjectId);
  const isBookmarked = useMemo(() => {
    void bookmarkRevision;
    return readStoredBookmarks().some(
      (bookmark) => bookmark.id === numericProjectId,
    );
  }, [bookmarkRevision, numericProjectId]);

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

  const totalRecruit =
    project?.recruitmentStatus.reduce(
      (sum, role) => sum + role.recruitCount,
      0,
    ) ?? 0;
  const currentCount =
    project?.recruitmentStatus.reduce(
      (sum, role) => sum + role.currentCount,
      0,
    ) ?? 0;
  const fillRate = totalRecruit > 0 ? currentCount / totalRecruit : 0;
  const deadlineLabel = useMemo(
    () => getDdayLabel(project?.deadline ?? ""),
    [project?.deadline],
  );

  const handleApply = () => navigate(createProjectApplyPath(projectId ?? "1"));

  const handleManageApplicants = () =>
    navigate(createProjectApplicantsPath(projectId ?? "1"));

  const handleToggleBookmark = () => {
    if (!project) return;

    const storedBookmarks = readStoredBookmarks();
    const alreadyBookmarked = storedBookmarks.some(
      (bookmark) => bookmark.id === numericProjectId,
    );
    const nextBookmarks = alreadyBookmarked
      ? storedBookmarks.filter((bookmark) => bookmark.id !== numericProjectId)
      : [...storedBookmarks, createBookmarkItem(project, numericProjectId)];

    writeStoredBookmarks(nextBookmarks);
    setBookmarkRevision((revision) => revision + 1);
  };

  const handleCancelApplication = () => {
    setCancelledProjectIds((currentProjectIds) => {
      const nextProjectIds = new Set(currentProjectIds);
      nextProjectIds.add(numericProjectId);
      return nextProjectIds;
    });
    setIsCancelModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="pd-layout">
        <div className="pd-content">
          <p>불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pd-layout">
        <div className="pd-content">
          <p>프로젝트를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-layout">
      <Sidebar />
      <div className="pd-content">
        <section className="pd-hero">
          <div className="pd-hero__info">
            <p className="pd-hero__eyebrow">프로젝트 상세</p>
            <div className="pd-hero__title-row">
              <h1 className="pd-hero__title">{project.title}</h1>
              <button
                className={`pd-bookmark-btn${isBookmarked ? "active" : ""}`}
                type="button"
                aria-pressed={isBookmarked}
                onClick={handleToggleBookmark}
              >
                {isBookmarked ? "북마크됨" : "북마크"}
              </button>
            </div>
          </div>
          <PacmanChart rate={fillRate} />
        </section>

        <section className="pd-contest">
          <div className="pd-contest__thumb" />
          <div className="pd-contest__body">
            <h2 className="pd-contest__name">{project.projectName}</h2>
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
          <div className="pd-recruit__heading">
            <h2 className="pd-recruit__title">모집 현황</h2>
            <span className="pd-recruit__deadline">{deadlineLabel}</span>
          </div>
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
                    className={`pd-role__badge ${
                      isClosed ? "pd-role__badge--closed" : ""
                    }`}
                  >
                    {isClosed ? "모집 마감" : "지원 가능"}
                  </div>
                  <p className="pd-role__hint">
                    {role.currentCount}/{role.recruitCount}명 지원
                  </p>
                </div>
              );
            })}
            {isOwnerProject && (
              <button
                className="pd-apply-btn pd-apply-btn--apply"
                onClick={handleManageApplicants}
                type="button"
              >
                지원자 관리
              </button>
            )}
            {!isOwnerProject && hasAppliedProject && (
              <button
                className="pd-apply-btn pd-apply-btn--cancel"
                onClick={() => setIsCancelModalOpen(true)}
                type="button"
              >
                지원 취소
              </button>
            )}
            {!isOwnerProject &&
              !hasAppliedProject &&
              project.status === "RECRUITING" && (
                <button
                  className="pd-apply-btn pd-apply-btn--apply"
                  onClick={handleApply}
                  type="button"
                >
                  지원하기
                </button>
              )}
          </div>
        </section>
      </div>

      {isCancelModalOpen && (
        <div
          className="pd-modal-overlay"
          onClick={() => setIsCancelModalOpen(false)}
        >
          <div
            className="pd-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-cancel-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p
              className="pd-modal__msg"
              id="apply-cancel-modal-title"
            >
              지원을 취소하시겠습니까?
            </p>
            <div className="pd-modal__actions">
              <button
                className="pd-modal__btn pd-modal__btn--cancel"
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
              >
                아니오
              </button>
              <button
                className="pd-modal__btn pd-modal__btn--confirm"
                type="button"
                onClick={handleCancelApplication}
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
