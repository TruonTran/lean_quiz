import type { Question } from "./Question";

export interface Subject {
  id: string;
  code: string;
  name: string;
  description?: string;
  questions: Question[];
}
