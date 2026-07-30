import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubjectById } from "../data/subjects";
import { useExamStore } from "../store/examStore";

export default function ExamPage() {
  const { subjectId } = useParams<{ subjectId: string }>();

  const subject = getSubjectById(subjectId ?? "");

  // Lấy nguyên object từ store trước
  const allAnswers = useExamStore((state) => state.answers);
  const allCurrentIndex = useExamStore((state) => state.currentIndex);

  const setAnswer = useExamStore((state) => state.setAnswer);
  const setCurrentIndex = useExamStore((state) => state.setCurrentIndex);
  const clearExam = useExamStore((state) => state.clearExam);

  // Memoize answers so reference doesn't change every render (fix exhaustive-deps)
  const answers = useMemo(
    () => (subjectId ? (allAnswers[subjectId] ?? {}) : {}),
    [allAnswers, subjectId],
  );

  const currentIndex = subjectId ? (allCurrentIndex[subjectId] ?? 0) : 0;

  const [showHint, setShowHint] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Refs for focus management when modal opens/closes
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  // Keyboard shortcuts: Left/Right to navigate, 1..9 to pick options
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!subjectId) return;

      if (e.key === "ArrowLeft") {
        setShowHint(false);
        setCurrentIndex(subjectId, Math.max(currentIndex - 1, 0));
      } else if (e.key === "ArrowRight") {
        setShowHint(false);
        setCurrentIndex(
          subjectId,
          Math.min(
            currentIndex + 1,
            subject?.questions.length ? subject.questions.length - 1 : 0,
          ),
        );
      } else if (/^[1-9]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const question = subject?.questions[currentIndex];
        if (!question) return;
        if (idx >= 0 && idx < question.options.length) {
          // emulate click (only if not answered yet)
          const selectedAnswer = answers[question.id];
          if (selectedAnswer === undefined) {
            setAnswer(subjectId, question.id, idx);
          }
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [subjectId, currentIndex, answers, setAnswer, setCurrentIndex, subject]);

  // Close confirm modal on Escape and manage focus when modal opens/closes
  useEffect(() => {
    if (!showConfirmReset) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowConfirmReset(false);
    };

    window.addEventListener("keydown", onKey);

    // focus confirm button when modal opens
    setTimeout(() => confirmButtonRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [showConfirmReset]);

  // When modal closes, return focus back to Reset button
  useEffect(() => {
    if (!showConfirmReset) {
      setTimeout(() => resetButtonRef.current?.focus(), 0);
    }
  }, [showConfirmReset]);

  const doReset = () => {
    if (!subjectId) return;

    clearExam(subjectId);
    setCurrentIndex(subjectId, 0);
    setShowHint(false);
    setShowConfirmReset(false);
  };

  if (!subject) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold">
        Subject not found
      </div>
    );
  }

  const questions = subject.questions;

  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold">
        No questions found
      </div>
    );
  }

  const question = questions[currentIndex];

  const selectedAnswer = answers[question.id];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== undefined || !subjectId) return;

    setAnswer(subjectId, question.id, answerIndex);
  };

  const isCorrectOption = (index: number) => {
    if (Array.isArray(question.answer)) {
      return question.answer.includes(index);
    }

    return question.answer === index;
  };

  const userCorrect =
    selectedAnswer !== undefined &&
    (Array.isArray(question.answer)
      ? question.answer.includes(selectedAnswer)
      : selectedAnswer === question.answer);

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-amber-50 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-800">
              {subject.code} - {subject.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/exam/${subjectId}/results`}
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              Xem kết quả
            </Link>
            <button
              ref={resetButtonRef}
              onClick={() => setShowConfirmReset(true)}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-6 h-3 overflow-hidden rounded-full bg-amber-100">
          <div
            className="h-full bg-amber-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-amber-900">
              {question.question}
            </h2>

            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                {selectedAnswer === undefined ? (
                  <button
                    onClick={() => setShowHint((s) => !s)}
                    className="rounded-md bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 ring-1 ring-amber-200 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    Hint
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let className =
                "w-full rounded-xl border p-4 text-left transition font-medium ";

              if (selectedAnswer === undefined) {
                className += "hover:bg-amber-50 hover:border-amber-300";
              } else if (isCorrectOption(index)) {
                className += "bg-amber-600 border-amber-600 text-white";
              } else if (selectedAnswer === index) {
                className += "bg-red-500 border-red-500 text-white";
              } else {
                className += "bg-gray-100";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={className}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 font-bold text-amber-800">
                      {String.fromCharCode(65 + index)}.
                    </div>

                    <div className="flex-1">{option}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Hint panel shown when user requests hint and hasn't answered yet */}
          {selectedAnswer === undefined && showHint && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <h3 className="mb-1 font-semibold">Hint</h3>
              <p>{question.hint ?? "No hint available for this question."}</p>
            </div>
          )}

          {/* Result panel shown after answering */}
          {selectedAnswer !== undefined && (
            <div
              className={`mt-6 rounded-xl p-5 ${
                userCorrect
                  ? "border border-amber-400 bg-amber-50"
                  : "border border-red-400 bg-red-100"
              }`}
            >
              <p className="mb-2">
                <strong>Correct answer:</strong>{" "}
                {Array.isArray(question.answer)
                  ? question.answer
                      .map((i) => String.fromCharCode(65 + i))
                      .join(", ")
                  : String.fromCharCode(65 + question.answer)}
              </p>
              {question.rationale && (
                <p>
                  <strong>Explanation:</strong> {question.rationale}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => {
              setShowHint(false);
              if (subjectId) {
                setCurrentIndex(subjectId, Math.max(currentIndex - 1, 0));
              }
            }}
            disabled={currentIndex === 0}
            className="rounded-lg bg-amber-700 px-6 py-3 font-semibold text-white hover:bg-amber-800 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowHint(false);
                if (subjectId) {
                  setCurrentIndex(
                    subjectId,
                    Math.min(currentIndex + 1, questions.length - 1),
                  );
                }
              }}
              disabled={currentIndex === questions.length - 1}
              className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Reset Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowConfirmReset(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            aria-describedby="reset-desc"
            className="relative z-10 w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="reset-title"
              className="text-lg font-semibold text-amber-900"
            >
              Reset progress
            </h3>
            <p id="reset-desc" className="mt-2 text-sm text-gray-600">
              Bạn có chắc chắn muốn xoá toàn bộ câu trả lời đã làm? Hành động
              này không thể hoàn tác.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200"
              >
                Cancel
              </button>

              <button
                ref={confirmButtonRef}
                onClick={doReset}
                className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                Confirm reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
