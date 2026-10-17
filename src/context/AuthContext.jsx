import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);


useEffect(() => {
  const timer = setTimeout(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to restore user:", error);
      localStorage.removeItem("user");
    } finally {
      setIsInitialized(true);
    }
  }, 300);

  return () => clearTimeout(timer);
}, []);

  
  useEffect(() => {
    if (!isInitialized) return;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, isInitialized]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInitialized,         
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}