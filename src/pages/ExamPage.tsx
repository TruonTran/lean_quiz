import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getSubjectById } from "../data/subjects";
import { useExamStore } from "../store/examStore";

export default function ExamPage() {
  const { subjectId } = useParams<{ subjectId: string }>();

  const subject = getSubjectById(subjectId ?? "");
  const location = useLocation();

  // Danh sách id câu hỏi cần làm lại (ví dụ khi bấm "Làm lại câu sai" ở trang kết quả)
  const retryIds = (location.state as { retryIds?: number[] } | null)?.retryIds;
  const isRetryMode = Boolean(retryIds && retryIds.length > 0);

  // Lấy nguyên object từ store trước
  const allAnswers = useExamStore((state) => state.answers);
  const allCurrentIndex = useExamStore((state) => state.currentIndex);
  const allNotes = useExamStore((state) => state.notes);

  const setAnswer = useExamStore((state) => state.setAnswer);
  const setCurrentIndex = useExamStore((state) => state.setCurrentIndex);
  const clearExam = useExamStore((state) => state.clearExam);
  const setNote = useExamStore((state) => state.setNote);

  // Memoize answers so reference doesn't change every render (fix exhaustive-deps)
  const answers = useMemo(
    () => (subjectId ? (allAnswers[subjectId] ?? {}) : {}),
    [allAnswers, subjectId],
  );

  const note = subjectId ? (allNotes[subjectId] ?? "") : "";

  const retryKey = retryIds && retryIds.length > 0 ? retryIds.join(",") : "";

  // Danh sách câu hỏi cho lượt làm bài hiện tại:
  // ưu tiên hàng đợi "làm lại câu sai" (retryIds) nếu có, mặc định là toàn bộ ngân hàng câu hỏi.
  const questions = useMemo(() => {
    if (!subject) return [];

    if (retryIds && retryIds.length > 0) {
      const byId = new Map(subject.questions.map((q) => [q.id, q]));
      const filtered = retryIds
        .map((id) => byId.get(id))
        .filter((q): q is NonNullable<typeof q> => q !== undefined);
      if (filtered.length > 0) return filtered;
    }

    return subject.questions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, retryKey]);

  // Vị trí câu hỏi khi ở chế độ "làm lại câu sai" được lưu RIÊNG (state local),
  // không dùng chung currentIndex với bài thi chính trong store.
  // => Khi thoát chế độ làm lại, người dùng sẽ quay lại đúng câu đang làm dở ở ngoài.
  const [retryIndex, setRetryIndex] = useState(0);

  // prevRetryKeyRef stored outside render; we do NOT access .current during render.
  const prevRetryKeyRef = useRef<string>("");

  // Reset vị trí làm lại về 0 mỗi khi bắt đầu một lượt "làm lại câu sai" mới.
  // Thực hiện trong useLayoutEffect để tránh flicker trước paint.
  useLayoutEffect(() => {
    if (prevRetryKeyRef.current !== retryKey) {
      prevRetryKeyRef.current = retryKey;
      // đặt về 0 mỗi khi key thay đổi (nếu đã là 0 thì không có tác dụng)
      setRetryIndex(0);
    }
    // chỉ phụ thuộc vào retryKey và setter
  }, [retryKey, setRetryIndex]);

  const currentIndex = isRetryMode
    ? retryIndex
    : subjectId
      ? (allCurrentIndex[subjectId] ?? 0)
      : 0;

  // Điều hướng: nếu đang ở chế độ làm lại thì cập nhật state local,
  // ngược lại cập nhật currentIndex của bài thi chính trong store (giữ nguyên hành vi cũ).
  const goToIndex = (index: number) => {
    if (isRetryMode) {
      setRetryIndex(index);
    } else if (subjectId) {
      setCurrentIndex(subjectId, index);
    }
  };

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
        goToIndex(Math.max(currentIndex - 1, 0));
      } else if (e.key === "ArrowRight") {
        setShowHint(false);
        goToIndex(
          Math.min(
            currentIndex + 1,
            questions.length ? questions.length - 1 : 0,
          ),
        );
      } else if (/^[1-9]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const question = questions[currentIndex];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, currentIndex, answers, setAnswer, questions, isRetryMode]);

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
    setRetryIndex(0);
    setShowHint(false);
    setShowConfirmReset(false);
  };

  if (!subject) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#08090c] text-2xl font-semibold text-zinc-200">
        Subject not found
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#08090c] text-2xl font-semibold text-zinc-200">
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
    <div className="relative min-h-screen overflow-hidden bg-[#08090c] py-10">
      <div className="bg-ambient" />

      <div className="glass-panel relative z-10 mx-auto max-w-5xl rounded-2xl bg-zinc-900/40 p-8 shadow-2xl shadow-black/50">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              {subject.code}{" "}
              <span className="text-yellow-400">- {subject.name}</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono-brand rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-yellow-300">
              {currentIndex + 1}/{questions.length}
            </span>
            {isRetryMode && (
              <>
                <span className="rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                  Đang làm lại câu sai
                </span>
                <Link
                  to={`/exam/${subjectId}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  ← Thoát làm lại, về bài đang làm
                </Link>
              </>
            )}
            <Link
              to={`/exam/${subjectId}/results`}
              className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Xem kết quả
            </Link>
            <button
              ref={resetButtonRef}
              onClick={() => setShowConfirmReset(true)}
              className="rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-6 h-3 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-100">
              {question.question}
            </h2>

            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                {selectedAnswer === undefined ? (
                  <button
                    onClick={() => setShowHint((s) => !s)}
                    className="rounded-md border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-sm font-medium text-yellow-200 hover:bg-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
                className +=
                  "border-white/10 bg-white/[0.03] text-zinc-200 hover:border-yellow-400/40 hover:bg-yellow-400/5";
              } else if (isCorrectOption(index)) {
                className +=
                  "bg-gradient-to-r from-yellow-400 to-amber-500 border-yellow-400 text-zinc-950";
              } else if (selectedAnswer === index) {
                className += "bg-red-500/90 border-red-500 text-white";
              } else {
                className += "border-white/10 bg-white/[0.02] text-zinc-500";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={className}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 font-bold ${
                        selectedAnswer === undefined
                          ? "text-yellow-300"
                          : isCorrectOption(index)
                            ? "text-zinc-950"
                            : "text-zinc-400"
                      }`}
                    >
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
            <div className="mt-6 rounded-xl border border-yellow-400/25 bg-yellow-400/5 p-4 text-yellow-100">
              <h3 className="mb-1 font-semibold text-yellow-300">Hint</h3>
              <p>{question.hint ?? "No hint available for this question."}</p>
            </div>
          )}

          {/* Result panel shown after answering */}
          {selectedAnswer !== undefined && (
            <div
              className={`mt-6 rounded-xl p-5 ${
                userCorrect
                  ? "border border-yellow-400/30 bg-yellow-400/5 text-yellow-50"
                  : "border border-red-400/40 bg-red-500/10 text-red-50"
              }`}
            >
              <p className="mb-2">
                <strong className="text-yellow-300">Correct answer:</strong>{" "}
                {Array.isArray(question.answer)
                  ? question.answer
                      .map((i) => String.fromCharCode(65 + i))
                      .join(", ")
                  : String.fromCharCode(65 + question.answer)}
              </p>
              {question.rationale && (
                <p>
                  <strong className="text-yellow-300">Explanation:</strong>{" "}
                  {question.rationale}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Ghi chú học tập của người dùng cho môn này */}
        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-5 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-white">
            📝 Ghi chú của bạn
          </h3>
          <p className="mb-3 text-xs text-zinc-500">
            Ghi lại kiến thức, mẹo nhớ, hoặc điểm cần ôn thêm cho môn{" "}
            {subject.code}. Ghi chú được lưu tự động trên trình duyệt này.
          </p>
          <textarea
            value={note}
            onChange={(e) => subjectId && setNote(subjectId, e.target.value)}
            placeholder="Nhập ghi chú của bạn ở đây..."
            rows={4}
            className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => {
              setShowHint(false);
              goToIndex(Math.max(currentIndex - 1, 0));
            }}
            disabled={currentIndex === 0}
            className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold text-zinc-200 transition hover:border-yellow-400/30 hover:bg-white/10 disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowHint(false);
                goToIndex(Math.min(currentIndex + 1, questions.length - 1));
              }}
              disabled={currentIndex === questions.length - 1}
              className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 disabled:opacity-30 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
            className="glass-panel relative z-10 w-full max-w-md transform overflow-hidden rounded-lg bg-zinc-900/90 p-6 shadow-2xl transition-all duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="reset-title" className="text-lg font-semibold text-white">
              Reset progress
            </h3>
            <p id="reset-desc" className="mt-2 text-sm text-zinc-400">
              Bạn có chắc chắn muốn xoá toàn bộ câu trả lời đã làm? Hành động
              này không thể hoàn tác.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Cancel
              </button>

              <button
                ref={confirmButtonRef}
                onClick={doReset}
                className="rounded-md bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
