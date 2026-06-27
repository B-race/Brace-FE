import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthAsk() {
    const navigate = useNavigate();

    return (
        <div className="auth-page auth-ask-page">
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

            <main className="auth-ask-main">
                <section className="auth-ask-content">
                    <h1>로그인 / 회원가입</h1>
                    <p>아이디어를 공유하고 팀을 모집해요.</p>

                    <div className="auth-ask-buttons">
                        <button
                            className="auth-ask-button"
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            로그인
                        </button>

                        <button
                            className="auth-ask-button"
                            type="button"
                            onClick={() => navigate("/signup")}
                        >
                            회원가입
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

export default AuthAsk;