import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import type { MyProfile, Skill } from "../types/profile";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type EditableProfileField =
  | "name"
  | "role"
  | "introduction"
  | "githubUrl"
  | "notionUrl"
  | "extraUrl";

interface ProfileEditFormProps {
  profile: MyProfile;
}

export const ProfileEditForm = ({ profile }: ProfileEditFormProps) => {
  const [form, setForm] = useState(profile);
  const [savedMessage, setSavedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: EditableProfileField, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setSavedMessage("");
  };

  const updateSkills = (value: string) => {
    const newSkills: Skill[] = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5)
      .map((tag, index) => ({
        skillId: index,
        skillTag: tag.toUpperCase().replace(/[^A-Z0-9]/g, "_"),
      }));

    setForm((currentForm) => ({ ...currentForm, skills: newSkills }));
    setSavedMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: form.name,
          introduction: form.introduction,
          role: form.role,
          skillTags: form.skills.map((s) => s.skillTag),
          githubUrl: form.githubUrl,
          notionUrl: form.notionUrl,
          extraUrl: form.extraUrl,
        }),
      });

      const data = await response.json();

      if (!data.isSuccess) {
        setSavedMessage(data.message || "저장에 실패했습니다.");
        return;
      }

      setSavedMessage("프로필이 저장됐어요.");
    } catch {
      setSavedMessage("서버 연결에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="profile-edit-page">
      <form
        className="profile-edit-form"
        onSubmit={handleSubmit}
      >
        <label>
          <span>프로필 사진</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,.pdf"
          />
          <small>최대 10MB · PDF, PNG, JPG 지원</small>
        </label>
        <label>
          <span>이름</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </label>
        <label>
          <span>한 줄 소개</span>
          <input
            value={form.introduction}
            onChange={(event) =>
              updateField("introduction", event.target.value)
            }
          />
        </label>
        <label>
          <span>나의 역할</span>
          <input
            value={form.role}
            placeholder="예: 개발자, 디자이너, 기획자"
            onChange={(event) => updateField("role", event.target.value)}
          />
          <small>예: 개발자 / 디자이너 / 기획자 / 마케터 / 기타</small>
        </label>
        <label>
          <span>기술 태그 (최대 5개)</span>
          <input
            value={form.skills.map((s) => s.skillTag).join(", ")}
            placeholder="태그 검색 후 추가"
            onChange={(event) => updateSkills(event.target.value)}
          />
          <small>쉼표로 구분해서 입력하세요.</small>
        </label>
        <label>
          <span>GitHub</span>
          <input
            value={form.githubUrl}
            placeholder="https://github.com/username"
            onChange={(event) => updateField("githubUrl", event.target.value)}
          />
        </label>
        <label>
          <span>Behance / Notion</span>
          <input
            value={form.notionUrl}
            placeholder="https://"
            onChange={(event) => updateField("notionUrl", event.target.value)}
          />
        </label>
        <label>
          <span>+ 기타 링크 추가</span>
          <input
            value={form.extraUrl}
            onChange={(event) => updateField("extraUrl", event.target.value)}
          />
        </label>

        {savedMessage && <p className="profile-save-message">{savedMessage}</p>}

        <div className="profile-edit-actions">
          <Link
            className="profile-cancel-button"
            to={ROUTES.MYPAGE}
          >
            취소
          </Link>
          <button
            className="profile-save-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </form>
    </section>
  );
};
