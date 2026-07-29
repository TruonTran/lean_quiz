export interface Question {
  id: number;
  question: string;
  options: string[];

  // Một đáp án hoặc nhiều đáp án
  answer: number | number[];

  hint?: string;
  rationale?: string;
}
