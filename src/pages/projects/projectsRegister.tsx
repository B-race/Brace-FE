import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";
import "../../styles/projectsRegister.css";

const steps = [
  { id: 1, label: "활동 유형" },
  { id: 2, label: "기본 정보" },
  { id: 3, label: "모집 역할" },
  { id: 4, label: "세부 설정" },
];

const ProjectsRegister: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* GNB */}
      <header className="gnb">
        <div className="gnb__logo">
          <div className="gnb__logo-icon" />
          <span className="gnb__logo-text">Brace</span>
        </div>
        <nav className="gnb__nav">
          <a href="#" className="gnb__nav-link">모집하기</a>
          <a href="#" className="gnb__nav-link">마이페이지</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="card">
          <h1 className="card__title">프로젝트 등록</h1>
          <p className="card__subtitle">아이디어의 팀원을 모집할 내용을 단계별로 입력해 주세요.</p>

          {/* Action Buttons */}
          <div className="card__actions">
            <button className="btn btn--outline">도움말</button>
            <button
              className="btn btn--primary"
              onClick={() => navigate(ROUTES.PROJECT_NEW)}
            >
              저장하기
            </button>
          </div>

          {/* Stepper */}
          <div className="stepper">
            {steps.map((step) => (
              <button
                key={step.id}
                className={`stepper__step ${currentStep === step.id ? "stepper__step--active" : ""}`}
                onClick={() => {
                  setCurrentStep(step.id);
                  navigate(ROUTES.PROJECT_NEW);
                }}
              >
                <span className="stepper__step-number">{step.id}</span>
                <span className="stepper__step-label">{step.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__copy">© Brace</span>
          <nav className="footer__nav">
            <a href="#" className="footer__nav-link">문의</a>
            <a href="#" className="footer__nav-link">이용 약관</a>
            <a href="#" className="footer__nav-link">개인정보 처리방침</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsRegister;