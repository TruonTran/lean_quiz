import { useEffect } from "react";

type Props = { words: number; message: string; onClose: () => void };

export default function EssayDoneModal({ words, message, onClose }: Props) {
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
