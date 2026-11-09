import type { Question } from "./Question";

/** Kiểu thi của môn: trắc nghiệm, thi viết, hoặc cả hai. */
export type ExamType = "quiz" | "essay" | "both";

export const EXAM_TYPE_LABEL: Record<ExamType, string> = {
  quiz: "Trắc nghiệm",
  essay: "Thi viết",
  both: "Cả hai",
};

export const semesterLabel = (s: number | null) =>
  s ? `Kì ${s}` : "Chưa phân loại";

/** Môn có phần trắc nghiệm không? */
export const hasQuiz = (t: ExamType) => t !== "essay";
/** Môn có phần thi viết không? */
export const hasEssay = (t: ExamType) => t !== "quiz";

/** Một môn đầy đủ (kèm câu hỏi) — dùng khi làm bài. */
export interface Subject {
  id: string;
  code: string;
  name: string;
  description?: string;
  questions: Question[];
}

/** Thông tin nhẹ của môn (không kèm câu hỏi) — dùng cho danh sách chọn môn. */
export interface SubjectInfo {
  id: string;
  code: string;
  name: string;
  description?: string;
  examType: ExamType;
  /** Học kì (1, 2, ...); null = chưa phân loại. */
  semester: number | null;
  questionCount: number;
  summaryCount: number;
}

export interface SummarySection {
  id: number;
  position: number;
  title: string;
  points: string[];
}
