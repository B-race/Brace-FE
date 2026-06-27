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
    <div className="pr-wrap">
      <div className="pr-card">
        <h1 className="pr-card__title">프로젝트 등록</h1>
        <p className="pr-card__subtitle">페이지에서 이탈할 시 진행상황이 초기화됩니다.</p>

        {/* 스텝퍼 */}
        <div className="pr-stepper">
          {steps.map((step) => (
            <button
              key={step.id}
              className={`pr-stepper__step ${currentStep === step.id ? "pr-stepper__step--active" : ""}`}
              onClick={() => {
                setCurrentStep(step.id);
                navigate(ROUTES.PROJECT_NEW);
              }}
            >
              <span className="pr-stepper__number">{step.id}</span>
              <span className="pr-stepper__label">{step.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsRegister;