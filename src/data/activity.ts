import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

/**
 * Ghi số câu đã làm để tính thành tích. Gom lại và gửi theo lô (không gửi từng câu),
 * lỗi mạng thì giữ lại gửi sau. Chạy ngoài React nên không dính quy tắc effect.
 */
let pending = { answered: 0, correct: 0 };
let timer: ReturnType<typeof setTimeout> | undefined;
let flushing = false;

async function flush() {
  if (flushing || pending.answered === 0) return;
  if (!useAuthStore.getState().session) return;
  flushing = true;
  try {
    while (pending.answered > 0) {
      // DB chỉ nhận tối đa 50 câu mỗi lần gọi
      const answered = Math.min(50, pending.answered);
      const correct = Math.min(pending.correct, answered);
      const { error } = await supabase.rpc("record_answers", {
        p_answered: answered,
        p_correct: correct,
      });
      if (error) return; // giữ nguyên, lần sau gửi lại
      pending = { answered: pending.answered - answered, correct: pending.correct - correct };
    }
  } finally {
    flushing = false;
  }
}

export function recordAnswer(correct: boolean) {
  if (!useAuthStore.getState().session) return;
  pending.answered += 1;
  if (correct) pending.correct += 1;
  clearTimeout(timer);
  timer = setTimeout(() => void flush(), 2000);
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") void flush();
  });
}
