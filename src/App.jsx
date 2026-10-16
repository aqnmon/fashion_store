import { Routes, Route,Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import { useTheme } from "./context/ThemeContext";
import "./App.css";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrdersPage from "./pages/ProfilePage/OrdersPage";
import SettingsPage from "./pages/ProfilePage/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "app app--dark" : "app"}>
<Routes>
  <Route element={<MainLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/catalog" element={<CatalogPage />} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/checkout"
      element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="orders" replace />} /> 
      <Route path="orders" element={<OrdersPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
    </div>
  );
}

export default App;