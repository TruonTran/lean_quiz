import { useCallback, useEffect, useRef, useState } from "react";
import { popDelayMs, pickPopQuestion } from "../data/popQuiz";
import { useSettingsStore } from "../store/settingsStore";
import type { Question } from "../types/Question";

/** Chưa đủ câu đã học để hỏi thì thử lại sau chừng này. */
const SHORT_RETRY_MS = 60_000;

/**
 * Lâu lâu chọn ngẫu nhiên 1 câu trong số các câu người học ĐÃ LÀM (`pool`) để hỏi gợi nhớ.
 * Chưa có ít nhất `minPool` câu đã làm thì chưa hỏi, cứ 1 phút kiểm tra lại.
 * `busy` = đang có hộp thoại khác (nhắc nghỉ, xác nhận reset) thì chờ, không chen vào.
 */
export function usePopQuiz(pool: Question[], busy: boolean, minPool = 2) {
  const enabled = useSettingsStore((s) => s.popQuiz);
  const setEnabled = useSettingsStore((s) => s.setPopQuiz);

  const [queued, setQueued] = useState<Question | null>(null);
  const [round, setRound] = useState(0);

  const poolRef = useRef(pool);
  useEffect(() => {
    poolRef.current = pool;
  }, [pool]);
  const recent = useRef(new Set<number>());
  const shortRetry = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const delay = shortRetry.current ? SHORT_RETRY_MS : popDelayMs(round === 0, Math.random);
    shortRetry.current = false;
    const id = window.setTimeout(() => {
      const q =
        poolRef.current.length >= minPool ? pickPopQuestion(poolRef.current, Math.random, recent.current) : null;
      if (q) {
        recent.current.add(q.id);
        setQueued(q);
      } else {
        shortRetry.current = true; // chưa học đủ câu: kiểm tra lại sau 1 phút
        setRound((r) => r + 1);
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [enabled, round, minPool]);

  /** Xong (đã trả lời hoặc bỏ qua): hẹn lần hỏi tiếp theo. */
  const close = useCallback(() => {
    setQueued(null);
    setRound((r) => r + 1);
  }, []);

  /** Bật / tắt từ nút trên đầu trang làm bài. Tắt thì bỏ luôn câu đang chờ. */
  const toggle = useCallback(() => {
    setQueued(null);
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  return { visible: enabled && queued !== null && !busy, question: queued, enabled, close, toggle };
}
