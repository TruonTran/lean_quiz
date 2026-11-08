import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EssayDraft {
  subjectId: string;
  text: string;
  updatedAt: number; // ms
}

interface EssayState {
  /** Bài viết của người học, khoá theo id đề. Chỉ nằm trong trình duyệt này. */
  drafts: Record<string, EssayDraft>;
  setDraft: (promptId: number, subjectId: string, text: string) => void;
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
            [promptId]: { subjectId, text, updatedAt: Date.now() },
          },
        })),

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

/** Đếm từ theo khoảng trắng (đủ dùng cho tiếng Việt, vì mỗi âm tiết là một "từ"). */
export const countWords = (text: string) => {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
};
