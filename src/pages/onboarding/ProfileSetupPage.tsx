import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/authPage.css";
import { ROUTES } from "../../shared/constants/routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const roles = [
  { icon: "💻", title: "개발자", sub: "프론트/백엔드" },
  { icon: "🎨", title: "디자이너", sub: "UI/UX" },
  { icon: "📋", title: "기획자", sub: "전략/콘텐츠" },
  { icon: "📣", title: "마케터", sub: "성장/홍보" },
  { icon: "✏️", title: "기타", sub: "기타 역할" },
];

const skillCategories = [
  {
    title: "언어",
    tags: [
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "Kotlin",
      "C++",
      "C#",
      "Go",
    ],
  },
  {
    title: "프론트엔드",
    tags: ["React", "Next.js", "Vue.js", "Angular", "HTML/CSS", "Tailwind CSS"],
  },
  {
    title: "백엔드",
    tags: [
      "Spring",
      "Spring Boot",
      "Django",
      "FastAPI",
      "Node.js",
      "Express",
      "NestJS",
      "Flask",
    ],
  },
  { title: "모바일", tags: ["Android", "iOS", "Flutter", "React Native"] },
  {
    title: "데이터베이스",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Neo4j"],
  },
  {
    title: "인프라",
    tags: ["AWS", "Docker", "Kubernetes", "Nginx", "Linux", "GitHub Actions"],
  },
  {
    title: "AI/데이터",
    tags: [
      "TensorFlow",
      "PyTorch",
      "Pandas",
      "Scikit-learn",
      "LangChain",
      "OpenAI API",
      "Upstage API",
    ],
  },
  {
    title: "디자인",
    tags: ["Figma", "Photoshop", "Illustrator", "Blender", "After Effects"],
  },
  {
    title: "기획/협업",
    tags: ["Notion", "Jira", "Confluence", "Miro", "Slack", "Discord"],
  },
  {
    title: "마케팅",
    tags: [
      "Google Analytics",
      "Google Ads",
      "Meta Ads",
      "SEO",
      "Mixpanel",
      "Mailchimp",
    ],
  },
];

const participationTypes = [
  {
    icon: "🏆",
    title: "공모전",
    value: "CONTEST",
    sub: "해커톤, 공모전 등 대회 중심 프로젝트",
  },
  {
    icon: "🧩",
    title: "개인 프로젝트",
    value: "PERSONAL",
    sub: "아이디어를 발전시키는 자유 프로젝트",
  },
  {
    icon: "🔄",
    title: "둘 다",
    value: "BOTH",
    sub: "공모전과 개인 프로젝트 모두 참여",
  },
];

// 스킬 태그명 → API enum 변환 (백엔드 skillTag enum에 맞게 조정 필요)
const skillToEnum = (skill: string): string =>
  skill.toUpperCase().replace(/[^A-Z0-9]/g, "_");

const MAX_SKILLS = 5;
const TOTAL_STEPS = 5;

