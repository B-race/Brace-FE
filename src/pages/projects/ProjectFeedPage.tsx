import { MyPageLayout } from "../../features/profile/components/MyPageLayout";
import "../../styles/projectFeed.css";

const filters = [
  "전체",
  "공모전",
  "개인 프로젝트",
  "개발자 모집",
  "디자이너 모집",
];

const projects = [
  {
    type: "공모전",
    title: "사회문제 해결 앱",
    description: "설문 기반 매칭으로 취약계층 지원을 연결합니다.",
    tags: ["사회문제", "앱개발"],
  },
  {
    type: "개인 프로젝트",
    title: "일정 자동화 도구",
    description: "캘린더를 분석해 추천 일정과 알림을 제공합니다.",
    tags: ["생산성", "웹앱"],
  },
  {
    type: "공모전",
    title: "공공데이터 시각화",
    description: "열린 데이터를 통해 정책 변화를 한눈에 보여줍니다.",
    tags: ["데이터", "시각화"],
  },
  {
    type: "개인 프로젝트",
    title: "커뮤니티 채팅 리뉴얼",
    description: "검색, 태그, 읽음 상태를 개선해 사용성을 높입니다.",
    tags: ["UX", "채팅"],
  },
  {
    type: "공모전",
    title: "환경 챌린지 플랫폼",
    description: "참여형 미션으로 행동 변화를 유도하고 기록합니다.",
    tags: ["환경", "커뮤니티"],
  },
  {
    type: "개인 프로젝트",
    title: "접근성 체크리스트",
    description: "웹 접근성 항목을 점검하고 개선 가이드를 제공합니다.",
    tags: ["디자인", "접근성"],
  },
];

export const ProjectFeedPage = () => {
  return (
    <MyPageLayout>
      <section className="project-feed-content">
        <header className="project-feed-hero">
          <h1>Projects</h1>
          <p>공모전이나 개인 프로젝트에 참여하세요</p>

          <button
            className="project-feed-sort"
            type="button"
          >
            최신순
          </button>

          <div
            className="project-feed-filters"
            aria-label="프로젝트 필터"
          >
            {filters.map((filter) => (
              <button
                className={filter === "전체" ? "active" : ""}
                type="button"
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="project-feed-grid">
          {projects.map((project) => (
            <article
              className="project-feed-card"
              key={`${project.type}-${project.title}`}
            >
              <div className="project-feed-card-icon">
                <span />
              </div>
              <h2>
                [{project.type}] {project.title}
              </h2>
              <p>{project.description}</p>
              <div>
                {project.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </MyPageLayout>
  );
};
