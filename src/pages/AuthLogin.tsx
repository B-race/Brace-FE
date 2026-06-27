import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 백엔드 로그인 API가 연결되기 전까지는 동작 확인용
        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해 주세요.");
            return;
        }

        alert("로그인 기능은 백엔드 API 연결 후 완성됩니다.");
    };

    const handleGoogleLogin = () => {
        alert("Google 로그인은 OAuth 설정 후 연결됩니다.");
    };

    const handleKakaoLogin = () => {
        alert("Kakao 로그인은 OAuth 설정 후 연결됩니다.");
    };

    return (
        <div className="auth-page">
            <header className="auth-header">
                <button
                    className="auth-brand auth-brand-button"
                    type="button"
                    onClick={() => navigate("/")}
                >
                    <span className="auth-brand-circle" />
                    <span>Brace</span>
                </button>
            </header>

            <main>
                <section className="auth-intro">
                    <h1>로그인</h1>
                    <p>아이디어를 공유하고, 함께할 팀을 찾아보세요.</p>
                </section>

                <section className="auth-form-section auth-login-section">
                    <div className="auth-section-copy">
                        <h2>다시 만나서 반가워요</h2>
                        <p>
                            로그인하고 관심 있는 프로젝트를 둘러보거나
                            <br />
                            새로운 팀원을 찾아보세요.
                        </p>
                    </div>

                    <form className="auth-login-form" onSubmit={handleLogin}>
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
                                placeholder="비밀번호 입력"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </label>

                        <button className="auth-dark-button" type="submit">
                            로그인
                        </button>

                        <div className="auth-divider">
                            <span />
                            또는
                            <span />
                        </div>

                        <div className="auth-social-login-buttons">
                            <button
                                className="auth-social-button google-login-button"
                                type="button"
                                onClick={handleGoogleLogin}
                            >
                                Google로 계속하기
                            </button>

                            <button
                                className="auth-social-button kakao-login-button"
                                type="button"
                                onClick={handleKakaoLogin}
                            >
                                Kakao로 계속하기
                            </button>
                        </div>

                        <p className="auth-bottom-message">
                            아직 계정이 없나요?{" "}
                            <button
                                className="auth-text-button"
                                type="button"
                                onClick={() => navigate("/auth/signup")}
                            >
                                회원가입
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

export default AuthLogin;