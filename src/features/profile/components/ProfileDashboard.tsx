import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import type { MyProfile } from "../types/profile";

interface ProfileDashboardProps {
  profile: MyProfile;
}

export const ProfileDashboard = ({ profile }: ProfileDashboardProps) => (
  <section className="profile-dashboard">
    <div className="profile-hero-card">
      <span
        className="profile-avatar"
        aria-hidden="true"
      />
      <div className="profile-summary">
        <h1>{profile.name}</h1>
        <div className="profile-tags">
          <span>역할: {profile.role}</span>
          {profile.skills.map((skill) => (
            <span key={skill}>기술: {skill}</span>
          ))}
        </div>
        <p>{profile.introduction}</p>
      </div>
      <div className="profile-actions">
        <Link
          className="profile-outline-button"
          to={ROUTES.MY_PROFILE}
        >
          프로필 수정
        </Link>
        <Link
          className="profile-outline-button"
          to={ROUTES.NOTIFICATIONS}
        >
          알림 확인
        </Link>
      </div>
    </div>

    <div className="profile-stat-grid">
      <div className="profile-stat-card">
        <strong>{profile.stats.registeredProjects}</strong>
        <span>등록한 프로젝트</span>
      </div>
      <div className="profile-stat-card">
        <strong>{profile.stats.appliedProjects}</strong>
        <span>지원한 프로젝트</span>
      </div>
      <div className="profile-stat-card">
        <strong>{profile.stats.bookmarkedProjects}</strong>
        <span>북마크 프로젝트</span>
      </div>
    </div>

    <div className="profile-detail-card">
      <section>
        <h2>상세정보</h2>
        <dl>
          <div>
            <dt>이름</dt>
            <dd>{profile.name}</dd>
          </div>
          <div>
            <dt>이메일</dt>
            <dd>{profile.email}</dd>
          </div>
          <div>
            <dt>역할</dt>
            <dd>{profile.role}</dd>
          </div>
          <div>
            <dt>가입일</dt>
            <dd>{profile.joinedAt}</dd>
          </div>
        </dl>
      </section>
      <section>
        <h2>개인 페이지</h2>
        <dl>
          <div>
            <dt>깃허브</dt>
            <dd>{profile.githubUrl.replace("https://", "")}</dd>
          </div>
          <div>
            <dt>노션</dt>
            <dd>{profile.notionUrl.replace("https://", "")}</dd>
          </div>
        </dl>
      </section>
      <button
        className="profile-withdraw-button"
        type="button"
      >
        회원 탈퇴
      </button>
    </div>
  </section>
);
