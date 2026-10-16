import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container maxWidth="1200px">
      <div className="profile">
        <div className="profile__header">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="profile__avatar"
          />
          <div>
            <h1 className="profile__name">{user.name}</h1>
            <p className="profile__role">{user.role}</p>
            <p className="profile__email">{user.email}</p>
          </div>
          <button className="profile__logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>

        <nav className="profile__nav">
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? "profile__link profile__link--active" : "profile__link"
            }
          >
            Заказы
          </NavLink>
          <NavLink
            to="/profile/settings"
            className={({ isActive }) =>
              isActive ? "profile__link profile__link--active" : "profile__link"
            }
          >
            Настройки
          </NavLink>
        </nav>

        <div className="profile__content">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

export default ProfilePage;