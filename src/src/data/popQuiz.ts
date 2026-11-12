import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import type { Question } from "../types/Question";

/** Câu hỏi bất ngờ: thỉnh thoảng hỏi lại một câu trong đề đang làm, đúng thì được thưởng điểm. */

export const POINTS_PER_CORRECT = 10;

/** Chọn đúng khi: câu 1 đáp án thì chọn đúng 1 ô đó; câu nhiều đáp án thì chọn đúng cả bộ, không thừa không thiếu. */
export function isPopCorrect(q: Question, picked: number[]): boolean {
  if (Array.isArray(q.answer)) {
    return picked.length === q.answer.length && q.answer.every((a) => picked.includes(a));
  }
  return picked.length === 1 && picked[0] === q.answer;
}

/** Danh sách chữ cái đáp án đúng, vd: "A" hoặc "A, C". */
export function correctLabels(q: Question): string {
  const list = Array.isArray(q.answer) ? [...q.answer].sort((a, b) => a - b) : [q.answer];
  return list.map((i) => String.fromCharCode(65 + i)).join(", ");
}

/**
 * Các câu có thể đem ra hỏi bất ngờ: chỉ những câu người học ĐÃ LÀM trong đề này (để gợi nhớ),
 * trừ câu đang hiện trên màn hình.
 */
export function studiedPool(questions: Question[], answeredIds: Set<number>, currentId?: number): Question[] {
  return questions.filter((q) => answeredIds.has(q.id) && q.id !== currentId);
}

/** Chọn ngẫu nhiên một câu, tránh các câu đã hỏi gần đây (hết câu để chọn thì bắt đầu vòng mới). */
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
/** Lần đầu sau 5–9 phút kể từ lúc vào làm quiz; các lần sau cách nhau 8–15 phút. */
export function popDelayMs(first: boolean, rng: () => number): number {
  return first ? (5 + rng() * 4) * MIN : (8 + rng() * 7) * MIN;
}

/** Ghi kết quả lên tài khoản. Lỗi mạng hay chưa chạy SQL thì bỏ qua, không làm phiền người học. */
export async function recordPopQuiz(correct: boolean): Promise<void> {
  if (!useAuthStore.getState().session) return;
  try {
    await supabase.rpc("record_pop_quiz", { p_correct: correct });
  } catch {
    /* bỏ qua */
  }
}
