import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <Container maxWidth="1200px">
      <div className="not-found">
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__title">Страница не найдена</h2>
        <p className="not-found__text">
          К сожалению, такой страницы не существует или она была удалена.
        </p>
        <Link to="/" className="not-found__link">
          На главную
        </Link>
      </div>
    </Container>
  );
}

export default NotFoundPage;