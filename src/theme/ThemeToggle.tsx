import { useExamTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { mode, theme, toggle } = useExamTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      title={mode === "dark" ? "Giao diện sáng" : "Giao diện tối"}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-yellow-300 ${theme.ghostBtn}`}
    >
      {mode === "dark" ? "☀️ Sáng" : "🌙 Tối"}
    </button>
  );
}
