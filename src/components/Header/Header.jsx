import { NavLink, Link } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import UserProfile from "../UserProfile/UserProfile";
import { HeartIcon, MoonIcon, SunIcon, CartIcon } from "../Icons/Icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header({ navItems, favoritesCount, cartCount, isMobile, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const isDark = theme === "dark";

  return (
    <header className="header">
      <Container className="header__inner">
        <Logo src="/Logo.png" alt="Fashion Store" width={56} height={56} />

        {!isMobile && <Navigation navItems={navItems} />}

        <div className="header__right">
          <Link to="/favorites" className="header__favorites">
            <HeartIcon size={14} filled />
            <span>{favoritesCount}</span>
          </Link>

          <Link to="/cart" className="header__cart">
            <CartIcon size={16} />
            <span>{cartCount}</span>
          </Link>

          <button
            className="header__theme-btn"
            onClick={toggleTheme}
            aria-label="Switch theme"
          >
            {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="header__user">
              <Link to="/profile" className="header__profile-link">
                <UserProfile user={user} />
              </Link>
              <button className="header__logout-btn" onClick={onLogout}>
                Выйти
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="header__login-btn">
              Войти
            </NavLink>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;