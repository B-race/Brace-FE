import { useState } from "react";
import "./AuthPage.css";

function AuthInfo() {
    const [intro, setIntro] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");

    const handleComplete = () => {
        if (!intro.trim()) {
            alert("한 줄 소개를 입력해 주세요.");
            return;
        }

        alert("프로필 설정이 완료되었습니다.");
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
                    <h2>추가 정보</h2>
                    <p>마지막으로 자신을 간단히 소개해 주세요.</p>

                    <div className="profile-steps">
                        <button type="button">1/4</button>
                        <button type="button">2/4</button>
                        <button type="button">3/4</button>
                        <button className="active" type="button">
                            4/4
                        </button>
                    </div>
                </section>

                <section className="profile-basic-section">
                    <div className="auth-section-copy">
                        <h2>기본 정보</h2>
                        <p>
                            다른 팀원이 반을 더 잘 알 수 있도록
                            <br />
                            짧은 소개와 포트폴리오를 적어 주세요.
                        </p>
                    </div>

                    <form
                        className="profile-basic-form"
                        onSubmit={(event) => {
                            event.preventDefault();
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
                                    onChange={(event) => setIntro(event.target.value)}
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
                                onChange={(event) => setPortfolioUrl(event.target.value)}
                            />
                        </label>

                        <div className="profile-next-area">
                            <button className="profile-later-button" type="button">
                                이전
                            </button>

                            <button className="auth-dark-button" type="submit">
                                완료
                            </button>
                        </div>
                    </form>
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

export default AuthInfo;