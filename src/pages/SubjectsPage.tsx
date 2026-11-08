import { useExamStore } from "../store/examStore";
import PageShell from "../components/PageShell";
import SubjectGrid from "../components/SubjectGrid";
import { hasQuiz } from "../types/Subject";

export default function SubjectsPage() {
  const allAnswers = useExamStore((s) => s.answers);

  return (
    <PageShell
      eyebrow="Môn học"
      title="Chọn môn để ôn luyện"
      subtitle="Tiến độ làm bài của từng môn được lưu lại tự động."
      backTo="/"
      backLabel="← Trang chủ"
    >
      <SubjectGrid
        filter={(s) => hasQuiz(s.examType)}
        hrefFor={(s) => `/exam/${s.id}`}
        metaFor={(s) => {
          const answered = Object.keys(allAnswers[s.id] ?? {}).length;
          const total = s.questionCount;
          return {
            badge: answered > 0 ? `${answered}/${total}` : `${total} câu`,
            progress: total > 0 ? answered / total : 0,
            cta: answered > 0 ? "Tiếp tục làm bài" : "Bắt đầu làm bài",
          };
        }}
      />
    </PageShell>
  );
}
