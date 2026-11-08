import { Link, Navigate, useParams } from "react-router-dom";
import { useEssayPrompts, useEssaySamples, useIsAdmin, useSubjectList } from "../data/hooks";
import { countWords, useEssayStore } from "../store/essayStore";
import PageShell from "../components/PageShell";
import { ErrorBox, Loading } from "../components/LoadState";
import { ghostBtn, panel } from "../components/adminStyles";

export default function EssayListPage() {
  const { subjectId } = useParams();
  const list = useSubjectList();
  const prompts = useEssayPrompts(subjectId);
  const samples = useEssaySamples(subjectId);
  const drafts = useEssayStore((s) => s.drafts);
  const { isAdmin } = useIsAdmin();

  const subject = list.data?.find((s) => s.id === subjectId);
  if (list.data && !subject) return <Navigate to="/essays" replace />;

  const failed = prompts.isError ? prompts : samples.isError ? samples : null;
  const loading = prompts.isPending || samples.isPending;
  const standalone = (samples.data ?? []).filter((s) => s.promptId === null);
  const sampleCountFor = (promptId: number) =>
    (samples.data ?? []).filter((s) => s.promptId === promptId).length;

  return (
    <PageShell
      eyebrow={subject?.code ?? "Thi viết"}
      title={subject?.name ?? "Đề thi viết"}
      subtitle="Chọn một đề để đọc và viết bài của bạn."
      backTo="/essays"
      backLabel="← Chọn môn"
    >
      {isAdmin && (
        <div className="mb-6 text-right">
          <Link to={`/admin/subjects/${subjectId}/essays`} className={`${ghostBtn} inline-block`}>
            Quản lý đề & bài mẫu
          </Link>
        </div>
      )}

      {failed ? (
        <ErrorBox error={failed.error} onRetry={() => failed.refetch()} />
      ) : loading ? (
        <Loading />
      ) : (
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-yellow-300">Đề thi</h2>
            {(prompts.data ?? []).length === 0 ? (
              <p className={`${panel} text-center text-zinc-400`}>Môn này chưa có đề viết.</p>
            ) : (
              prompts.data!.map((p, i) => {
                const draft = drafts[p.id];
                const words = draft ? countWords(draft.text) : 0;
                const samplesN = sampleCountFor(p.id);
                return (
                  <Link
                    key={p.id}
                    to={`/essays/${subjectId}/${p.id}`}
                    className={`${panel} glow-hover block`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-mono-brand text-xs text-zinc-500">Đề {i + 1}</p>
                        <h3 className="text-xl font-bold text-yellow-300">{p.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{p.prompt}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-mono-brand rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                          {words > 0 ? `${words} từ` : "Chưa viết"}
                        </span>
                        {samplesN > 0 && (
                          <span className="text-xs text-zinc-500">{samplesN} bài mẫu</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </section>

          {standalone.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-yellow-300">Bài mẫu để học cách viết</h2>
              {standalone.map((s) => (
                <Link
                  key={s.id}
                  to={`/essays/${subjectId}/sample/${s.id}`}
                  className={`${panel} glow-hover block`}
                >
                  <h3 className="text-lg font-bold text-yellow-300">{s.title}</h3>
                  {s.outline && (
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{s.outline}</p>
                  )}
                </Link>
              ))}
            </section>
          )}
        </div>
      )}
    </PageShell>
  );
}
