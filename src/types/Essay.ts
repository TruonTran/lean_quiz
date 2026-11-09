export interface EssayPrompt {
  id: number;
  subjectId: string;
  title: string;
  prompt: string;
  requirement?: string;
  hint?: string;
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
};

export type EssaySampleInput = {
  promptId: number | null;
  title: string;
  outline: string | null;
  content: string;
};
