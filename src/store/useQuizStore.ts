import { create } from "zustand";

interface QuizState {
  currentSubjectId: string;

  setSubject: (id: string) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentSubjectId: "mln111",

  setSubject: (id) =>
    set({
      currentSubjectId: id,
    }),
}));
