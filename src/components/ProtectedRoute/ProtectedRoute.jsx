import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

 
  if (!isInitialized) {
    return <p style={{ textAlign: "center", padding: "80px 20px" }}>Загрузка...</p>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;