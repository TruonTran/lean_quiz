import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import type { Question } from "../types/Question";

export const POINTS_PER_CORRECT = 10;

export function isPopCorrect(q: Question, picked: number[]): boolean {
  if (Array.isArray(q.answer)) {
    return picked.length === q.answer.length && q.answer.every((a) => picked.includes(a));
  }
  return picked.length === 1 && picked[0] === q.answer;
}

export function correctLabels(q: Question): string {
  const list = Array.isArray(q.answer) ? [...q.answer].sort((a, b) => a - b) : [q.answer];
  return list.map((i) => String.fromCharCode(65 + i)).join(", ");
}

export function studiedPool(questions: Question[], answeredIds: Set<number>, currentId?: number): Question[] {
  return questions.filter((q) => answeredIds.has(q.id) && q.id !== currentId);
}

export function pickPopQuestion(
  questions: Question[],
  rng: () => number,
  recent: Set<number>,
): Question | null {
  const usable = questions.filter((q) => q.options.length >= 2);
  if (usable.length === 0) return null;
  let pool = usable.filter((q) => !recent.has(q.id));
  if (pool.length === 0) {
    recent.clear();
    pool = usable;
  }
  return pool[Math.min(pool.length - 1, Math.floor(rng() * pool.length))];
}

const MIN = 60_000;
export function popDelayMs(first: boolean, rng: () => number): number {
  return first ? (5 + rng() * 4) * MIN : (8 + rng() * 7) * MIN;
}

export async function recordPopQuiz(correct: boolean): Promise<void> {
  if (!useAuthStore.getState().session) return;
  try {
    await supabase.rpc("record_pop_quiz", { p_correct: correct });
  } catch {
    /* bỏ qua */
  }
}
