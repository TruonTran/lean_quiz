import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WeatherMode } from "../weather/modes";

interface SettingsState {
  breakReminder: boolean;
  setBreakReminder: (on: boolean) => void;
  /** Câu hỏi bất ngờ khi đang làm quiz. Mặc định bật. */
  popQuiz: boolean;
  setPopQuiz: (on: boolean) => void;
  /** Hiệu ứng thời tiết: auto = thỉnh thoảng tự xuất hiện, off = tắt, hoặc một kiểu cố định. */
  weatherMode: WeatherMode;
  setWeatherMode: (mode: WeatherMode) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      breakReminder: true,
      setBreakReminder: (on) => set({ breakReminder: on }),
      popQuiz: true,
      setPopQuiz: (on) => set({ popQuiz: on }),
      weatherMode: "auto",
      setWeatherMode: (mode) => set({ weatherMode: mode }),
    }),
    { name: "settings-store" },
  ),
);
