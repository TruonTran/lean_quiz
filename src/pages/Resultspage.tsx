import { Link, useParams, useNavigate } from "react-router-dom";
import { getSubjectById } from "../data/subjects";
import { useExamStore } from "../store/examStore";

function isCorrect(question: { answer: number | number[] }, selected: number) {
  return Array.isArray(question.answer)
    ? question.answer.includes(selected)
    : question.answer === selected;
}

export default function ResultsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const subject = getSubjectById(subjectId ?? "");

  const allAnswers = useExamStore((state) => state.answers);
  const setCurrentIndex = useExamStore((state) => state.setCurrentIndex);
  const clearExam = useExamStore((state) => state.clearExam);
  const clearAnswers = useExamStore((state) => state.clearAnswers);

  if (!subject || !subjectId) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#08090c] text-2xl font-semibold text-zinc-200">
        Subject not found
      </div>
    );
  }

  const answers = allAnswers[subjectId] ?? {};
  const questions = subject.questions;
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter(
    (q) => answers[q.id] !== undefined && isCorrect(q, answers[q.id]),
  ).length;
  const wrongQuestions = questions
    .map((q, index) => ({ q, index }))
    .filter(
      ({ q }) => answers[q.id] !== undefined && !isCorrect(q, answers[q.id]),
    );

  const unanswered = questions.length - answeredCount;
  const scorePct =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const jumpTo = (index: number) => {
    setCurrentIndex(subjectId, index);
    navigate(`/exam/${subjectId}`);
  };

  const reviewWrongOnly = () => {
    if (wrongQuestions.length === 0) return;

    const retryIds = wrongQuestions.map(({ q }) => q.id);

    // Mở lại các câu đã trả lời sai để người học có thể chọn lại đáp án
    clearAnswers(subjectId, retryIds);
    setCurrentIndex(subjectId, 0);

    navigate(`/exam/${subjectId}`, { state: { retryIds } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090c] py-10">
      <div className="bg-ambient" />

      <div className="glass-panel relative z-10 mx-auto max-w-4xl rounded-2xl bg-zinc-900/40 p-8 shadow-2xl shadow-black/50">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-white">
            Kết quả -{" "}
            <span className="text-yellow-400">{subject.code}</span>
          </h1>
          <Link
            to={`/exam/${subjectId}`}
            className="rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            ← Quay lại bài làm
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-yellow-400/15 bg-yellow-400/5 p-4 text-center">
            <div className="text-3xl font-extrabold text-yellow-300">
              {scorePct}%
            </div>
            <div className="mt-1 text-sm text-yellow-100/80">
              Độ chính xác
            </div>
          </div>
          <div className="rounded-xl border border-yellow-400/15 bg-yellow-400/5 p-4 text-center">
            <div className="text-3xl font-extrabold text-yellow-300">
              {correctCount}
            </div>
            <div className="mt-1 text-sm text-yellow-100/80">Câu đúng</div>
          </div>
          <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-center">
            <div className="text-3xl font-extrabold text-red-400">
              {wrongQuestions.length}
            </div>
            <div className="mt-1 text-sm text-red-200/80">Câu sai</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <div className="text-3xl font-extrabold text-zinc-300">
              {unanswered}
            </div>
            <div className="mt-1 text-sm text-zinc-400">Chưa làm</div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={reviewWrongOnly}
            disabled={wrongQuestions.length === 0}
            className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2.5 font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
          >
            Làm lại câu sai ({wrongQuestions.length})
          </button>
          <button
            onClick={() => {
              clearExam(subjectId);
              navigate(`/exam/${subjectId}`);
            }}
            className="rounded-lg border border-yellow-400/25 bg-white/5 px-5 py-2.5 font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            Làm lại từ đầu
          </button>
        </div>

        <h2 className="mb-3 text-lg font-semibold text-white">
          Danh sách câu trả lời sai
        </h2>

        {wrongQuestions.length === 0 ? (
          <p className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4 text-yellow-100">
            {answeredCount === 0
              ? "Bạn chưa trả lời câu nào."
              : "Tuyệt vời! Không có câu nào sai trong số các câu đã làm."}
          </p>
        ) : (
          <ul className="space-y-3">
            {wrongQuestions.map(({ q, index }) => (
              <li
                key={q.id}
                className="rounded-xl border border-red-400/20 bg-red-500/[0.06] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-zinc-100">
                      Câu {index + 1}: {q.question}
                    </p>
                    <p className="mt-1 text-sm text-zinc-400">
                      Bạn chọn:{" "}
                      <span className="font-semibold text-red-400">
                        {String.fromCharCode(65 + answers[q.id])}
                      </span>{" "}
                      — Đáp án đúng:{" "}
                      <span className="font-semibold text-yellow-300">
                        {Array.isArray(q.answer)
                          ? q.answer
                              .map((i) => String.fromCharCode(65 + i))
                              .join(", ")
                          : String.fromCharCode(65 + q.answer)}
                      </span>
                    </p>
                    {q.rationale && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {q.rationale}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => jumpTo(index)}
                    className="shrink-0 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20"
                  >
                    Xem lại
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
