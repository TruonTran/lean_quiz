import { Navigate, useParams } from "react-router-dom";
import { useIsAdmin, useSubjectList, useSummary } from "../data/hooks";
import PageShell from "../components/PageShell";
import SubjectGrid from "../components/SubjectGrid";
import { hasQuiz } from "../types/Subject";
import SummaryEditor from "../components/SummaryEditor";
import { ErrorBox, Loading } from "../components/LoadState";

function SummaryIndex() {
  return (
    <PageShell
      eyebrow="Tóm tắt kiến thức"
      title="Chọn môn để xem tóm tắt"
      subtitle="Ôn nhanh các mẹo và ý chính trước khi làm bài."
      backTo="/"
      backLabel="← Trang chủ"
    >
      <SubjectGrid
        filter={(s) => hasQuiz(s.examType)}
        hrefFor={(s) => `/summary/${s.id}`}
        metaFor={(s) => ({
          badge: s.summaryCount > 0 ? `${s.summaryCount} chủ đề` : "Sắp có",
          cta: "Xem tóm tắt",
        })}
      />
    </PageShell>
  );
}

function SummaryDetail({ subjectId }: { subjectId: string }) {
  const list = useSubjectList();
  const summary = useSummary(subjectId);
  const { isAdmin } = useIsAdmin();

  const subject = list.data?.find((s) => s.id === subjectId);
  // Môn chỉ thi viết không có phần tóm tắt kiến thức
  if (list.data && (!subject || !hasQuiz(subject.examType))) {
    return <Navigate to="/summary" replace />;
  }

  const failed = list.isError ? list : summary.isError ? summary : null;

  return (
    <PageShell
      eyebrow={subject?.code ?? "Tóm tắt"}
      title={subject ? `Tóm tắt — ${subject.name}` : "Tóm tắt kiến thức"}
      backTo="/summary"
      backLabel="← Chọn môn khác"
    >
      {failed ? (
        <ErrorBox error={failed.error} onRetry={() => failed.refetch()} />
      ) : !summary.data || !subject ? (
        <Loading />
      ) : (
        <SummaryEditor
          subjectId={subjectId}
          sections={summary.data}
          isAdmin={isAdmin}
        />
      )}
    </PageShell>
  );
}

/** /summary → chọn môn; /summary/:subjectId → nội dung tóm tắt của môn đó. */
export default function SummaryPage() {
  const { subjectId } = useParams<{ subjectId?: string }>();
  return subjectId ? <SummaryDetail subjectId={subjectId} /> : <SummaryIndex />;
}
