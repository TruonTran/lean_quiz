import { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
  words: number;
  message: string;
  /** saved = đã lưu lên tài khoản; guest = chưa đăng nhập nên chỉ lưu trên máy này */
  saved: "saved" | "guest";
  onClose: () => void;
};

export default function EssayDoneModal({ words, message, saved, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="essay-done-title"
        className="fade-up glass-panel relative z-10 w-full max-w-md rounded-2xl bg-zinc-900/90 p-7 text-center shadow-2xl shadow-black/60"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/10 text-4xl">
        </div>
        <h3 id="essay-done-title" className="text-xl font-bold text-yellow-300">
          Bạn đã hoàn thành bài viết. Bạn thật giỏi!
        </h3>
        <p className="font-mono-brand mt-2 text-xs text-zinc-500">{words} từ</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{message}</p>
        {saved === "saved" ? (
          <p role="status" className="mt-3 rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-2 text-sm text-yellow-100">
            Bài viết đã được lưu vào tài khoản của bạn và tính vào thành tích.
          </p>
        ) : (
          <p role="status" className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-2 text-sm text-zinc-300">
            Bài mới chỉ lưu trên trình duyệt này.{" "}
            <Link to={`/login?next=${encodeURIComponent(window.location.pathname)}`} className="font-semibold text-yellow-300 underline">
              Đăng nhập
            </Link>{" "}
            để lưu bài vào tài khoản và nhận thành tích.
          </p>
        )}
        <button
          onClick={onClose}
          autoFocus
          className="mt-6 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Cảm ơn bạn nhiều nhé!
        </button>
      </div>
    </div>
  );
}
