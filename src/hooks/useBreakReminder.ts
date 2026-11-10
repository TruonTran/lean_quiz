import { useCallback, useEffect, useRef, useState } from "react";
import { useSettingsStore } from "../store/settingsStore";

const BREAK_REMINDER_INTERVAL = 30 * 60 * 1000;
const BREAK_SNOOZE_INTERVAL = 10 * 60 * 1000;

const BREAK_MESSAGES = [
  "Bạn đã học được 30 phút rồi đó! Nghỉ ngơi một tí đi cực qua cua sẽ lo lắng lắm",
  "Não bộ cũng cần nạp lại năng lượng. Nghỉ 5 phút rồi quay lại chinh chiến tiếp nào",
  "Giỏi lắm! Nghỉ mắt một chút, nhìn ra xa cho đỡ mỏi nha",
  "Bạn đang làm rất tốt rồi đó! Hít thở sâu, thư giãn vai gáy một chút nhé",
  "30 phút tập trung không phải chuyện đùa đâu, cho bản thân một lời khen đi nào",
];

export function useBreakReminder() {
  const enabled = useSettingsStore((s) => s.breakReminder);
  const setEnabled = useSettingsStore((s) => s.setBreakReminder);
  const [shown, setShown] = useState(false);
  const [message, setMessage] = useState(BREAK_MESSAGES[0]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = useCallback((delay: number = BREAK_REMINDER_INTERVAL) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setMessage(
        BREAK_MESSAGES[Math.floor(Math.random() * BREAK_MESSAGES.length)],
      );
      setShown(true);
    }, delay);
  }, []);

  // Tắt nhắc nghỉ thì không hẹn giờ; bật lại thì đếm lại từ đầu 30 phút
  useEffect(() => {
    if (!enabled) return;
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, schedule]);

  const dismiss = useCallback(() => {
    setShown(false);
    schedule();
  }, [schedule]);

  const snooze = useCallback(() => {
    setShown(false);
    schedule(BREAK_SNOOZE_INTERVAL);
  }, [schedule]);

  /** Tắt hẳn nhắc nghỉ (nhớ lựa chọn cho các lần sau). */
  const turnOff = useCallback(() => {
    setShown(false);
    setEnabled(false);
  }, [setEnabled]);

  /** Bật / tắt từ nút trên đầu trang làm bài. */
  const toggle = useCallback(() => {
    setShown(false);
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  return { visible: shown && enabled, message, enabled, dismiss, snooze, turnOff, toggle };
}
