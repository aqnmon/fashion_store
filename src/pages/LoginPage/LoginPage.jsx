import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("Батыр Ақниет");
  const [email, setEmail] = useState("anny@mail.kz");
  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name,
      email,
      avatarUrl: "/profile.jpeg",
      role: "VIP-клиент",
    });

    navigate(from, { replace: true });
  };

  return (
    <Container maxWidth="1200px">
      <div className="login">
        <h1 className="login__title">Вход</h1>
        <p className="login__subtitle">Войдите, чтобы продолжить</p>

        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">
            Имя
            <input
              className="login__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="login__label">
            Email
            <input
              className="login__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <Button text="Войти" variant="primary" type="submit" />
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;