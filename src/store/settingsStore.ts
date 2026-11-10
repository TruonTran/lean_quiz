import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  breakReminder: boolean;
  setBreakReminder: (on: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      breakReminder: true,
      setBreakReminder: (on) => set({ breakReminder: on }),
    }),
    { name: "settings-store" },
  ),
);
