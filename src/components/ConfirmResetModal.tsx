import { useEffect, useRef } from "react";
import { useExamTheme } from "../theme/ThemeContext";

type Props = { onCancel: () => void; onConfirm: () => void };

export default function ConfirmResetModal({ onCancel, onConfirm }: Props) {
  const { theme } = useExamTheme();
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => confirmRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 ${theme.overlay}`}
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        aria-describedby="reset-desc"
        className={`relative z-10 w-full max-w-md overflow-hidden rounded-lg p-6 ${theme.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="reset-title" className={`text-lg font-semibold ${theme.title}`}>
          Reset progress
        </h3>
        <p id="reset-desc" className={`mt-2 text-sm ${theme.muted}`}>
          Bạn có chắc chắn muốn xoá toàn bộ câu trả lời đã làm? Hành động này không thể hoàn tác.
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className={`rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-300 ${theme.ghostBtn}`}
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="rounded-md bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Confirm reset
          </button>
        </div>
      </div>
    </div>
  );
}
