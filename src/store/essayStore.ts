import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EssayDraft {
  subjectId: string;
  text: string;
  updatedAt: number; // ms
  doneAt?: number; // ms — lúc bấm "Hoàn thành bài viết"
}

interface EssayState {
  /** Bài viết của người học, khoá theo id đề. Chỉ nằm trong trình duyệt này. */
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
            // giữ nguyên doneAt: sửa bài sau khi hoàn thành vẫn tính là đã hoàn thành
            [promptId]: { ...state.drafts[promptId], subjectId, text, updatedAt: Date.now() },
          },
        })),

      markDone: (promptId) =>
        set((state) => {
          const d = state.drafts[promptId];
          if (!d) return state;
          return { drafts: { ...state.drafts, [promptId]: { ...d, doneAt: Date.now() } } };
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

/** Đếm từ theo khoảng trắng (đủ dùng cho tiếng Việt, vì mỗi âm tiết là một "từ"). */
export const countWords = (text: string) => {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
};
