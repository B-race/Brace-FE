import { useState } from "react";
import "./AuthPage.css";

const participationTypes = [
    {
        icon: "🏆",
        title: "공모전",
        sub: "해커톤, 공모전 등 대회 중심 프로젝트",
    },
    {
        icon: "🧩",
        title: "개인 프로젝트",
        sub: "아이디어를 발전시키는 자유 프로젝트",
    },
    {
        icon: "🔄",
        title: "둘 다",
        sub: "공모전과 개인 프로젝트 모두 참여",
    },
];

function AuthType() {
    const [selectedType, setSelectedType] = useState("");

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
                    <h2>프로필 설정 (4/4)</h2>
                    <p>관심 있는 프로젝트 참여 유형을 선택해 주세요.</p>

                    <div className="profile-steps">
                        <button type="button">1/4</button>
                        <button type="button">2/4</button>
                        <button type="button">3/4</button>
                        <button className="active" type="button">
                            4/4
                        </button>
                    </div>
                </section>

                <section className="profile-choice-section">
                    <div className="profile-section-heading">
                        <h2>참여 유형</h2>
                        <p>한 가지를 선택해 주세요.</p>
                    </div>

                    <div className="profile-choice-grid profile-participation-grid">
                        {participationTypes.map((item) => (
                            <button
                                className={`profile-choice-card ${selectedType === item.title ? "selected" : ""
                                    }`}
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
                        <button className="profile-later-button" type="button">
                            이전
                        </button>

                        <button
                            className="auth-dark-button"
                            type="button"
                            disabled={!selectedType}
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

export default AuthType;