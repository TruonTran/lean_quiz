import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EssayDraft {
  subjectId: string;
  text: string;
  updatedAt: number;
  doneAt?: number;
}

interface EssayState {
  drafts: Record<string, EssayDraft>;
  setDraft: (promptId: number, subjectId: string, text: string) => void;
  markDone: (promptId: number) => void;
  clearDraft: (promptId: number) => void;
}

export const useEssayStore = create<EssayState>()(
  persist(
    (set) => ({
      drafts: {},

      setDraft: (promptId, subjectId, text) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [promptId]: {
              ...state.drafts[promptId],
              subjectId,
              text,
              updatedAt: Date.now(),
            },
          },
        })),

      markDone: (promptId) =>
        set((state) => {
          const d = state.drafts[promptId];
          if (!d) return state;
          return {
            drafts: {
              ...state.drafts,
              [promptId]: { ...d, doneAt: Date.now() },
            },
          };
        }),

      clearDraft: (promptId) =>
        set((state) => {
          const drafts = { ...state.drafts };
          delete drafts[promptId];
          return { drafts };
        }),
    }),
    { name: "essay-store" },
  ),
);

export const countWords = (text: string) => {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
};

/** Đếm ký tự (cả dấu cách) của bài đã bỏ khoảng trắng đầu/cuối, tính theo ký tự thật (emoji = 1). Khớp cách đếm trong DB. */
export const countChars = (text: string) => [...text.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, "")].length;
