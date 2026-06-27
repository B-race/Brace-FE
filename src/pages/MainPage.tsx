import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import { useEffect, useState } from "react";
import applyTeam from "../assets/images/applyteam.png";
import makeTeam from "../assets/images/maketeam.png";
import findTeam from "../assets/images/findteam.png";

const features = [
  {
    icon: "💡",
    title: "아이디어 등록",
    description: "주제·목표·기간을 입력해 공개 또는 비공개로 공유",
  },
  {
    icon: "🧑‍🤝‍🧑",
    title: "팀원 탐색",
    description: "기술, 경험, 관심분야 기반으로 팀원을 매칭",
  },
  {
    icon: "🤝",
    title: "팀 결성",
    description: "지원과 합류 절차로 팀을 빠르게 구성",
  },
];

const bannerImages = [
  {
    src: applyTeam,
    alt: "프로젝트에 지원하고 팀과 함께 시작하는 화면",
  },
  {
    src: makeTeam,
    alt: "프로젝트를 등록하고 팀원을 모으는 화면",
  },
  {
    src: findTeam,
    alt: "태그로 원하는 팀을 빠르게 찾는 화면",
  },
];

function MainBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % bannerImages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="main-banner">
      <img
        src={bannerImages[currentIndex].src}
        alt={bannerImages[currentIndex].alt}
      />

      <div className="main-dots">
        {bannerImages.map((banner, index) => (
          <button
            key={banner.alt}
            type="button"
            className={`main-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${index + 1}번째 배너 보기`}
          />
        ))}
      </div>
    </div>
  );
}

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="main-page">
      <header className="main-header">
        <a className="main-brand" href="/">
          <span className="main-brand-circle" />
          <span>Brace</span>
        </a>

        <nav className="main-nav">
          <button type="button">로그인</button>
          <button type="button">회원가입</button>
        </nav>
      </header>

      <main>
        <section className="main-hero">
          <h1>아이디어와 팀을 연결하다</h1>

          <p>
            대학부터 개인 프로젝트까지, 아이디어를 공유하고 팀원을 모집해
            <br />
            함께 완성하세요.
          </p>

          <div className="main-hero-buttons">
            <button className="main-button main-button-outline" type="button" onClick={() => navigate("/projects")}>
              둘러보기
            </button>

            <button
              className="main-button main-button-dark"
              type="button"
              onClick={() => navigate("/auth")}
            >
              시작하기
            </button>
          </div>
        </section>

        <section className="main-feature-section">
          <div className="main-section-title">
            <h2>핵심 기능</h2>
            <p>Brace에서 아이디어를 등록하고 팀을 찾아 완성하세요.</p>
          </div>

          <div className="main-feature-list">
            {features.map((feature) => (
              <article className="main-feature-card" key={feature.title}>
                <div className="main-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="main-preview-section">
          <MainBanner />
        </section>
      </main>

      <footer className="main-footer">
        <span>{"{ Brace }"}</span>
        <span>© 2026 Brace. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default MainPage;