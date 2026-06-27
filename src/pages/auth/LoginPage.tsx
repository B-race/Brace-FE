import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/authPage.css";
import { ROUTES } from "../../shared/constants/routes";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      window.alert("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    window.alert("로그인 기능은 백엔드 API 연결 후 완성됩니다.");
  };

  const handleGoogleLogin = () => {
    window.alert("Google 로그인은 OAuth 설정 후 연결됩니다.");
  };

  const handleKakaoLogin = () => {
    window.alert("Kakao 로그인은 OAuth 설정 후 연결됩니다.");
  };

  return (
    <div className="auth-page">
      <section className="auth-intro">
        <p className="auth-kicker">Brace Login</p>
        <h1>로그인</h1>
        <p>아이디어를 공유하고, 함께할 팀을 찾아보세요.</p>
      </section>

      <section className="auth-form-section auth-login-section">
        <div className="auth-section-copy">
          <h2>다시 만나서 반가워요</h2>
          <p>
            로그인하고 관심 있는 프로젝트를 둘러보거나 새로운 팀원을 찾아보세요.
          </p>
        </div>

        <form
          className="auth-login-form"
          onSubmit={handleLogin}
        >
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

          <button
            className="auth-dark-button"
            type="submit"
          >
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
              onClick={() => navigate(ROUTES.SIGNUP)}
            >
              회원가입
            </button>
          </p>
        </form>
      </section>
    </div>
  );
};
