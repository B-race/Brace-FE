import { useState } from "react";
import "./AuthPage.css";

const skills = [
    { icon: "⚛️", title: "React", sub: "Frontend" },
    { icon: "▲", title: "Next.js", sub: "Frontend" },
    { icon: "🟨", title: "JavaScript", sub: "Language" },
    { icon: "🔷", title: "TypeScript", sub: "Language" },
    { icon: "🐍", title: "Python", sub: "Language" },
    { icon: "☕", title: "Java", sub: "Language" },
    { icon: "🟩", title: "Node.js", sub: "Backend" },
    { icon: "🎨", title: "Figma", sub: "Design" },
    { icon: "🗄️", title: "MySQL", sub: "Database" },
    { icon: "☁️", title: "AWS", sub: "Cloud" },
];

const MAX_SKILLS = 5;

function AuthTag() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const toggleSkill = (skill: string) => {
        const isSelected = selectedSkills.includes(skill);

        if (isSelected) {
            setSelectedSkills((previous) =>
                previous.filter((selectedSkill) => selectedSkill !== skill),
            );
            return;
        }

        if (selectedSkills.length >= MAX_SKILLS) {
            alert(`기술 태그는 최대 ${MAX_SKILLS}개까지 선택할 수 있어요.`);
            return;
        }

        setSelectedSkills((previous) => [...previous, skill]);
    };

    return (
        <div className="auth-page">
            <header className="auth-header">
                <div className="auth-brand">
                    <span className="auth-brand-circle" />
                    <span>Brace</span>
                </div>
            </header>

            <main>
                <section className="profile-intro">
                    <h2>프로필 설정 (3/4)</h2>
                    <p>내가 사용할 수 있는 기술을 선택해 주세요.</p>

                    <div className="profile-steps">
                        <button type="button">1/4</button>
                        <button type="button">2/4</button>
                        <button className="active" type="button">
                            3/4
                        </button>
                        <button type="button">4/4</button>
                    </div>
                </section>

                <section className="profile-choice-section">
                    <div className="profile-section-heading">
                        <h2>기술 태그</h2>
                        <p>
                            최대 {MAX_SKILLS}개 선택 · {selectedSkills.length}/{MAX_SKILLS}
                        </p>
                    </div>

                    <div className="profile-choice-grid profile-tag-grid">
                        {skills.map((skill) => {
                            const isSelected = selectedSkills.includes(skill.title);

                            return (
                                <button
                                    className={`profile-choice-card ${isSelected ? "selected" : ""
                                        }`}
                                    type="button"
                                    key={skill.title}
                                    onClick={() => toggleSkill(skill.title)}
                                >
                                    <span className="profile-choice-icon">{skill.icon}</span>
                                    <strong>{skill.title}</strong>
                                    <small>{skill.sub}</small>
                                </button>
                            );
                        })}
                    </div>

                    <div className="profile-next-area">
                        <button className="profile-later-button" type="button">
                            이전
                        </button>

                        <button
                            className="auth-dark-button"
                            type="button"
                            disabled={selectedSkills.length === 0}
                        >
                            다음
                        </button>
                    </div>
                </section>
            </main>

            <footer className="auth-footer">
                <span>© Brace</span>
                <span>이용약관</span>
                <span>개인정보 처리방침</span>
            </footer>
        </div>
    );
}

export default AuthTag;