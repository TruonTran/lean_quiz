import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExamState {
  answers: Record<string, Record<number, number | number[]>>;
  currentIndex: Record<string, number>;
  notes: Record<string, Record<number, string>>;

  setAnswer: (
    subjectId: string,
    questionId: number,
    answer: number | number[],
  ) => void;

  setCurrentIndex: (subjectId: string, index: number) => void;
  clearExam: (subjectId: string) => void;
  clearAnswers: (subjectId: string, questionIds: number[]) => void;
  setNote: (subjectId: string, questionId: number, note: string) => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      answers: {},
      currentIndex: {},
      notes: {},

      setAnswer: (subjectId, questionId, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [subjectId]: {
              ...state.answers[subjectId],
              [questionId]: answer,
            },
          },
        })),

      setCurrentIndex: (subjectId, index) =>
        set((state) => ({
          currentIndex: {
            ...state.currentIndex,
            [subjectId]: index,
          },
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
        })),
    }),
    {
      name: "quiz-storage",
      version: 1,
      migrate: (persisted, version) => {
        const state = persisted as Partial<ExamState>;
        if (version < 1) {
          const answers = { ...state.answers };
          const currentIndex = { ...state.currentIndex };
          delete answers.prm393;
          delete currentIndex.prm393;
          return { ...state, answers, currentIndex } as ExamState;
        }
        return state as ExamState;
      },
    },
  ),
);
