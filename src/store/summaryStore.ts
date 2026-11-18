import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SummaryState {
  /** Hiện chấm đầu dòng ở các ý. Mặc định bật. */
  bullets: boolean;
  setBullets: (on: boolean) => void;
  /** Các ý người học tự đánh dấu (key = `${sectionId}:${hash nội dung}`). */
  marks: Record<string, true>;
  toggleMark: (key: string) => void;
  clearMarks: () => void;
  /** Chỉ hiện các ý đã đánh dấu. */
  onlyMarked: boolean;
  setOnlyMarked: (on: boolean) => void;
}

export const useSummaryStore = create<SummaryState>()(
  persist(
    (set) => ({
      bullets: true,
      setBullets: (on) => set({ bullets: on }),
      marks: {},
      toggleMark: (key) =>
        set((s) => {
          const marks = { ...s.marks };
          if (marks[key]) delete marks[key];
          else marks[key] = true;
          return { marks };
        }),
      clearMarks: () => set({ marks: {}, onlyMarked: false }),
      onlyMarked: false,
      setOnlyMarked: (on) => set({ onlyMarked: on }),
    }),
    { name: "summary-store" },
  ),
);
