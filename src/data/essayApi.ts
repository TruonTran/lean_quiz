import { supabase } from "../lib/supabase";
import type {
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

/* ------------------------------ đọc ------------------------------ */

export async function fetchEssayPrompts(subjectId: string): Promise<EssayPrompt[]> {
  const { data, error } = await supabase
    .from("essay_prompts")
    .select("id, subject_id, title, prompt, requirement, hint, sort_order")
    .eq("subject_id", subjectId)
    .order("sort_order")
    .order("id");
  if (error) throw error;
  return ((data ?? []) as PromptRow[]).map(toPrompt);
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

/* ------------------------ ghi (chỉ admin) ------------------------ */

export async function createEssayPrompt(
  subjectId: string,
  input: EssayPromptInput,
  sortOrder: number,
): Promise<void> {
  const { error } = await supabase
    .from("essay_prompts")
    .insert({ subject_id: subjectId, sort_order: sortOrder, ...input });
  if (error) raise(error);
}

export async function updateEssayPrompt(
  id: number,
  input: EssayPromptInput,
): Promise<void> {
  const { data, error } = await supabase
    .from("essay_prompts")
    // Chỉ gửi đúng các cột được sửa — không được gửi kèm "id"
    .update({
      title: input.title,
      prompt: input.prompt,
      requirement: input.requirement,
      hint: input.hint,
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