export const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [activeSkillCategory, setActiveSkillCategory] = useState(
    skillCategories[0].title,
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const movePrevious = () => {
    if (step === 1) {
      navigate(ROUTES.SIGNUP);
      return;
    }
    setStep((currentStep) => currentStep - 1);
  };

  const moveNext = () =>
    setStep((currentStep) => Math.min(currentStep + 1, TOTAL_STEPS));

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills((previous) => previous.filter((s) => s !== skill));
      return;
    }
    if (selectedSkills.length >= MAX_SKILLS) {
      window.alert(`기술 태그는 최대 ${MAX_SKILLS}개까지 선택할 수 있어요.`);
      return;
    }
    setSelectedSkills((previous) => [...previous, skill]);
  };

  const handleComplete = async () => {
    if (!intro.trim()) {
      window.alert("한 줄 소개를 입력해 주세요.");
      return;
    }

    const participationType =
      participationTypes.find((t) => t.title === selectedType)?.value ??
      selectedType;

    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/users/me/onboarding`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          profileImg: previewUrl ?? "",
          role: selectedRole,
          skillTags: selectedSkills.map(skillToEnum),
          participationType,
          introduction: intro,
          portfolioUrl: portfolioUrl || "",
        }),
      });

      const data = await response.json();

      if (!data.isSuccess) {
        window.alert(data.message || "프로필 설정에 실패했습니다.");
        return;
      }

      window.alert("프로필 설정이 완료되었습니다.");
      navigate(ROUTES.PROJECTS);
    } catch {
      window.alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="profile-intro">
        <p className="auth-kicker">Brace Onboarding</p>
        <h1>
          프로필 설정 ({step}/{TOTAL_STEPS})
        </h1>
        <p>역할과 관심사를 입력해 참여 가능한 팀을 더 쉽게 찾아보세요.</p>
        <div className="profile-steps">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => {
            const stepNumber = index + 1;
            return (
              <button
                key={stepNumber}
                className={stepNumber === step ? "active" : ""}
                type="button"
                onClick={() => setStep(stepNumber)}
              >
                {stepNumber}/{TOTAL_STEPS}
              </button>
            );
          })}
        </div>
      </section>

      {step === 1 && (
        <section className="profile-image-section">
          <div className="profile-image-info">
            <button
              className="profile-avatar-button"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="프로필 이미지 업로드"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="선택한 프로필 미리보기"
                />
              ) : (
                <span>+</span>
              )}
            </button>
            <div>
              <h2>프로필 이미지</h2>
              <button
                className="profile-upload-button"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                사진 업로드
              </button>
              <p>사진은 나중에 마이페이지에서 변경할 수 있어요.</p>
            </div>
          </div>
          <div className="profile-next-area profile-side-actions">
            <button
              className="profile-later-button"
              type="button"
              onClick={movePrevious}
            >
              이전
            </button>
            <button
              className="auth-dark-button"
              type="button"
              onClick={moveNext}
            >
              다음
            </button>
          </div>
          <input
            ref={fileInputRef}
            className="profile-file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </section>
      )}

      {step === 2 && (
        <section className="profile-choice-section">
          <div className="profile-section-heading">
            <h2>나의 역할</h2>
            <p>팀에서 맡고 싶은 대표 역할을 선택해 주세요.</p>
          </div>
          <div className="profile-choice-grid">
            {roles.map((role) => (
              <button
                className={`profile-choice-card ${selectedRole === role.title ? "selected" : ""}`}
                type="button"
                key={role.title}
                onClick={() => setSelectedRole(role.title)}
              >
                <span className="profile-choice-icon">{role.icon}</span>
                <strong>{role.title}</strong>
                <small>{role.sub}</small>
              </button>
            ))}
          </div>
          <div className="profile-next-area">
            <button
              className="profile-later-button"
              type="button"
              onClick={movePrevious}
            >
              이전
            </button>
            <button
              className="auth-dark-button"
              type="button"
              disabled={!selectedRole}
              onClick={moveNext}
            >
              다음
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="profile-choice-section">
          <div className="profile-section-heading">
            <h2>기술 태그</h2>
            <p>
              최대 {MAX_SKILLS}개 선택 · {selectedSkills.length}/{MAX_SKILLS}
            </p>
          </div>
          <div className="profile-tag-picker">
            <div
              className="profile-tag-categories"
              aria-label="기술 태그 카테고리"
            >
              {skillCategories.map((category) => (
                <button
                  className={`profile-category-toggle ${activeSkillCategory === category.title ? "active" : ""}`}
                  type="button"
                  key={category.title}
                  onClick={() => setActiveSkillCategory(category.title)}
                >
                  {category.title}
                  <span>{category.tags.length}</span>
                </button>
              ))}
            </div>
            <div className="profile-tag-chip-panel">
              <div className="profile-tag-chip-heading">
                <strong>{activeSkillCategory}</strong>
                <span>관심 있는 태그를 선택해 주세요.</span>
              </div>
              <div className="profile-tag-chip-list">
                {skillCategories
                  .find((c) => c.title === activeSkillCategory)
                  ?.tags.map((tag) => (
                    <button
                      className={`profile-tag-chip ${selectedSkills.includes(tag) ? "selected" : ""}`}
                      type="button"
                      key={tag}
                      onClick={() => toggleSkill(tag)}
                    >
                      {tag}
                    </button>
                  ))}
              </div>
            </div>
            {selectedSkills.length > 0 && (
              <div className="profile-selected-tags">
                <strong>선택한 태그</strong>
                <div>
                  {selectedSkills.map((tag) => (
                    <button
                      className="profile-selected-tag"
                      type="button"
                      key={tag}
                      onClick={() => toggleSkill(tag)}
                    >
                      {tag} ×
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="profile-next-area">
            <button
              className="profile-later-button"
              type="button"
              onClick={movePrevious}
            >
              이전
            </button>
            <button
              className="auth-dark-button"
              type="button"
              disabled={selectedSkills.length === 0}
              onClick={moveNext}
            >
              다음
            </button>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="profile-choice-section">
          <div className="profile-section-heading">
            <h2>참여 유형</h2>
            <p>관심 있는 프로젝트 참여 유형을 선택해 주세요.</p>
          </div>
          <div className="profile-choice-grid profile-participation-grid">
            {participationTypes.map((item) => (
              <button
                className={`profile-choice-card ${selectedType === item.title ? "selected" : ""}`}
                type="button"
                key={item.title}
                onClick={() => setSelectedType(item.title)}
              >
                <span className="profile-choice-icon">{item.icon}</span>
                <strong>{item.title}</strong>
                <small>{item.sub}</small>
              </button>
            ))}
          </div>
          <div className="profile-next-area">
            <button
              className="profile-later-button"
              type="button"
              onClick={movePrevious}
            >
              이전
            </button>
            <button
              className="auth-dark-button"
              type="button"
              disabled={!selectedType}
              onClick={moveNext}
            >
              다음
            </button>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="profile-basic-section">
          <div className="auth-section-copy">
            <h2>기본 정보</h2>
            <p>
              다른 팀원이 나를 더 잘 알 수 있도록 짧은 소개와 포트폴리오를 적어
              주세요.
            </p>
          </div>
          <form
            className="profile-basic-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleComplete();
            }}
          >
            <div className="auth-field-group">
              <label>
                한 줄 소개
                <input
                  type="text"
                  placeholder="예: 사용자 경험을 좋아하는 프론트엔드 개발자입니다."
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  maxLength={80}
                />
              </label>
              <p className="auth-input-guide">{intro.length}/80</p>
            </div>
            <label>
              포트폴리오 링크 <span className="auth-optional">(선택)</span>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
              />
            </label>
            <div className="profile-next-area">
              <button
                className="profile-later-button"
                type="button"
                onClick={movePrevious}
              >
                이전
              </button>
              <button
                className="auth-dark-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "저장 중..." : "완료"}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};
