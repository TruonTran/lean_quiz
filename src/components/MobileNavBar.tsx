import { useExamTheme } from "../theme/ThemeContext";

type Props = {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function MobileNavBar({ canPrev, canNext, onPrev, onNext }: Props) {
  const { theme } = useExamTheme();

  return (
    <div
      className={`sticky bottom-4 z-20 mt-8 flex items-center justify-between rounded-xl p-3 lg:hidden ${theme.mobileBar}`}
    >
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`rounded-lg px-6 py-3 font-semibold transition disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-yellow-300 ${theme.ghostBtn}`}
      >
        ← Previous
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 disabled:opacity-30 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Next →
      </button>
    </div>
  );
}
