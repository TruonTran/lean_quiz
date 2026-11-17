import { Link } from "react-router-dom";
import { useSubjectList } from "../data/hooks";
import { useAdminUsers } from "../data/adminUsers";
import { EXAM_TYPE_LABEL, hasEssay, hasQuiz, semesterLabel } from "../types/Subject";
import PageShell from "../components/PageShell";
import { ErrorBox, Loading } from "../components/LoadState";
import { ghostBtn, panel, primaryBtn } from "../components/adminStyles";

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className={panel}>
      <p className="font-mono-brand text-xs uppercase tracking-widest text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-yellow-300">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export default function AdminOverviewPage() {
  const subjects = useSubjectList();
  const users = useAdminUsers();

  const list = subjects.data ?? [];
  const totalQuestions = list.reduce((s, x) => s + x.questionCount, 0);
  const totalSummaries = list.reduce((s, x) => s + x.summaryCount, 0);
  const admins = users.data?.filter((u) => u.isAdmin).length ?? 0;

  return (
    <PageShell eyebrow="Tông Môn Quản Sự" title="Dashboard" subtitle="Khái quát tình hình Tông Môn, Tàng Kinh Các và toàn bộ Đệ Tử.">
      <div className="space-y-8">
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="Môn học" value={subjects.data ? list.length : "…"} />
          <Stat label="Câu hỏi" value={subjects.data ? totalQuestions.toLocaleString("vi-VN") : "…"} hint="Trắc nghiệm, mọi môn" />
          <Stat label="Chủ đề tóm tắt" value={subjects.data ? totalSummaries : "…"} />
          <Stat
            label="Tài khoản"
            value={users.data ? users.data.length : users.isError ? "—" : "…"}
            hint={users.data ? `${admins} admin` : users.isError ? "Chưa cài SQL quản lý tài khoản" : undefined}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-yellow-300">Thao tác nhanh</h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/subjects" className={primaryBtn}>
              + Thêm / sửa môn
            </Link>
            <Link to="/admin/questions" className={`${ghostBtn} inline-flex items-center !px-5 !py-2 !text-sm`}>
              Quản lý câu hỏi
            </Link>
            <Link to="/admin/essays" className={`${ghostBtn} inline-flex items-center !px-5 !py-2 !text-sm`}>
              Quản lý đề thi viết
            </Link>
            <Link to="/admin/users" className={`${ghostBtn} inline-flex items-center !px-5 !py-2 !text-sm`}>
              Quản lý tài khoản
            </Link>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-yellow-300">Các môn</h2>
          {subjects.isPending ? (
            <Loading />
          ) : subjects.isError ? (
            <ErrorBox error={subjects.error} onRetry={() => subjects.refetch()} />
          ) : list.length === 0 ? (
            <p className={`${panel} text-center text-zinc-400`}>Chưa có môn nào.</p>
          ) : (
            <div className={`${panel} overflow-x-auto p-0`}>
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">Môn</th>
                    <th className="px-4 py-3">Kì</th>
                    <th className="px-4 py-3">Kiểu thi</th>
                    <th className="px-4 py-3 text-right">Câu hỏi</th>
                    <th className="px-4 py-3 text-right">Tóm tắt</th>
                    <th className="px-4 py-3 text-right">Quản lý</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s.id} className="border-t border-white/5 text-zinc-300">
                      <td className="px-4 py-2.5">
                        <span className="font-semibold text-yellow-300">{s.code}</span>
                        <span className="ml-2 text-zinc-400">{s.name}</span>
                      </td>
                      <td className="px-4 py-2.5">{semesterLabel(s.semester)}</td>
                      <td className="px-4 py-2.5">{EXAM_TYPE_LABEL[s.examType]}</td>
                      <td className="px-4 py-2.5 text-right">{hasQuiz(s.examType) ? s.questionCount : "–"}</td>
                      <td className="px-4 py-2.5 text-right">{hasQuiz(s.examType) ? s.summaryCount : "–"}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex flex-wrap justify-end gap-2">
                          {hasQuiz(s.examType) && (
                            <Link to={`/admin/subjects/${s.id}/questions`} className={ghostBtn}>
                              Câu hỏi
                            </Link>
                          )}
                          {hasEssay(s.examType) && (
                            <Link to={`/admin/subjects/${s.id}/essays`} className={ghostBtn}>
                              Thi viết
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}
