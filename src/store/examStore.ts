import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExamState {
  answers: Record<string, Record<number, number>>;
  currentIndex: Record<string, number>;

  setAnswer: (subjectId: string, questionId: number, answer: number) => void;

  setCurrentIndex: (subjectId: string, index: number) => void;

  clearExam: (subjectId: string) => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      answers: {},
      currentIndex: {},

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
    }),
    {
      name: "quiz-storage",
    },
  ),
);
