import { useEssayStore } from "../store/essayStore";
import PageShell from "../components/PageShell";
import SubjectGrid from "../components/SubjectGrid";
import { hasEssay } from "../types/Subject";

export default function EssaySubjectsPage() {
  const drafts = useEssayStore((s) => s.drafts);

  return (
    <PageShell
      eyebrow="Thi viết"
      title="Chọn môn để luyện trình động não"
      subtitle="Có công tu luyện có ngày thành công 'cóc'."
      backTo="/"
      backLabel="Ra tiền sảnh"
    >
      <SubjectGrid
        filter={(s) => hasEssay(s.examType)}
        hrefFor={(s) => `/essays/${s.id}`}
        metaFor={(s) => {
          const written = Object.values(drafts).filter(
            (d) => d.subjectId === s.id && d.text.trim(),
          ).length;
          return {
            badge: written > 0 ? `${written} bài đã viết` : undefined,
            cta: written > 0 ? "Luyện công tiếp" : "Mở chân kinh",
          };
        }}
      />
    </PageShell>
  );
}
