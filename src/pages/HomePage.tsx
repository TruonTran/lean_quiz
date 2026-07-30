import { Link } from "react-router-dom";
import { subjects } from "../data/subjects";
import { useExamStore } from "../store/examStore";

export default function HomePage() {
  const allAnswers = useExamStore((state) => state.answers);

  return (
    <div className="min-h-screen bg-amber-50 p-10">
      <h1 className="mb-8 text-4xl font-bold text-center text-amber-900">
        Quiz Platform
      </h1>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const answered = Object.keys(allAnswers[subject.id] ?? {}).length;
          const total = subject.questions.length;
          const started = answered > 0;

          return (
            <Link
              key={subject.id}
              to={`/exam/${subject.id}`}
              className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-2xl font-bold text-amber-700">
                  {subject.code}
                </h2>
                {started && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    {answered}/{total}
                  </span>
                )}
              </div>

              <p className="mt-2 text-amber-600">{subject.name}</p>

              {started && (
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${(answered / total) * 100}%` }}
                  />
                </div>
              )}

              <button className="mt-5 w-full rounded-lg bg-amber-600 py-2 text-white hover:bg-amber-700">
                {started ? "Tiếp tục làm bài" : "Start Exam"}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
