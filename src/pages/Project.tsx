import "./Project.css";
type Project = {
  title: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "[공모전] 사회문제 해결 앱",
    description: "설문 기반 피드백을 통해 작품을 발전합니다.",
    tags: ["#사회문제", "#앱개발"],
  },
  {
    title: "[개인 프로젝트] 일정 자동화 도구",
    description: "웹캘린더 분석과 추천 일정 기능을 제공합니다.",
    tags: ["#생산성", "#웹앱"],
  },
  {
    title: "[공모전] 공공 데이터 시각화",
    description: "열린 데이터를 통해 정책 현황을 한눈에 보여줍니다.",
    tags: ["#데이터", "#시각화"],
  },
  {
    title: "[개인 프로젝트] 커뮤니티 채팅 리뉴얼",
    description: "글리터/태그/알림 상태를 개선했습니다.",
    tags: ["#UX", "#채팅"],
  },
  {
    title: "[공모전] 환경 챌린지 플랫폼",
    description: "참여형 미션으로 환경 목표를 달성합니다.",
    tags: ["#환경", "#커뮤니티"],
  },
  {
    title: "[개인 프로젝트] 접근성 체크리스트",
    description: "웹 접근성 항목을 점검하고 개선점을 제안합니다.",
    tags: ["#디자인", "#접근성"],
  },
];

function Project() {
  return (
    <div className="projects-page">
      <header className="top-header">
        <a className="brand" href="/">
          <span className="brand-circle" />
          <span>Brace</span>
        </a>

        <nav className="top-nav">
          <button type="button">모집하기</button>
          <button type="button">참여하기</button>
          <button type="button">마이페이지</button>
        </nav>
      </header>

      <div className="dashboard-layout">
        <aside className="side-menu">
          <button className="side-menu-item active" type="button">
            <span>👤</span>
            내 프로젝트
          </button>

          <button className="side-menu-item" type="button">
            <span>🪄</span>
            지원 현황
          </button>

          <button className="side-menu-item" type="button">
            <span>📌</span>
            북마크
          </button>

          <button className="side-menu-item" type="button">
            <span>🚪</span>
            로그아웃
          </button>
        </aside>

        <main className="projects-content">
          <section className="projects-hero">
            <h1>Projects</h1>
            <p>공모전이나 개인 프로젝트에 참여하세요</p>

            <button className="create-project-button" type="button">
              + 프로젝트 등록
            </button>

            <div className="filter-buttons">
              <button className="filter-button active" type="button">
                전체
              </button>
              <button className="filter-button" type="button">
                공모전
              </button>
              <button className="filter-button" type="button">
                개인 프로젝트
              </button>
              <button className="filter-button" type="button">
                개발자 모집
              </button>
              <button className="filter-button" type="button">
                디자이너 모집
              </button>
            </div>
          </section>

          <section className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-icon">🏷️</div>

                <h2>{project.title}</h2>
                <p>{project.description}</p>

                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Project;