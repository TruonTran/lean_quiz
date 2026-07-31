import { Link } from "react-router-dom";
import { subjects } from "../data/subjects";
import { useExamStore } from "../store/examStore";

export default function HomePage() {
  const allAnswers = useExamStore((state) => state.answers);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090c] p-6 sm:p-10">
      <div className="bg-ambient" />

      <div className="relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="font-mono-brand inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-yellow-300">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_theme(colors.yellow.400)]" />
            Nền tảng ôn luyện
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            Quiz{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Cùng T
            </span>
          </h1>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            Chọn môn học bên dưới để bắt đầu ôn tập và theo dõi tiến độ của bạn.
          </p>

          <Link
            to="/notes"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            📝 Ghi chú của bạn
          </Link>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const answered = Object.keys(allAnswers[subject.id] ?? {}).length;
            const total = subject.questions.length;
            const started = answered > 0;

            return (
              <Link
                key={subject.id}
                to={`/exam/${subject.id}`}
                className="glass-panel glow-hover group relative overflow-hidden rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

                <div className="relative flex items-start justify-between gap-2">
                  <h2 className="text-2xl font-bold text-yellow-300">
                    {subject.code}
                  </h2>
                  {started && (
                    <span className="font-mono-brand shrink-0 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                      {answered}/{total}
                    </span>
                  )}
                </div>

                <p className="relative mt-2 text-zinc-400">{subject.name}</p>

                {started && (
                  <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                      style={{ width: `${(answered / total) * 100}%` }}
                    />
                  </div>
                )}

                <button className="relative mt-5 w-full rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 py-2 font-semibold text-zinc-950 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-yellow-500/20">
                  {started ? "Tiếp tục làm bài" : "Start Exam"}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
