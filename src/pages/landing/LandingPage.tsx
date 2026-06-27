import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";

export const LandingPage = () => (
  <section className="placeholder-page">
    <p className="placeholder-kicker">Brace</p>
    <h1>아이디어와 사람을 하나로 묶는 팀빌딩 플랫폼</h1>
    <p>공모전과 사이드 프로젝트를 함께할 팀원을 찾아보세요.</p>
    <div className="placeholder-actions">
      <Link
        className="primary-link"
        to={ROUTES.PROJECTS}
      >
        프로젝트 둘러보기
      </Link>
      <Link
        className="secondary-link"
        to={ROUTES.LOGIN}
      >
        로그인
      </Link>
    </div>
  </section>
);
