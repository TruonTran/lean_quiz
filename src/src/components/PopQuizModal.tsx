import { useEffect, useState } from "react";
import { optionLabel } from "../data/drafts";
import { POINTS_PER_CORRECT, correctLabels, isPopCorrect } from "../data/popQuiz";
import { useExamTheme } from "../theme/ThemeContext";
import OptionButton from "../theme/OptionButton";
import type { Question } from "../types/Question";

type Props = {
  question: Question;
  /** Gọi một lần khi người học nộp câu trả lời. */
  onAnswered: (correct: boolean) => void;
  /** Đóng hộp (bỏ qua hoặc xem xong kết quả). */
  onClose: () => void;
};

const CONFETTI_COLORS = ["#f9c645", "#f2b12e", "#ffffff", "#4ade80", "#60a5fa", "#f472b6"];

/** Pháo giấy bằng CSS, vị trí cố định theo số thứ tự nên không phụ thuộc ngẫu nhiên khi vẽ. */
function Confetti() {
  return (
    <div className="popquiz-confetti pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes popquiz-fall { from { transform: translateY(-30px) rotate(0deg); opacity: 1; } to { transform: translateY(460px) rotate(540deg); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .popquiz-confetti { display: none; } }
      `}</style>
      {Array.from({ length: 28 }, (_, i) => (
        <span
          key={i}
          className="absolute top-0 block h-2 w-1.5 rounded-sm"
          style={{
            left: `${(i * 37 + 5) % 100}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animation: `popquiz-fall ${1.5 + (i % 5) * 0.25}s ease-in ${(i % 8) * 0.07}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

export default function PopQuizModal({ question, onAnswered, onClose }: Props) {
  const { theme } = useExamTheme();
  const multi = Array.isArray(question.answer);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);

  const done = result !== null;

  const toggle = (i: number) => {
    if (done) return;
    setPicked((cur) => (multi ? (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]) : [i]));
  };

  const submit = () => {
    if (done || picked.length === 0) return;
    const ok = isPopCorrect(question, picked);
    setResult(ok);
    onAnswered(ok);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isRight = (i: number) => (Array.isArray(question.answer) ? question.answer.includes(i) : question.answer === i);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 ${theme.overlay}`} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popquiz-title"
        className={`fade-up relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl ${theme.modal}`}
      >
        {result === true && <Confetti />}

        <div className="overflow-y-auto p-6">
          <p className={`font-mono-brand text-xs uppercase tracking-widest ${theme.accent}`}>Câu hỏi bất ngờ</p>
          <p className={`mt-1 text-xs ${theme.muted}`}>Ôn nhanh một câu bạn đã làm trong đề này.</p>
          <h3 id="popquiz-title" className={`mt-3 whitespace-pre-wrap text-lg font-bold ${theme.title}`}>
            {question.question}
          </h3>
          {multi && !done && <p className={`mt-1 text-xs ${theme.muted}`}>Câu này chọn nhiều đáp án.</p>}

          {question.image && (
            <img
              src={question.image}
              alt="Hình minh hoạ cho câu hỏi"
              loading="lazy"
              className="mx-auto mt-3 max-h-56 max-w-full rounded-lg object-contain"
            />
          )}

          <div className="mt-4 space-y-2">
            {question.options.map((option, i) => (
              <OptionButton
                key={i}
                label={optionLabel(i)}
                option={option}
                checked={picked.includes(i)}
                isAnswered={done}
                isCorrect={isRight(i)}
                isMultiChoice={multi}
                onClick={() => toggle(i)}
              />
            ))}
          </div>

          {done && (
            <div role="status" className={`mt-4 rounded-xl p-4 text-sm ${result ? theme.correctBox : theme.wrongBox}`}>
              {result ? (
                <p className="font-bold">Chính xác! Bạn được thưởng +{POINTS_PER_CORRECT} điểm.</p>
              ) : (
                <p className="font-bold">Chưa đúng rồi. Đáp án đúng là {correctLabels(question)}. Lần sau nhé!</p>
              )}
              {question.rationale && <p className="mt-2 whitespace-pre-wrap opacity-90">{question.rationale}</p>}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            {done ? (
              <button
                onClick={onClose}
                autoFocus
                className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Học tiếp
              </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-yellow-300 ${theme.ghostBtn}`}
                >
                  Bỏ qua
                </button>
                <button
                  onClick={submit}
                  disabled={picked.length === 0}
                  className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Trả lời
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
