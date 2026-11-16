import { useExamStore } from "../store/examStore";
import PageShell from "../components/PageShell";
import SubjectGrid from "../components/SubjectGrid";
import { hasQuiz } from "../types/Subject";

export default function SubjectsPage() {
  const allAnswers = useExamStore((s) => s.answers);

  return (
    <PageShell
      eyebrow="Môn học"
      title="Buffet câu hỏi"
      subtitle="Vô tới đây r còn ko chọn môn mà học đi."
      backTo="/"
      backLabel="Về cửa động"
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
            cta: answered > 0 ? "Tiếp tục cày cuốc" : "Làm đề này nè",
          };
        }}
      />
    </PageShell>
  );
}
