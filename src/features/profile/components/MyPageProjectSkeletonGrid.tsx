const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

export const MyPageProjectSkeletonGrid = () => (
  <div
    className="mypage-project-grid"
    aria-label="마이페이지 프로젝트 목록을 불러오는 중"
  >
    {skeletonItems.map((item) => (
      <div
        className="mypage-project-card skeleton"
        key={item}
      >
        <span className="mypage-project-skeleton-thumbnail" />
        <div className="mypage-project-card-body">
          <span className="mypage-project-skeleton-line" />
          <span className="mypage-project-skeleton-line short" />
        </div>
      </div>
    ))}
  </div>
);
