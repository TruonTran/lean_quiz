import { Link } from "react-router-dom";
import type { RefObject } from "react";
import { useExamTheme } from "../theme/ThemeContext";

type Props = {
  subjectId?: string;
  code: string;
  name: string;
  currentIndex: number;
  total: number;
  isRetryMode: boolean;
  resetButtonRef: RefObject<HTMLButtonElement | null>;
  onReset: () => void;
};

export default function ExamHeader({
  subjectId,
  code,
  name,
  currentIndex,
  total,
  isRetryMode,
  resetButtonRef,
  onReset,
}: Props) {
  const { theme } = useExamTheme();
  const progress = ((currentIndex + 1) / total) * 100;
  const focus = "focus:outline-none focus:ring-2 focus:ring-yellow-300";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className={`text-3xl font-extrabold ${theme.title}`}>
          {code} <span className={theme.accent}>- {name}</span>
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`font-mono-brand rounded-lg bg-linear-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 ${focus}`}
          >
            {currentIndex + 1}/{total}
          </span>

          {isRetryMode && (
            <>
              <span
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${theme.badge} ${focus}`}
              >
                Đang làm lại câu sai
              </span>
              <Link
                to={`/exam/${subjectId}`}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${theme.ghostBtn} ${focus}`}
              >
                ← Thoát làm lại
              </Link>
            </>
          )}

          <Link
            to={`/exam/${subjectId}/results`}
            className={`rounded-lg bg-linear-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 ${focus}`}
          >
            Xem kết quả
          </Link>

          <button
            ref={resetButtonRef}
            onClick={onReset}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${theme.softBtn} ${focus}`}
          >
            Reset
          </button>
        </div>
      </div>

      <div className={`mb-6 h-3 overflow-hidden rounded-full ${theme.track}`}>
        <div
          className="h-full rounded-full bg-linear-to-r from-yellow-400 to-amber-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}
