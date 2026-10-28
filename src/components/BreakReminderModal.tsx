import { useExamTheme } from "../theme/ThemeContext";

type Props = { message: string; onDismiss: () => void; onSnooze: () => void };

export default function BreakReminderModal({ message, onDismiss, onSnooze }: Props) {
  const { theme } = useExamTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 ${theme.overlay}`}
        onClick={onDismiss}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="break-title"
        className={`fade-up relative z-10 w-full max-w-md overflow-hidden rounded-2xl p-6 text-center ${theme.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400/10 text-3xl">
          🧘
        </div>
        <h3 id="break-title" className={`text-lg font-bold ${theme.title}`}>
          Đến giờ nghỉ ngơi rồi!
        </h3>
        <p className={`mt-2 text-sm ${theme.muted}`}>{message}</p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={onDismiss}
            className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Đã nghỉ xong, học tiếp
          </button>
          <button
            onClick={onSnooze}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-yellow-300 ${theme.ghostBtn}`}
          >
            Nhắc lại sau 10 phút
          </button>
        </div>
      </div>
    </div>
  );
}
