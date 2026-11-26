import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SubjectProgress = {
  answers: Record<number, number | number[]>;
  currentIndex: number;
  notes: Record<number, string>;
};

interface ExamState {
  answers: Record<string, Record<number, number | number[]>>;
  currentIndex: Record<string, number>;
  notes: Record<string, Record<number, string>>;
  /** Thời điểm (ms) môn này được sửa lần cuối trên máy này — dùng để đồng bộ giữa các thiết bị. */
  updatedAt: Record<string, number>;

  setAnswer: (
    subjectId: string,
    questionId: number,
    answer: number | number[],
  ) => void;

  setCurrentIndex: (subjectId: string, index: number) => void;
  clearExam: (subjectId: string) => void;
  clearAnswers: (subjectId: string, questionIds: number[]) => void;
  setNote: (subjectId: string, questionId: number, note: string) => void;
  /** Ghi đè tiến độ một môn bằng bản từ server (không tính là thay đổi mới). */
  applyRemote: (subjectId: string, p: SubjectProgress, updatedAt: number) => void;
}

const stamp = (s: ExamState, subjectId: string) => ({
  ...s.updatedAt,
  [subjectId]: Date.now(),
});

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      answers: {},
      currentIndex: {},
      notes: {},
      updatedAt: {},

      setAnswer: (subjectId, questionId, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [subjectId]: {
              ...state.answers[subjectId],
              [questionId]: answer,
            },
          },
          updatedAt: stamp(state, subjectId),
        })),

      setCurrentIndex: (subjectId, index) =>
        set((state) => ({
          currentIndex: {
            ...state.currentIndex,
            [subjectId]: index,
          },
          updatedAt: stamp(state, subjectId),
        })),

      clearExam: (subjectId) =>
        set((state) => {
          const answers = { ...state.answers };
          const currentIndex = { ...state.currentIndex };

          delete answers[subjectId];
          delete currentIndex[subjectId];

          return {
            answers,
            currentIndex,
            updatedAt: stamp(state, subjectId),
          };
        }),

      clearAnswers: (subjectId, questionIds) =>
        set((state) => {
          const subjectAnswers = { ...state.answers[subjectId] };
          questionIds.forEach((id) => delete subjectAnswers[id]);

          return {
            answers: {
              ...state.answers,
              [subjectId]: subjectAnswers,
            },
            updatedAt: stamp(state, subjectId),
          };
        }),

      setNote: (subjectId, questionId, note) =>
        set((state) => ({
          notes: {
            ...state.notes,
            [subjectId]: {
              ...state.notes[subjectId],
              [questionId]: note,
            },
          },
          updatedAt: stamp(state, subjectId),
        })),

      applyRemote: (subjectId, p, updatedAt) =>
        set((state) => ({
          answers: { ...state.answers, [subjectId]: p.answers },
          currentIndex: { ...state.currentIndex, [subjectId]: p.currentIndex },
          notes: { ...state.notes, [subjectId]: p.notes },
          updatedAt: { ...state.updatedAt, [subjectId]: updatedAt },
        })),
    }),
    {
      name: "quiz-storage",
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as Partial<ExamState>;
        let next = state;
        if (version < 1) {
          const answers = { ...state.answers };
          const currentIndex = { ...state.currentIndex };
          delete answers.prm393;
          delete currentIndex.prm393;
          next = { ...state, answers, currentIndex };
        }
        if (version < 2) {
          // Dữ liệu cũ chưa có mốc thời gian: gán mốc rất nhỏ (1) để nếu server đã có bản của môn đó
          // thì bản server thắng, còn nếu server chưa có thì bản này được đẩy lên lần đầu.
          const updatedAt: Record<string, number> = {};
          const ids = new Set([
            ...Object.keys(next.answers ?? {}),
            ...Object.keys(next.currentIndex ?? {}),
            ...Object.keys(next.notes ?? {}),
          ]);
          ids.forEach((id) => (updatedAt[id] = 1));
          next = { ...next, updatedAt };
        }
        return next as ExamState;
      },
    },
  ),
);
