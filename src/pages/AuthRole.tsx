import { useState } from "react";
import "./AuthPage.css";

const roles = [
    { icon: "🛠️", title: "개발자", sub: "프론트/백엔드" },
    { icon: "🎨", title: "디자이너", sub: "UI/UX" },
    { icon: "🧠", title: "기획자", sub: "전략/콘텐츠" },
    { icon: "📣", title: "마케터", sub: "성장/홍보" },
    { icon: "➕", title: "기타", sub: "기타 역할" },
];

function AuthRole() {
    const [selectedRole, setSelectedRole] = useState("");

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
                    <h2>프로필 설정 (2/4)</h2>
                    <p>팀에서 맡고 싶은 역할을 선택해 주세요.</p>

                    <div className="profile-steps">
                        <button type="button">1/4</button>
                        <button className="active" type="button">
                            2/4
                        </button>
                        <button type="button">3/4</button>
                        <button type="button">4/4</button>
                    </div>
                </section>

                <section className="profile-choice-section">
                    <div className="profile-section-heading">
                        <h2>나의 역할</h2>
                        <p>한 가지를 선택해 주세요.</p>
                    </div>

                    <div className="profile-choice-grid">
                        {roles.map((role) => (
                            <button
                                className={`profile-choice-card ${selectedRole === role.title ? "selected" : ""
                                    }`}
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
                        <button className="profile-later-button" type="button">
                            이전
                        </button>

                        <button
                            className="auth-dark-button"
                            type="button"
                            disabled={!selectedRole}
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

export default AuthRole;