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
      <div className="flex h-screen items-center justify-center text-2xl font-semibold">
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
    <div className="min-h-screen bg-amber-50 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-amber-800">
            Kết quả - {subject.code}
          </h1>
          <Link
            to={`/exam/${subjectId}`}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 hover:bg-amber-50"
          >
            ← Quay lại bài làm
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-amber-50 p-4 text-center ring-1 ring-amber-100">
            <div className="text-3xl font-extrabold text-amber-700">
              {scorePct}%
            </div>
            <div className="mt-1 text-sm text-amber-800">Độ chính xác</div>
          </div>
          <div className="rounded-xl bg-amber-50 p-4 text-center ring-1 ring-amber-100">
            <div className="text-3xl font-extrabold text-amber-700">
              {correctCount}
            </div>
            <div className="mt-1 text-sm text-amber-800">Câu đúng</div>
          </div>
          <div className="rounded-xl bg-red-50 p-4 text-center ring-1 ring-red-100">
            <div className="text-3xl font-extrabold text-red-600">
              {wrongQuestions.length}
            </div>
            <div className="mt-1 text-sm text-red-700">Câu sai</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 text-center ring-1 ring-gray-200">
            <div className="text-3xl font-extrabold text-gray-600">
              {unanswered}
            </div>
            <div className="mt-1 text-sm text-gray-700">Chưa làm</div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={reviewWrongOnly}
            disabled={wrongQuestions.length === 0}
            className="rounded-lg bg-amber-600 px-5 py-2.5 font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Làm lại câu sai ({wrongQuestions.length})
          </button>
          <button
            onClick={() => {
              clearExam(subjectId);
              navigate(`/exam/${subjectId}`);
            }}
            className="rounded-lg bg-white px-5 py-2.5 font-semibold text-amber-700 ring-1 ring-amber-200 hover:bg-amber-50"
          >
            Làm lại từ đầu
          </button>
        </div>

        <h2 className="mb-3 text-lg font-semibold text-amber-900">
          Danh sách câu trả lời sai
        </h2>

        {wrongQuestions.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            {answeredCount === 0
              ? "Bạn chưa trả lời câu nào."
              : "Tuyệt vời! Không có câu nào sai trong số các câu đã làm."}
          </p>
        ) : (
          <ul className="space-y-3">
            {wrongQuestions.map(({ q, index }) => (
              <li
                key={q.id}
                className="rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Câu {index + 1}: {q.question}
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Bạn chọn:{" "}
                      <span className="font-semibold text-red-600">
                        {String.fromCharCode(65 + answers[q.id])}
                      </span>{" "}
                      — Đáp án đúng:{" "}
                      <span className="font-semibold text-amber-700">
                        {Array.isArray(q.answer)
                          ? q.answer
                              .map((i) => String.fromCharCode(65 + i))
                              .join(", ")
                          : String.fromCharCode(65 + q.answer)}
                      </span>
                    </p>
                    {q.rationale && (
                      <p className="mt-1 text-sm text-gray-600">
                        {q.rationale}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => jumpTo(index)}
                    className="shrink-0 rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-700"
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
