import { errMsg } from "../data/api";

export function Loading({ label = "Đang tải…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="glass-panel mx-auto flex max-w-sm items-center justify-center gap-3 rounded-2xl bg-zinc-900/40 p-6 text-zinc-300"
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-400/30 border-t-yellow-400"
      />
      {label}
    </div>
  );
}

export function ErrorBox({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-center text-red-100"
    >
      <p className="font-semibold">Không tải được dữ liệu</p>
      <p className="mt-1 text-sm text-red-200/80">{errMsg(error)}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg border border-red-300/40 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
        >
          Thử lại
        </button>
      )}
    </div>
  );
}
