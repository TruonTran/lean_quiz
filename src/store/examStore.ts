import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExamState {
  answers: Record<string, Record<number, number>>;

  setAnswer: (subjectId: string, questionId: number, answer: number) => void;

  clearExam: (subjectId: string) => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      answers: {},

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

      clearExam: (subjectId) =>
        set((state) => {
          const newAnswers = { ...state.answers };
          delete newAnswers[subjectId];

          return {
            answers: newAnswers,
          };
        }),
    }),
    {
      name: "quiz-storage",
    },
  ),
);
