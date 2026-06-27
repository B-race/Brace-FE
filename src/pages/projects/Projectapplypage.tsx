import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProjectDetailPath } from "../../shared/constants/routes";
import "../../styles/projectDetail.css";

const ROLES = ["백엔드", "프론트엔드", "기획/PM"];

export const ProjectApplyPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("백엔드");
  const [message, setMessage] = useState("");

  const handleCancel = () =>
    navigate(createProjectDetailPath(projectId ?? "1"));
  const handleSubmit = () =>
    navigate(createProjectDetailPath(projectId ?? "1"));

  return (
    <div className="pa-page">
      {/* 헤더 */}
      <div className="pa-header">
        <h1 className="pa-header__title">프로젝트 지원하기</h1>
        <p className="pa-header__subtitle">자신을 어필하세요</p>
      </div>

      {/* 바디 2단 */}
      <div className="pa-body">
        {/* 왼쪽 안내 */}
        <div className="pa-left">
          <h2 className="pa-left__title">지원하기</h2>
          <p className="pa-left__desc">
            프로젝트 상세 화면 위에 모달로 표시되는 지원 폼
          </p>
          <div className="pa-left__tags">
            {ROLES.map((r) => (
              <button
                key={r}
                className={`pa-role-tag ${role === r ? "pa-role-tag--active" : ""}`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽 폼 */}
        <div className="pa-right">
          <div className="pa-field">
            <label className="pa-field__label">첨부되는 내 프로필</label>
            <div className="pa-profile-box" />
            <span className="pa-field__hint">
              읽기 전용 박스: 아바타/이름/역할/기술 태그/포트폴리오 링크
            </span>
          </div>

          <div className="pa-field">
            <label className="pa-field__label">지원할 역할</label>
            <input
              className="pa-input"
              readOnly
              value={role || "모집 중인 역할만 선택 가능"}
            />
            <span className="pa-field__hint">
              선택 칩(라디오/단일 선택), 비활성 상태 없음
            </span>
          </div>

          <div className="pa-field">
            <label className="pa-field__label">지원 메시지</label>
            <textarea
              className="pa-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 300))}
              placeholder="자기소개와 지원 동기를 작성해주세요"
            />
            <span className="pa-field__hint">
              텍스트 영역 + {message.length}/300 카운터
            </span>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="pa-actions">
        <button
          className="pa-btn pa-btn--cancel"
          onClick={handleCancel}
        >
          취소하기
        </button>
        <button
          className="pa-btn pa-btn--submit"
          onClick={handleSubmit}
        >
          지원 제출하기
        </button>
      </div>

      <p className="pa-notice">제출 후 수정이 불가합니다</p>
    </div>
  );
};
