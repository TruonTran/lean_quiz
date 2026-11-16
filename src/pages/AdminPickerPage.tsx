import { useState } from "react";
import { Link } from "react-router-dom";
import { useSubjectList } from "../data/hooks";
import { hasEssay, hasQuiz, semesterLabel, type SubjectInfo } from "../types/Subject";
import PageShell from "../components/PageShell";
import { ErrorBox, Loading } from "../components/LoadState";
import { inputClass, panel, primaryBtn } from "../components/adminStyles";

type Kind = "questions" | "essays" | "summaries";

const CONFIG: Record<
  Kind,
  {
    title: string;
    subtitle: string;
    filter: (s: SubjectInfo) => boolean;
    href: (s: SubjectInfo) => string;
    cta: string;
    meta: (s: SubjectInfo) => string;
    empty: string;
  }
> = {
  questions: {
    title: "Câu hỏi trắc nghiệm",
    subtitle: "Chọn môn để thêm, sửa, xoá hoặc nhập hàng loạt câu hỏi.",
    filter: (s) => hasQuiz(s.examType),
    href: (s) => `/admin/subjects/${s.id}/questions`,
    cta: "Quản lý câu hỏi",
    meta: (s) => `${s.questionCount} câu hỏi`,
    empty: "Chưa có môn nào có phần trắc nghiệm.",
  },
  essays: {
    title: "Đề thi viết",
    subtitle: "Chọn môn để quản lý đề tự luận và bài mẫu.",
    filter: (s) => hasEssay(s.examType),
    href: (s) => `/admin/subjects/${s.id}/essays`,
    cta: "Quản lý đề viết",
    meta: () => "Thi viết",
    empty: "Chưa có môn nào có phần thi viết. Vào Môn học và đổi kiểu thi của môn sang “Thi viết” hoặc “Cả hai”.",
  },
  summaries: {
    title: "Tóm tắt kiến thức",
    subtitle: "Chọn môn rồi chỉnh sửa tại trang tóm tắt (tài khoản admin sẽ thấy nút thêm / sửa / xoá / đổi thứ tự).",
    filter: (s) => hasQuiz(s.examType),
    href: (s) => `/summary/${s.id}`,
    cta: "Mở trang tóm tắt",
    meta: (s) => (s.summaryCount > 0 ? `${s.summaryCount} chủ đề` : "Chưa có chủ đề"),
    empty: "Chưa có môn nào.",
  },
};

export default function AdminPickerPage({ kind }: { kind: Kind }) {
  const cfg = CONFIG[kind];
  const { data, isPending, isError, error, refetch } = useSubjectList();
  const [search, setSearch] = useState("");

  const t = search.trim().toLowerCase();
  const list = (data ?? [])
    .filter(cfg.filter)
    .filter((s) => !t || s.code.toLowerCase().includes(t) || s.name.toLowerCase().includes(t));

  return (
    <PageShell eyebrow="Quản trị" title={cfg.title} subtitle={cfg.subtitle}>
      <div className="space-y-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm môn theo mã hoặc tên…"
          className={inputClass}
          aria-label="Tìm môn"
        />

        {isPending ? (
          <Loading />
        ) : isError ? (
          <ErrorBox error={error} onRetry={() => refetch()} />
        ) : list.length === 0 ? (
          <p className={`${panel} text-center text-zinc-400`}>{t ? "Không có môn nào khớp." : cfg.empty}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {list.map((s) => (
              <div key={s.id} className={`${panel} flex flex-col gap-3`}>
                <div>
                  <h2 className="text-xl font-bold text-yellow-300">{s.code}</h2>
                  <p className="text-sm text-zinc-400">{s.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {semesterLabel(s.semester)} · {cfg.meta(s)}
                  </p>
                </div>
                <Link to={cfg.href(s)} className={`${primaryBtn} self-start`}>
                  {cfg.cta} →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
