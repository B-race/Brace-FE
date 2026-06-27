import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import applyTeam from "../../assets/images/applyteam.png";
import findTeam from "../../assets/images/findteam.png";
import makeTeam from "../../assets/images/maketeam.png";
import "../../styles/mainPage.css";
import { ROUTES } from "../../shared/constants/routes";

const features = [
  {
    icon: "💡",
    title: "아이디어 등록",
    description: "주제, 목표, 기간을 입력해 프로젝트를 공유하세요.",
  },
  {
    icon: "🧑‍🤝‍🧑",
    title: "팀원 탐색",
    description: "역할, 기술, 관심 분야를 기준으로 팀원을 찾을 수 있어요.",
  },
  {
    icon: "🤝",
    title: "팀 결성",
    description: "지원과 수락 절차로 빠르게 팀을 구성하세요.",
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

const MainBanner = () => {
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
};

export const LandingPage = () => {
  return (
    <div className="main-page">
      <section className="main-hero">
        <p className="main-kicker">Brace Value</p>
        <h1>아이디어와 팀을 연결하다</h1>
        <p>
          공모전부터 개인 프로젝트까지, 아이디어를 공유하고 팀원을 모집해 함께
          완성하세요.
        </p>

        <div className="main-hero-buttons">
          <Link
            className="main-button main-button-outline"
            to={ROUTES.PROJECTS}
          >
            둘러보기
          </Link>
          <Link
            className="main-button main-button-dark"
            to={ROUTES.LOGIN}
          >
            시작하기
          </Link>
        </div>
      </section>

      <section className="main-feature-section">
        <div className="main-section-title">
          <h2>핵심 기능</h2>
          <p>Brace에서 아이디어를 등록하고 팀을 찾아 결성하세요.</p>
        </div>

        <div className="main-feature-list">
          {features.map((feature) => (
            <article
              className="main-feature-card"
              key={feature.title}
            >
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
    </div>
  );
};
