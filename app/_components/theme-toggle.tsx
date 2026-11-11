"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

    const syncTheme = () => {
      const currentTheme = root.dataset.theme === "light" ? "light" : "dark";
      setTheme(currentTheme);
    };

    syncTheme();

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!window.localStorage.getItem("supplyflow-theme")) {
        root.dataset.theme = event.matches ? "light" : "dark";
        syncTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("supplyflow-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
      <span className="theme-toggle-label">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
