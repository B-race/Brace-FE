export const ProfileDashboardSkeleton = () => (
  <section
    className="profile-dashboard"
    aria-label="프로필 정보를 불러오는 중"
  >
    <div className="profile-hero-card">
      <span className="profile-avatar skeleton" />
      <div className="profile-summary">
        <span className="profile-skeleton-line title" />
        <span className="profile-skeleton-line" />
        <span className="profile-skeleton-line short" />
      </div>
    </div>
    <div className="profile-stat-grid">
      {[0, 1, 2].map((item) => (
        <div
          className="profile-stat-card skeleton"
          key={item}
        >
          <span className="profile-skeleton-line short" />
        </div>
      ))}
    </div>
  </section>
);
