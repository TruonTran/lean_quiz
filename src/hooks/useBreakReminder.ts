import { useCallback, useEffect, useRef, useState } from "react";

const BREAK_REMINDER_INTERVAL = 30 * 60 * 1000;
const BREAK_SNOOZE_INTERVAL = 10 * 60 * 1000;

const BREAK_MESSAGES = [
  "Bạn đã học được 30 phút rồi đó! Đứng dậy vươn vai, uống miếng nước nhé 💧",
  "Não bộ cũng cần nạp lại năng lượng. Nghỉ 5 phút rồi quay lại chinh chiến tiếp nào 💪",
  "Giỏi lắm! Nghỉ mắt một chút, nhìn ra xa cho đỡ mỏi nha 👀",
  "Bạn đang làm rất tốt rồi đó! Hít thở sâu, thư giãn vai gáy một chút nhé 🌿",
  "30 phút tập trung không phải chuyện đùa đâu, cho bản thân một lời khen đi nào 🌟",
];

export function useBreakReminder() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(BREAK_MESSAGES[0]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = useCallback((delay: number = BREAK_REMINDER_INTERVAL) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setMessage(
        BREAK_MESSAGES[Math.floor(Math.random() * BREAK_MESSAGES.length)],
      );
      setVisible(true);
    }, delay);
  }, []);

  useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [schedule]);

  const dismiss = useCallback(() => {
    setVisible(false);
    schedule();
  }, [schedule]);

  const snooze = useCallback(() => {
    setVisible(false);
    schedule(BREAK_SNOOZE_INTERVAL);
  }, [schedule]);

  return { visible, message, dismiss, snooze };
}
