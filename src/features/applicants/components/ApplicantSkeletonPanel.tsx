const skeletonProjects = Array.from({ length: 3 }, (_, index) => index);
const skeletonApplicants = Array.from({ length: 3 }, (_, index) => index);

export const ApplicantSkeletonPanel = () => (
  <div
    className="applicant-skeleton-panel"
    aria-label="지원자 관리 정보를 불러오는 중"
  >
    <div className="applicant-project-grid">
      {skeletonProjects.map((project) => (
        <div
          className="applicant-project-skeleton"
          key={project}
        >
          <span className="applicant-skeleton-thumbnail" />
          <span className="applicant-skeleton-line medium" />
          <span className="applicant-skeleton-line short" />
        </div>
      ))}
    </div>

    <div className="applicant-management-section">
      <div className="applicant-list-panel">
        <span className="applicant-skeleton-line title" />
        <ul className="applicant-list">
          {skeletonApplicants.map((applicant) => (
            <li
              className="applicant-list-skeleton"
              key={applicant}
            >
              <span className="applicant-skeleton-avatar" />
              <span className="applicant-skeleton-content">
                <span className="applicant-skeleton-line medium" />
                <span className="applicant-skeleton-line" />
                <span className="applicant-skeleton-line short" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="applicant-detail-skeleton">
        <span className="applicant-skeleton-line title" />
        <span className="applicant-skeleton-line" />
        <span className="applicant-skeleton-line" />
        <span className="applicant-skeleton-line medium" />
      </div>
    </div>
  </div>
);
