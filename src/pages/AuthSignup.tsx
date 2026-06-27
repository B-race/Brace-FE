import { useState } from "react";
import type { SyntheticEvent } from "react";
import "./AuthPage.css";

function AuthSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSignup = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || !email || !password || !passwordCheck) {
            alert("모든 항목을 입력해 주세요.");
            return;
        }

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!agreeTerms) {
            alert("이용약관 동의가 필요합니다.");
            return;
        }

        alert("회원가입 기능은 백엔드 API 연결 후 완성됩니다.");
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
                <section className="auth-intro">
                    <h1>회원가입</h1>
                    <p>Brace에서 함께할 팀과 프로젝트를 찾아보세요.</p>
                </section>

                <section className="auth-form-section auth-signup-section">
                    <div className="auth-section-copy">
                        <h2>새 계정 만들기</h2>
                        <p>
                            기본 정보를 입력하면
                            <br />
                            프로필 설정을 이어서 진행할 수 있어요.
                        </p>
                    </div>

                    <form className="auth-signup-form" onSubmit={handleSignup}>
                        <label>
                            이름
                            <input
                                type="text"
                                placeholder="이름 입력"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </label>

                        <label>
                            이메일
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>

                        <label>
                            비밀번호
                            <input
                                type="password"
                                placeholder="8자 이상 입력"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </label>

                        <label>
                            비밀번호 확인
                            <input
                                type="password"
                                placeholder="비밀번호를 다시 입력"
                                value={passwordCheck}
                                onChange={(event) => setPasswordCheck(event.target.value)}
                            />
                        </label>

                        <label className="auth-check-label">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(event) => setAgreeTerms(event.target.checked)}
                            />
                            <span>이용약관 및 개인정보 처리방침에 동의합니다.</span>
                        </label>

                        <button className="auth-dark-button" type="submit">
                            회원가입
                        </button>

                        <p className="auth-bottom-message">
                            이미 계정이 있나요?{" "}
                            <button className="auth-text-button" type="button">
                                로그인
                            </button>
                        </p>
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

export default AuthSignup;