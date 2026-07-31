import { Link } from "react-router-dom";
import { subjects } from "../data/subjects";
import { useExamStore } from "../store/examStore";

export default function NotesPage() {
  const notes = useExamStore((state) => state.notes);
  const setNote = useExamStore((state) => state.setNote);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090c] py-10">
      <div className="bg-ambient" />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              📝 Ghi chú của bạn
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Toàn bộ ghi chú cho tất cả các môn, ở đây bạn có nhiều chỗ hơn để
              viết.
            </p>
          </div>

          <Link
            to="/"
            className="shrink-0 rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            ← Trang chủ
          </Link>
        </div>

        <div className="space-y-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="glass-panel rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">
                  {subject.code}{" "}
                  <span className="font-normal text-zinc-400">
                    - {subject.name}
                  </span>
                </h2>

                <Link
                  to={`/exam/${subject.id}`}
                  className="shrink-0 rounded-lg border border-yellow-400/25 bg-white/5 px-3 py-1.5 text-xs font-semibold text-yellow-200 transition hover:bg-white/10"
                >
                  Vào ôn tập →
                </Link>
              </div>

              <textarea
                value={notes[subject.id] ?? ""}
                onChange={(e) => setNote(subject.id, e.target.value)}
                placeholder="Nhập ghi chú của bạn ở đây..."
                rows={8}
                className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
