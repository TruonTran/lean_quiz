import { Navigate, useParams } from "react-router-dom";
import { useEssaySamples } from "../data/hooks";
import PageShell from "../components/PageShell";
import Markdown from "../components/Markdown";
import { ErrorBox, Loading } from "../components/LoadState";
import { panel } from "../components/adminStyles";

/** Đọc một bài mẫu đứng riêng (không gắn với đề nào). */
export default function EssaySamplePage() {
  const { subjectId, sampleId } = useParams();
  const samples = useEssaySamples(subjectId);
  const sample = samples.data?.find((s) => String(s.id) === sampleId);

  if (samples.data && !sample) return <Navigate to={`/essays/${subjectId}`} replace />;

  return (
    <PageShell
      eyebrow="Bài mẫu"
      title={sample?.title ?? "Bài mẫu"}
      backTo={`/essays/${subjectId}`}
      backLabel="← Danh sách đề"
    >
      {samples.isError ? (
        <ErrorBox error={samples.error} onRetry={() => samples.refetch()} />
      ) : !sample ? (
        <Loading />
      ) : (
        <div className="space-y-5">
          {sample.outline && (
            <div className={panel}>
              <h2 className="mb-2 font-bold text-yellow-300">Dàn ý</h2>
              <Markdown>{sample.outline}</Markdown>
            </div>
          )}
          <div className={panel}>
            <Markdown>{sample.content}</Markdown>
          </div>
        </div>
      )}
    </PageShell>
  );
}
