import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/authPage.css";
import { ROUTES } from "../../shared/constants/routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const agreementContent = {
  terms: {
    title: "이용약관",
    sections: [
      {
        heading: "서비스 목적",
        body: "Brace는 공모전과 개인 프로젝트의 팀원 모집, 프로젝트 탐색, 지원 및 팀 결성을 돕는 협업 연결 서비스입니다.",
      },
      {
        heading: "회원 의무",
        body: "회원은 정확한 정보를 입력해야 하며, 허위 정보 등록, 타인 권리 침해, 부적절한 게시글 작성, 서비스 운영을 방해하는 행위를 해서는 안 됩니다.",
      },
      {
        heading: "게시 정보 책임",
        body: "프로젝트 소개, 모집 역할, 지원 메시지, 포트폴리오 등 회원이 작성한 정보에 대한 책임은 작성자에게 있습니다.",
      },
      {
        heading: "서비스 이용 제한",
        body: "Brace는 부적절한 프로젝트나 지원 내용, 타인에게 피해를 줄 수 있는 활동이 확인될 경우 게시글 노출 제한 또는 이용 제한 조치를 할 수 있습니다.",
      },
      {
        heading: "면책",
        body: "Brace는 팀 결성을 돕는 플랫폼이며, 실제 협업 결과, 외부 연락, 프로젝트 진행 과정에서 발생하는 모든 문제를 보증하지는 않습니다.",
      },
    ],
  },
  privacy: {
    title: "개인정보 처리방침",
    sections: [
      {
        heading: "수집 항목",
        body: "Brace는 회원가입 및 프로필 구성을 위해 이름, 이메일, 역할, 기술 태그, 참여 유형, 한 줄 소개, 포트폴리오 링크를 수집할 수 있습니다.",
      },
      {
        heading: "이용 목적",
        body: "수집된 정보는 회원 식별, 프로필 표시, 프로젝트 지원, 제안자와 지원자 간 매칭 및 서비스 이용 경험 개선을 위해 사용됩니다.",
      },
      {
        heading: "보관 기간",
        body: "개인정보는 회원 탈퇴 또는 수집 목적 달성 시까지 보관하며, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.",
      },
      {
        heading: "제3자 제공",
        body: "Brace는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 프로젝트 지원이 수락된 경우 팀 결성을 위해 필요한 연락 정보가 당사자 간 공개될 수 있습니다.",
      },
      {
        heading: "이용자 권리",
        body: "회원은 자신의 개인정보 조회, 수정, 삭제를 요청할 수 있으며, 서비스 내 프로필 수정 기능을 통해 일부 정보를 직접 변경할 수 있습니다.",
      },
    ],
  },
};

export const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreementModal, setAgreementModal] = useState<
    "terms" | "privacy" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeAgreement = agreementModal
    ? agreementContent[agreementModal]
    : null;

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !password || !passwordCheck) {
      window.alert("모든 항목을 입력해 주세요.");
      return;
    }

    if (password !== passwordCheck) {
      // handleSignup 안에서 password !== passwordCheck 체크 바로 아래에 추가

      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=-]{8,20}$/;
      if (!passwordRegex.test(password)) {
        window.alert(
          "비밀번호는 8~20자이며, 영문과 숫자를 모두 포함해야 합니다.",
        );
        return;
      }
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms) {
      window.alert("이용약관 동의가 필요합니다.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!data.isSuccess) {
        window.alert(data.message || "회원가입에 실패했습니다.");
        return;
      }

      const { accessToken, refreshToken } = data.result;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate(ROUTES.PROFILE_SETUP);
    } catch {
      window.alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-intro">
        <p className="auth-kicker">Brace Signup</p>
        <h1>회원가입</h1>
        <p>Brace에서 함께할 팀과 프로젝트를 찾아보세요.</p>
      </section>

      <section className="auth-form-section auth-signup-section">
        <div className="auth-section-copy">
          <h2>새 계정 만들기</h2>
          <p>기본 정보를 입력하면 프로필 설정을 이어서 진행할 수 있어요.</p>
        </div>

        <form
          className="auth-signup-form"
          onSubmit={handleSignup}
        >
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

          <div className="auth-check-row">
            <span>이용약관 및 개인정보 처리방침에 동의합니다.</span>
            <input
              type="checkbox"
              checked={agreeTerms}
              aria-label="이용약관 및 개인정보 처리방침 동의"
              onChange={(event) => setAgreeTerms(event.target.checked)}
            />
          </div>

          <div className="auth-agreement-links">
            <button
              type="button"
              onClick={() => setAgreementModal("terms")}
            >
              이용약관 보기
            </button>
            <button
              type="button"
              onClick={() => setAgreementModal("privacy")}
            >
              개인정보 처리방침 보기
            </button>
          </div>

          <button
            className="auth-dark-button"
            type="submit"
            disabled={!agreeTerms || isLoading}
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </button>

          <p className="auth-bottom-message">
            이미 계정이 있나요?{" "}
            <button
              className="auth-text-button"
              type="button"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              로그인
            </button>
          </p>
        </form>
      </section>

      {activeAgreement && (
        <div
          className="auth-agreement-backdrop"
          role="presentation"
          onClick={() => setAgreementModal(null)}
        >
          <section
            className="auth-agreement-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-agreement-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="auth-agreement-modal-header">
              <h2 id="auth-agreement-title">{activeAgreement.title}</h2>
              <button
                type="button"
                aria-label="약관 팝업 닫기"
                onClick={() => setAgreementModal(null)}
              >
                ×
              </button>
            </div>

            <div className="auth-agreement-modal-body">
              {activeAgreement.sections.map((section) => (
                <article key={section.heading}>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>

            <div className="auth-agreement-modal-footer">
              <button
                className="auth-dark-button"
                type="button"
                onClick={() => setAgreementModal(null)}
              >
                확인
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
