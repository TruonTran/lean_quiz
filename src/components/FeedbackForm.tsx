import { useState, type FormEvent } from "react";
import { CONTACT } from "../config/contact";
import {
  FEEDBACK_TYPES,
  LIMITS,
  checkRateLimit,
  sendFeedback,
  validateFeedback,
  type FeedbackType,
} from "../data/feedback";
import { inputClass, panel, primaryBtn, ghostBtn } from "./adminStyles";

/** Form gửi góp ý thẳng tới email chủ web. Ẩn đi nếu chưa điền web3formsKey trong src/config/contact.ts. */
export default function FeedbackForm() {
  const key = CONTACT.web3formsKey.trim();

  const [type, setType] = useState<FeedbackType>(FEEDBACK_TYPES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // ô bẫy bot: người thật không thấy nên không điền
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!key) return null;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const input = { type, name, email, message };
    const invalid = validateFeedback(input);
    if (invalid) return setError(invalid);

    if (trap) {
      setStatus("sent");
      return;
    }

    const limited = checkRateLimit();
    if (limited) return setError(limited);

    setStatus("sending");
    try {
      await sendFeedback(key, input);
      setStatus("sent");
      setMessage("");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Chưa gửi được, bạn thử lại nhé.");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className={`${panel} mx-auto max-w-xl space-y-3 text-center`}>
        <p className="text-4xl" aria-hidden="true">💌</p>
        <h2 className="text-lg font-bold text-yellow-300">Đã gửi! Cảm ơn bạn nhiều</h2>
        <p className="text-sm text-zinc-300">
          Tin nhắn của bạn đã tới tận hộp thư của {CONTACT.name || "mình"}.
          {email.trim() ? " Mình sẽ phản hồi qua email bạn để lại nếu cần." : ""}
        </p>
        <button onClick={() => setStatus("idle")} className={ghostBtn}>
          Gửi thêm một tin nhắn
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`${panel} mx-auto max-w-xl space-y-3`}>
      <h2 className="text-lg font-bold text-yellow-300">Gửi tin nhắn cho {CONTACT.name || "mình"}</h2>
      <p className="text-sm text-zinc-400">Tin nhắn sẽ được gửi thẳng tới email của mình, không cần đăng nhập.</p>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as FeedbackType)}
        className={inputClass}
        aria-label="Loại tin nhắn"
      >
        {FEEDBACK_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn (không bắt buộc)"
          maxLength={LIMITS.nameMax}
          autoComplete="name"
          className={inputClass}
          aria-label="Tên của bạn"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email của bạn(không bắt buộc)"
          autoComplete="email"
          className={inputClass}
          aria-label="Email để nhận phản hồi"
        />
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Bạn có yêu cầu gì cứ việc gửi tin nhắn cho Cua nha. Cua sẽ đọc và phản hồi sớm nhất có thể."
        rows={6}
        maxLength={LIMITS.messageMax}
        required
        className={inputClass}
        aria-label="Nội dung"
      />
      <p className="text-right text-xs text-zinc-600">
        {message.length}/{LIMITS.messageMax}
      </p>

      {/* Ô bẫy bot: ẩn với người dùng và trình đọc màn hình */}
      <input
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        name="website"
      />

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={`${primaryBtn} w-full`}>
        {status === "sending" ? "Đang gửi…" : "Gửi tin nhắn"}
      </button>
    </form>
  );
}
