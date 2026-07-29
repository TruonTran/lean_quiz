import { useParams } from "react-router-dom";
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

  const answers = subjectId ? (allAnswers[subjectId] ?? {}) : {};
  const currentIndex = subjectId ? (allCurrentIndex[subjectId] ?? 0) : 0;

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

  const answeredCount = Object.keys(answers).length;

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {subject.code} - {subject.name}
          </h1>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-sm text-gray-500">
            <span>
              Question {currentIndex + 1}/{questions.length}
            </span>

            <span>
              Answered {answeredCount}/{questions.length}
            </span>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let className =
                "w-full rounded-xl border p-4 text-left transition font-medium ";

              if (selectedAnswer === undefined) {
                className += "hover:bg-blue-50 hover:border-blue-400";
              } else if (isCorrectOption(index)) {
                className += "bg-green-500 border-green-500 text-white";
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
                  <span className="mr-2 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>

                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== undefined && (
            <div
              className={`mt-6 rounded-xl p-5 ${
                userCorrect
                  ? "border border-green-400 bg-green-100"
                  : "border border-red-400 bg-red-100"
              }`}
            >
              <h3 className="mb-2 text-lg font-bold">
                {userCorrect ? "✅ Correct" : "❌ Incorrect"}
              </h3>

              <p className="mb-2">
                <strong>Correct answer:</strong>{" "}
                {Array.isArray(question.answer)
                  ? question.answer
                      .map((i) => String.fromCharCode(65 + i))
                      .join(", ")
                  : String.fromCharCode(65 + question.answer)}
              </p>

              {question.hint && (
                <p className="mb-2">
                  💡 <strong>Hint:</strong> {question.hint}
                </p>
              )}

              {question.rationale && (
                <p>
                  📖 <strong>Explanation:</strong> {question.rationale}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() =>
              subjectId &&
              setCurrentIndex(subjectId, Math.max(currentIndex - 1, 0))
            }
            disabled={currentIndex === 0}
            className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() =>
              subjectId &&
              setCurrentIndex(
                subjectId,
                Math.min(currentIndex + 1, questions.length - 1),
              )
            }
            disabled={currentIndex === questions.length - 1}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
