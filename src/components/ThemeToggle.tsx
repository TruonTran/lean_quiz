import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isLight ? "Chuyển sang giao diện tối" : "Chuyển sang giao diện sáng"
      }
      title={
        isLight ? "Chuyển sang giao diện tối" : "Chuyển sang giao diện sáng"
      }
      className="theme-toggle-btn fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-yellow-400/25 bg-white/5 text-lg shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:right-6 sm:top-6"
    >
      {isLight ? (
        <span aria-hidden="true">🌙</span>
      ) : (
        <span aria-hidden="true">☀️</span>
      )}
    </button>
  );
}