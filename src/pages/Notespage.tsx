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
              Ghi chú theo từng câu hỏi, gộp theo môn.
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
          {subjects.map((subject) => {
            const subjectNotes = notes[subject.id] ?? {};
            const noteEntries = subject.questions
              .map((q) => ({ question: q, text: subjectNotes[q.id] ?? "" }))
              .filter((entry) => entry.text.trim().length > 0);

            return (
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

                {noteEntries.length === 0 ? (
                  <p className="text-sm text-zinc-500">
                    Chưa có ghi chú nào cho môn này.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {noteEntries.map(({ question, text }) => (
                      <div
                        key={question.id}
                        className="rounded-lg border border-white/10 bg-black/30 p-4"
                      >
                        <p className="mb-2 text-sm font-medium text-yellow-200">
                          Câu {subject.questions.indexOf(question) + 1}:{" "}
                          <span className="font-normal text-zinc-300">
                            {question.question}
                          </span>
                        </p>
                        <textarea
                          value={text}
                          onChange={(e) =>
                            setNote(subject.id, question.id, e.target.value)
                          }
                          rows={3}
                          className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
