import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ReadingProgress from "../ReadingProgress/ReadingProgress";
import { useCart } from "../../context/CartContext";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./MainLayout.css";
const navItems = [
  { id: 1, label: "Домой", link: "/" },
  { id: 2, label: "Каталог", link: "/catalog" },
  { id: 5, label: "О нас", link: "/about" },
];
const socialLinks = [
  { platform: "Instagram", url: "https://instagram.com", icon: "" },
  { platform: "Facebook", url: "https://facebook.com", icon: "" },
];

function MainLayout() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const { totalCount } = useCart();
  const {  logout } = useAuth();
  const { favoritesCount } = useFavorites();

  return (
    <div className="layout">
      <ReadingProgress />

      <Header
        navItems={navItems}
        favoritesCount={favoritesCount}
        cartCount={totalCount}
        isMobile={isMobile}
        onLogout={logout}
      />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer
        copyrightText="©2026 AB Fashion Store"
        socialLinks={socialLinks}
      />
    </div>
  );
}

export default MainLayout;