import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../../styles/authPage.css";
import { ROUTES } from "../../shared/constants/routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID as string;
const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI as string;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const handleAuthSuccess = (result: {
    accessToken: string;
    refreshToken: string;
    profileCompleted: boolean;
  }) => {
    saveTokens(result.accessToken, result.refreshToken);
    navigate(result.profileCompleted ? ROUTES.PROJECTS : ROUTES.PROFILE_SETUP);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      window.alert("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.isSuccess) {
        window.alert(data.message || "로그인에 실패했습니다.");
        return;
      }

      handleAuthSuccess(data.result);
    } catch {
      window.alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      window.alert("Google 인증에 실패했습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (!data.isSuccess) {
        window.alert(data.message || "Google 로그인에 실패했습니다.");
        return;
      }

      handleAuthSuccess(data.result);
    } catch {
      window.alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNaverLogin = () => {
    const state = crypto.randomUUID(); // CSRF 방지용 랜덤 값
    sessionStorage.setItem("naver_oauth_state", state);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: NAVER_CLIENT_ID,
      redirect_uri: NAVER_REDIRECT_URI,
      state,
    });

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
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
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button
            className="auth-dark-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>

          <div className="auth-divider">
            <span />
            또는
            <span />
          </div>

          <div className="auth-social-login-buttons">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => window.alert("Google 로그인에 실패했습니다.")}
              text="continue_with"
              shape="rectangular"
              width="100%"
            />

            <button
              className="auth-social-button naver-login-button"
              type="button"
              onClick={handleNaverLogin}
            >
              Naver로 계속하기
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
