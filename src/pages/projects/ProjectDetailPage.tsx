import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProjectApplyPath } from "../../shared/constants/routes";
import "../../styles/projectDetail.css";

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

  const handleLogout = () => {
    setShowLogout(false);
    alert("로그아웃 되었습니다.");
  };

  return (
    <>
      <aside className="pd-sidebar">
        <nav className="pd-sidebar__nav">
          <a
            href="#"
            className="pd-sidebar__item"
          >
            <span className="pd-sidebar__icon">👤</span>내 프로젝트
          </a>
          <a
            href="#"
            className="pd-sidebar__item"
          >
            <span className="pd-sidebar__icon">📋</span>지원 현황
          </a>
          <a
            href="#"
            className="pd-sidebar__item"
          >
            <span className="pd-sidebar__icon">🔖</span>북마크
          </a>
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
// 모집 역할 타입 및 데이터
// =====================
type RecruitStatus = "지원 가능" | "모집 마감";

const MOCK_ROLES: { icon: string; label: string; status: RecruitStatus }[] = [
  { icon: "💻", label: "개발자 1명", status: "지원 가능" },
  { icon: "🎨", label: "디자이너 1명", status: "지원 가능" },
];

// =====================
// Main: ProjectDetailPage
// =====================
export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = () => navigate(createProjectApplyPath(projectId ?? "1"));
  const handleCancel = () => setHasApplied(false);

  return (
    <div className="pd-layout">
      <Sidebar />

      <div className="pd-content">
        {/* 히어로 */}
        <section className="pd-hero">
          <h1 className="pd-hero__title">프로젝트 상세</h1>
          <PacmanChart rate={0.6} />
        </section>

        {/* 공모전 카드 */}
        <section className="pd-contest">
          <div className="pd-contest__thumb" />
          <div className="pd-contest__body">
            <h2 className="pd-contest__name">공모전 이름</h2>
            <p className="pd-contest__desc">
              공모전 설명...... 계속이어지는 공모전
              설명.......................................................................................................................○○○○○○○○○○○○
            </p>
            <p className="pd-contest__desc">...</p>
            <p className="pd-contest__desc">...</p>
            <p className="pd-contest__desc">...</p>
          </div>
        </section>

        {/* 제안자 */}
        <section className="pd-proposer">
          <div className="pd-proposer__avatar" />
          <div className="pd-proposer__info">
            <h3 className="pd-proposer__name">제안자</h3>
            <span className="pd-proposer__chip">역할: 기획/리드</span>
            <p className="pd-proposer__desc">
              아바타 + 이름 + 역할 칩 + 한 줄 소개
            </p>
          </div>
        </section>

        {/* 모집 현황 */}
        <section className="pd-recruit">
          <h2 className="pd-recruit__title">모집 현황</h2>
          <div className="pd-recruit__right">
            {MOCK_ROLES.map((role, i) => (
              <div
                key={i}
                className="pd-role"
              >
                <p className="pd-role__label">
                  {role.icon} {role.label}
                </p>
                <div
                  className={`pd-role__badge ${role.status === "모집 마감" ? "pd-role__badge--closed" : ""}`}
                >
                  {role.status}
                </div>
                <p className="pd-role__hint">지원 버튼 대신 상태 표기</p>
              </div>
            ))}
            {hasApplied ? (
              <button
                className="pd-apply-btn pd-apply-btn--cancel"
                onClick={handleCancel}
              >
                취소하기
              </button>
            ) : (
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
