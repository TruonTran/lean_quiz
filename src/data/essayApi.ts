import { supabase } from "../lib/supabase";
import type {
  EssaySubmissionInfo,
  EssayPrompt,
  EssayPromptInput,
  EssaySample,
  EssaySampleInput,
} from "../types/Essay";
import { DENIED, raise } from "./api";

type PromptRow = {
  id: number;
  subject_id: string;
  title: string;
  prompt: string;
  requirement: string | null;
  hint: string | null;
  min_chars?: number | null;
  max_chars?: number | null;
  sort_order: number;
};

type SampleRow = {
  id: number;
  subject_id: string;
  prompt_id: number | null;
  title: string;
  outline: string | null;
  content: string;
  sort_order: number;
};

const toPrompt = (r: PromptRow): EssayPrompt => ({
  id: r.id,
  subjectId: r.subject_id,
  title: r.title,
  prompt: r.prompt,
  requirement: r.requirement ?? undefined,
  hint: r.hint ?? undefined,
  minChars: r.min_chars ?? undefined,
  maxChars: r.max_chars ?? undefined,
  sortOrder: r.sort_order,
});

const toSample = (r: SampleRow): EssaySample => ({
  id: r.id,
  subjectId: r.subject_id,
  promptId: r.prompt_id,
  title: r.title,
  outline: r.outline ?? undefined,
  content: r.content,
  sortOrder: r.sort_order,
});

export async function fetchEssayPrompts(subjectId: string): Promise<EssayPrompt[]> {
  const load = (cols: string) =>
    supabase.from("essay_prompts").select(cols).eq("subject_id", subjectId).order("sort_order").order("id");
  const base = "id, subject_id, title, prompt, requirement, hint, sort_order";
  let res = await load(`${base}, min_chars, max_chars`);
  // Chưa chạy supabase/essay-submissions.sql (thiếu cột min_chars / max_chars): vẫn tải được đề
  if (res.error?.code === "42703") res = await load(base);
  if (res.error) throw res.error;
  return ((res.data ?? []) as unknown as PromptRow[]).map(toPrompt);
}

export async function fetchEssaySamples(subjectId: string): Promise<EssaySample[]> {
  const { data, error } = await supabase
    .from("essay_samples")
    .select("id, subject_id, prompt_id, title, outline, content, sort_order")
    .eq("subject_id", subjectId)
    .order("sort_order")
    .order("id");
  if (error) throw error;
  return ((data ?? []) as SampleRow[]).map(toSample);
}

export async function createEssayPrompt(
  subjectId: string,
  input: EssayPromptInput,
  sortOrder: number,
): Promise<void> {
  const { error } = await supabase
    .from("essay_prompts")
    .insert({
      subject_id: subjectId,
      sort_order: sortOrder,
      title: input.title,
      prompt: input.prompt,
      requirement: input.requirement,
      hint: input.hint,
      min_chars: input.minChars,
      max_chars: input.maxChars,
    });
  if (error) raise(error);
}

export async function updateEssayPrompt(
  id: number,
  input: EssayPromptInput,
): Promise<void> {
  const { data, error } = await supabase
    .from("essay_prompts")
    .update({
      title: input.title,
      prompt: input.prompt,
      requirement: input.requirement,
      hint: input.hint,
      min_chars: input.minChars,
      max_chars: input.maxChars,
    })
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

export async function deleteEssayPrompt(id: number): Promise<void> {
  const { data, error } = await supabase
    .from("essay_prompts")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

export async function createEssaySample(
  subjectId: string,
  input: EssaySampleInput,
  sortOrder: number,
): Promise<void> {
  const { error } = await supabase.from("essay_samples").insert({
    subject_id: subjectId,
    sort_order: sortOrder,
    prompt_id: input.promptId,
    title: input.title,
    outline: input.outline,
    content: input.content,
  });
  if (error) raise(error);
}

export async function updateEssaySample(
  id: number,
  input: EssaySampleInput,
): Promise<void> {
  const { data, error } = await supabase
    .from("essay_samples")
    .update({
      prompt_id: input.promptId,
      title: input.title,
      outline: input.outline,
      content: input.content,
    })
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

export async function deleteEssaySample(id: number): Promise<void> {
  const { data, error } = await supabase
    .from("essay_samples")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

/* ------------------- bài viết đã hoàn thành (của chính người dùng) ------------------- */

/** Nộp bài hoàn thành. DB kiểm tra lại đủ / quá số ký tự nên không thể lách bằng cách sửa giao diện. */
export async function submitEssay(promptId: number, content: string): Promise<void> {
  const { error } = await supabase.rpc("submit_essay", { p_prompt_id: promptId, p_content: content });
  if (error) throw new Error(error.message);
}

type SubmissionRow = {
  id: number;
  prompt_id: number | null;
  subject_id: string | null;
  prompt_title: string;
  char_count: number;
  word_count: number;
  first_completed_at: string;
};

export async function fetchMySubmissions(): Promise<EssaySubmissionInfo[]> {
  const { data, error } = await supabase
    .from("essay_submissions")
    .select("id, prompt_id, subject_id, prompt_title, char_count, word_count, first_completed_at")
    .order("first_completed_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as SubmissionRow[]).map((r) => ({
    id: r.id,
    promptId: r.prompt_id,
    subjectId: r.subject_id,
    promptTitle: r.prompt_title,
    charCount: r.char_count,
    wordCount: r.word_count,
    firstCompletedAt: r.first_completed_at,
  }));
}

/** Nội dung bài đã nộp cho một đề (null nếu chưa nộp). */
export async function fetchMySubmissionContent(promptId: number): Promise<string | null> {
  const { data, error } = await supabase
    .from("essay_submissions")
    .select("content")
    .eq("prompt_id", promptId)
    .maybeSingle();
  if (error) throw error;
  return data ? (data as { content: string }).content : null;
}
