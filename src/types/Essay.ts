/** Đề thi viết do admin đăng. */
export interface EssayPrompt {
  id: number;
  subjectId: string;
  title: string;
  prompt: string;
  requirement?: string;
  hint?: string;
  sortOrder: number;
}

/** Bài mẫu / bài học theo. `promptId` = null nghĩa là bài đứng riêng (không gắn với đề nào). */
export interface EssaySample {
  id: number;
  subjectId: string;
  promptId: number | null;
  title: string;
  outline?: string;
  content: string;
  sortOrder: number;
}

/** Dữ liệu admin nhập, đúng dạng cột trong DB (trừ id / subject_id). */
export type EssayPromptInput = {
  title: string;
  prompt: string;
  requirement: string | null;
  hint: string | null;
};

export type EssaySampleInput = {
  promptId: number | null;
  title: string;
  outline: string | null;
  content: string;
};
