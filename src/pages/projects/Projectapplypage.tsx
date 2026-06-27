import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProjectDetailPath } from "../../shared/constants/routes";
import "../../styles/projectDetail.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RecruitmentRole {
  roleId: number;
  roleName: string;
  recruitCount: number;
  currentCount: number;
}

export const ProjectApplyPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<RecruitmentRole[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 프로젝트의 모집 역할 목록 불러오기
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `${API_BASE_URL}/api/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const data = await response.json();
        if (data.isSuccess) {
          setRoles(data.result.recruitmentStatus ?? []);
          if (data.result.recruitmentStatus?.length > 0) {
            setSelectedRole(data.result.recruitmentStatus[0].roleName);
          }
        }
      } catch {
        window.alert("역할 정보를 불러오지 못했습니다.");
      }
    };
    fetchRoles();
  }, [projectId]);

  const handleCancel = () =>
    navigate(createProjectDetailPath(projectId ?? "1"));

  const handleSubmit = async () => {
    if (!selectedRole) {
      window.alert("지원할 역할을 선택해 주세요.");
      return;
    }
    if (!message.trim()) {
      window.alert("지원 메시지를 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${API_BASE_URL}/projects/${projectId}/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ role: selectedRole, message }),
        },
      );

      const data = await response.json();

      if (!data.isSuccess) {
        window.alert(data.message || "지원에 실패했습니다.");
        return;
      }

      window.alert("지원이 완료되었습니다!");
      navigate(createProjectDetailPath(projectId ?? "1"));
    } catch {
      window.alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pa-page">
      <div className="pa-header">
        <h1 className="pa-header__title">프로젝트 지원하기</h1>
        <p className="pa-header__subtitle">자신을 어필하세요</p>
      </div>

      <div className="pa-body">
        <div className="pa-left">
          <h2 className="pa-left__title">지원하기</h2>
          <p className="pa-left__desc">
            지원할 역할을 선택하고 메시지를 작성해 주세요.
          </p>
          <div className="pa-left__tags">
            {roles.map((r) => (
              <button
                key={r.roleId}
                className={`pa-role-tag ${selectedRole === r.roleName ? "pa-role-tag--active" : ""}`}
                disabled={r.currentCount >= r.recruitCount}
                onClick={() => setSelectedRole(r.roleName)}
              >
                {r.roleName} {r.currentCount >= r.recruitCount ? "(마감)" : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="pa-right">
          <div className="pa-field">
            <label className="pa-field__label">지원할 역할</label>
            <input
              className="pa-input"
              readOnly
              value={selectedRole || "역할을 선택해 주세요"}
            />
          </div>

          <div className="pa-field">
            <label className="pa-field__label">지원 메시지</label>
            <textarea
              className="pa-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 300))}
              placeholder="자기소개와 지원 동기를 작성해주세요"
            />
            <span className="pa-field__hint">{message.length}/300</span>
          </div>
        </div>
      </div>

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
          disabled={isLoading}
        >
          {isLoading ? "제출 중..." : "지원 제출하기"}
        </button>
      </div>

      <p className="pa-notice">제출 후 수정이 불가합니다</p>
    </div>
  );
};
