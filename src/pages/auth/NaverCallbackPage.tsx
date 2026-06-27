import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const NaverCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const savedState = sessionStorage.getItem("naver_oauth_state");

    if (!code || !state) {
      window.alert("네이버 로그인에 실패했습니다.");
      navigate(ROUTES.LOGIN);
      return;
    }

    if (state !== savedState) {
      window.alert("잘못된 접근입니다.");
      navigate(ROUTES.LOGIN);
      return;
    }

    sessionStorage.removeItem("naver_oauth_state");

    const login = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/naver/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, state }),
        });

        const data = await response.json();

        if (!data.isSuccess) {
          window.alert(data.message || "네이버 로그인에 실패했습니다.");
          navigate(ROUTES.LOGIN);
          return;
        }

        const { accessToken, refreshToken, profileCompleted } = data.result;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate(profileCompleted ? ROUTES.PROJECTS : ROUTES.PROFILE_SETUP);
      } catch {
        window.alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        navigate(ROUTES.LOGIN);
      }
    };

    login();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>네이버 로그인 처리 중...</p>
    </div>
  );
};
