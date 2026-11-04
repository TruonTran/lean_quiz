import type { Question } from "./Question";

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
  questionCount: number;
  summaryCount: number;
}

export interface SummarySection {
  id: number;
  position: number;
  title: string;
  points: string[];
}
