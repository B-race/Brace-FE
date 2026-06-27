import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";

export const NotFoundPage = () => (
  <section className="placeholder-page">
    <p className="placeholder-kicker">404</p>
    <h1>페이지를 찾을 수 없어요</h1>
    <p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p>
    <Link
      className="primary-link"
      to={ROUTES.HOME}
    >
      홈으로 돌아가기
    </Link>
  </section>
);
