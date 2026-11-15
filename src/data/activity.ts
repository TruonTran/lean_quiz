import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { vnToday } from "./achievements";

/**
 * Ghi các câu đã làm để tính thành tích. Mỗi câu chỉ được tính MỘT LẦN MỖI NGÀY (DB kiểm tra), nên làm lại
 * cùng câu (kể cả Reset rồi làm lại) không cộng thêm. Ở đây cũng bỏ qua câu trùng ngay trên trình duyệt để
 * đỡ gửi thừa. Gom lại và gửi theo lô; lỗi mạng thì giữ lại gửi sau.
 */
type Item = { s: string; q: number; c: boolean };

let pending: Item[] = [];
const queued = new Set<string>(); // câu đã đưa vào hàng đợi hôm nay, dạng "ngày|môn|câu"
let queuedDay = "";
let timer: ReturnType<typeof setTimeout> | undefined;
let flushing = false;

async function flush() {
  if (flushing || pending.length === 0) return;
  if (!useAuthStore.getState().session) return;
  flushing = true;
  try {
    while (pending.length > 0) {
      const chunk = pending.slice(0, 50); // DB nhận tối đa 50 mục mỗi lần
      const { error } = await supabase.rpc("record_answer_items", { p_items: chunk });
      if (error) return; // giữ nguyên, lần sau gửi lại
      pending = pending.slice(chunk.length);
    }
  } finally {
    flushing = false;
  }
}

export function recordAnswer(subjectId: string, questionId: number, correct: boolean) {
  if (!useAuthStore.getState().session) return;

  const day = vnToday();
  if (day !== queuedDay) {
    queued.clear(); // sang ngày mới thì tính lại từ đầu
    queuedDay = day;
  }
  const key = `${day}|${subjectId}|${questionId}`;
  if (queued.has(key)) return; // hôm nay câu này đã tính rồi
  queued.add(key);

  pending.push({ s: subjectId, q: questionId, c: correct });
  clearTimeout(timer);
  timer = setTimeout(() => void flush(), 2000);
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") void flush();
  });
}
