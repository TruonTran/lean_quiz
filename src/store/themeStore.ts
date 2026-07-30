import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

function getSystemPreference(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyThemeToDocument(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => {
      const initial = getSystemPreference();

      // Sync initial theme to <html> immediately so CSS vars / colors match
      // before any component mounts (prevents FOUC / mismatched colors).
      applyThemeToDocument(initial);

      return {
        theme: initial,

        setTheme: (theme) => {
          applyThemeToDocument(theme);
          set({ theme });
        },

        toggleTheme: () => {
          const next: Theme = get().theme === "dark" ? "light" : "dark";
          applyThemeToDocument(next);
          set({ theme: next });
        },
      };
    },
    {
      name: "quiz-theme",
      onRehydrateStorage: () => (state) => {
        // Ensure <html> matches rehydrated state (runs after persist rehydrates).
        if (state) applyThemeToDocument(state.theme);
      },
    },
  ),
);
