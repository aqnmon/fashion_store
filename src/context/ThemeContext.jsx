import { createContext, useContext, useState, useEffect } from "react";
import useSystemTheme from "../hooks/useSystemTheme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemTheme = useSystemTheme();

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return systemTheme === "dark" ? "dark" : "light";
  });

  const [userOverride, setUserOverride] = useState(() => {
    return localStorage.getItem("userOverride") === "true";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("userOverride", String(userOverride));
  }, [userOverride]);

  useEffect(() => {
    if (!userOverride) {
      setTheme(systemTheme === "dark" ? "dark" : "light");
    }
  }, [systemTheme, userOverride]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setUserOverride(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}