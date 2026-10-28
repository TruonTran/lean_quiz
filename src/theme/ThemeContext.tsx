import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { examThemes, type ExamTheme, type ThemeMode } from "./theme";

const STORAGE_KEY = "exam-theme";

type Ctx = { mode: ThemeMode; theme: ExamTheme; toggle: () => void };
const ExamThemeContext = createContext<Ctx | null>(null);

function readInitialMode(): ThemeMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ExamThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(readInitialMode);

  const toggle = useCallback(() => {
    setMode((m) => {
      const next = m === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ mode, theme: examThemes[mode], toggle }),
    [mode, toggle],
  );

  return (
    <ExamThemeContext.Provider value={value}>
      {children}
    </ExamThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useExamTheme() {
  const ctx = useContext(ExamThemeContext);
  if (!ctx) throw new Error("useExamTheme must be used inside ExamThemeProvider");
  return ctx;
}
