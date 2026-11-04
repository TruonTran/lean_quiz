import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuestionsByIds, useSubjectList } from "../data/hooks";
import { useExamStore } from "../store/examStore";
import type { SubjectInfo } from "../types/Subject";
import { ErrorBox, Loading } from "../components/LoadState";

function SubjectNotes({ subject }: { subject: SubjectInfo }) {
  const subjectNotes = useExamStore((s) => s.notes[subject.id]);
  const setNote = useExamStore((s) => s.setNote);

  const ids = useMemo(
    () =>
      Object.entries(subjectNotes ?? {})
        .filter(([, text]) => text.trim().length > 0)
        .map(([id]) => Number(id))
        .sort((a, b) => a - b),
    [subjectNotes],
  );

  // Chỉ tải đúng những câu có ghi chú, không tải cả bộ đề
  const { data: questions } = useQuestionsByIds(subject.id, ids);
  const byId = new Map((questions ?? []).map((q) => [q.id, q]));

  return (
    <div className="glass-panel rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">
          {subject.code}{" "}
          <span className="font-normal text-zinc-400">- {subject.name}</span>
        </h2>

        <Link
          to={`/exam/${subject.id}`}
          className="shrink-0 rounded-lg border border-yellow-400/25 bg-white/5 px-3 py-1.5 text-xs font-semibold text-yellow-200 transition hover:bg-white/10"
        >
          Vào ôn tập →
        </Link>
      </div>

      {ids.length === 0 ? (
        <p className="text-sm text-zinc-500">Chưa có ghi chú nào cho môn này.</p>
      ) : (
        <div className="space-y-4">
          {ids.map((id) => (
            <div
              key={id}
              className="rounded-lg border border-white/10 bg-black/30 p-4"
            >
              <p className="mb-2 text-sm font-medium text-yellow-200">
                Câu {id}:{" "}
                <span className="font-normal text-zinc-300">
                  {byId.get(id)?.question ?? "(đang tải câu hỏi…)"}
                </span>
              </p>
              <textarea
                value={subjectNotes?.[id] ?? ""}
                onChange={(e) => setNote(subject.id, id, e.target.value)}
                rows={3}
                className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NotesPage() {
  const { data, isPending, isError, error, refetch } = useSubjectList();

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
              Ghi chú theo từng câu hỏi, gộp theo môn. Lưu trên trình duyệt này.
            </p>
          </div>

          <Link
            to="/"
            className="shrink-0 rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            ← Trang chủ
          </Link>
        </div>

        {isPending ? (
          <Loading />
        ) : isError ? (
          <ErrorBox error={error} onRetry={() => refetch()} />
        ) : (
          <div className="space-y-6">
            {data.map((subject) => (
              <SubjectNotes key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
