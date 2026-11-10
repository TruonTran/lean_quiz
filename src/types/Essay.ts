export interface EssayPrompt {
  id: number;
  subjectId: string;
  title: string;
  prompt: string;
  requirement?: string;
  hint?: string;
  minChars?: number;
  maxChars?: number;
  sortOrder: number;
}

export interface EssaySample {
  id: number;
  subjectId: string;
  promptId: number | null;
  title: string;
  outline?: string;
  content: string;
  sortOrder: number;
}

export type EssayPromptInput = {
  title: string;
  prompt: string;
  requirement: string | null;
  hint: string | null;
  minChars: number | null;
  maxChars: number | null;
};

export type EssaySampleInput = {
  promptId: number | null;
  title: string;
  outline: string | null;
  content: string;
};

/** Bài viết đã hoàn thành của người dùng (không kèm nội dung, dùng cho danh sách thành tích). */
export interface EssaySubmissionInfo {
  id: number;
  promptId: number | null;
  subjectId: string | null;
  promptTitle: string;
  charCount: number;
  wordCount: number;
  firstCompletedAt: string;
}
