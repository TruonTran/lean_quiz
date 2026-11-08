import { useEssayStore } from "../store/essayStore";
import PageShell from "../components/PageShell";
import SubjectGrid from "../components/SubjectGrid";
import { hasEssay } from "../types/Subject";

export default function EssaySubjectsPage() {
  const drafts = useEssayStore((s) => s.drafts);

  return (
    <PageShell
      eyebrow="Thi viết"
      title="Chọn môn để luyện viết"
      subtitle="Bài viết của bạn được lưu ngay trên trình duyệt này."
      backTo="/"
      backLabel="← Trang chủ"
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
            cta: written > 0 ? "Tiếp tục viết" : "Xem đề",
          };
        }}
      />
    </PageShell>
  );
}
