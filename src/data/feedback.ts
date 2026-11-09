/** Gửi góp ý / yêu cầu từ trang Liên hệ thẳng tới email của chủ web, qua dịch vụ Web3Forms. */

export const FEEDBACK_TYPES = [
  "Yêu cầu thêm / cập nhật đề",
  "Báo lỗi hoặc sai đáp án",
  "Góp ý giao diện, tính năng",
  "Khác",
] as const;
export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export const LIMITS = { messageMin: 10, messageMax: 2000, nameMax: 50 };

export type FeedbackInput = {
  type: FeedbackType;
  name: string;
  email: string; // không bắt buộc; có thì dùng để chủ web trả lời
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trả về câu báo lỗi nếu dữ liệu chưa hợp lệ, hoặc null nếu ổn. */
export function validateFeedback(i: FeedbackInput): string | null {
  const msg = i.message.trim();
  if (msg.length < LIMITS.messageMin) return `Nội dung cần ít nhất ${LIMITS.messageMin} ký tự.`;
  if (msg.length > LIMITS.messageMax) return `Nội dung tối đa ${LIMITS.messageMax} ký tự.`;
  if (i.name.trim().length > LIMITS.nameMax) return `Tên tối đa ${LIMITS.nameMax} ký tự.`;
  if (i.email.trim() && !EMAIL_RE.test(i.email.trim())) return "Email chưa đúng định dạng.";
  if (!FEEDBACK_TYPES.includes(i.type)) return "Loại góp ý không hợp lệ.";
  return null;
}

/* Giới hạn gửi phía trình duyệt để tránh bấm liên tục làm hết hạn mức của dịch vụ gửi mail.
   (Chỉ là rào chắn nhẹ; chống bot thật cần CAPTCHA.) */
const SENT_KEY = "feedback-sent-times";
const MIN_GAP_MS = 60_000;
const MAX_PER_HOUR = 5;
const HOUR_MS = 3_600_000;

function readTimes(now: number): number[] {
  try {
    const arr: unknown = JSON.parse(localStorage.getItem(SENT_KEY) ?? "[]");
    return Array.isArray(arr)
      ? arr.filter((t): t is number => typeof t === "number" && now - t < HOUR_MS)
      : [];
  } catch {
    return [];
  }
}

export function checkRateLimit(now = Date.now()): string | null {
  const times = readTimes(now);
  if (times.some((t) => now - t < MIN_GAP_MS)) return "Bạn vừa gửi xong, hãy đợi một chút rồi gửi tiếp nhé.";
  if (times.length >= MAX_PER_HOUR) return "Bạn đã gửi khá nhiều tin trong 1 giờ qua, hãy quay lại sau nhé.";
  return null;
}

function markSent(now: number) {
  try {
    localStorage.setItem(SENT_KEY, JSON.stringify([...readTimes(now), now]));
  } catch {
    /* trình duyệt chặn lưu trữ: bỏ qua */
  }
}

export async function sendFeedback(accessKey: string, input: FeedbackInput): Promise<void> {
  let res: Response;
  try {
    res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Quiz Cùng Cua] ${input.type}`,
        from_name: input.name.trim() || "Người dùng Quiz Cùng Cua",
        ...(input.email.trim() ? { email: input.email.trim() } : {}),
        message: input.message.trim(),
      }),
    });
  } catch {
    throw new Error("Không kết nối được. Hãy kiểm tra mạng rồi thử lại.");
  }

  let json: { success?: boolean; message?: string } = {};
  try {
    json = await res.json();
  } catch {
    /* phản hồi không phải JSON */
  }
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Chưa gửi được, bạn thử lại sau ít phút nhé.");
  }
  markSent(Date.now());
}
