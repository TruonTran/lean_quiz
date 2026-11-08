import { Link } from "react-router-dom";
import { useSubjectList } from "../data/hooks";
import type { SubjectInfo } from "../types/Subject";
import { ErrorBox, Loading } from "./LoadState";

export type SubjectMeta = {
  badge?: string; // chip nhỏ góc phải (vd: 12/150)
  progress?: number; // 0–1, hiện thanh tiến độ nếu có
  cta: string;
};

type Props = {
  hrefFor: (subject: SubjectInfo) => string;
  metaFor: (subject: SubjectInfo) => SubjectMeta;
  /** Chỉ hiện các môn thoả điều kiện (vd: môn có trắc nghiệm). */
  filter?: (subject: SubjectInfo) => boolean;
};

/** Lưới chọn môn dùng chung cho "Môn học" và "Tóm tắt kiến thức". */
export default function SubjectGrid({ hrefFor, metaFor, filter }: Props) {
  const { data: all, isPending, isError, error, refetch } = useSubjectList();
  const data = filter ? all?.filter(filter) : all;

  if (isPending) return <Loading label="Đang tải danh sách môn…" />;
  if (isError) return <ErrorBox error={error} onRetry={() => refetch()} />;
  if (!data || data.length === 0) {
    return (
      <p className="glass-panel mx-auto max-w-xl rounded-2xl bg-zinc-900/40 p-8 text-center text-zinc-400">
        {all && all.length > 0 ? (
          "Chưa có môn nào ở mục này. Admin có thể chọn kiểu thi cho môn trong Quản lý môn."
        ) : (
          <>
            Chưa có môn nào trong cơ sở dữ liệu. Hãy chạy{" "}
            <code className="text-yellow-300">npm run db:migrate</code> để nạp dữ liệu.
          </>
        )}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((subject, i) => {
        const meta = metaFor(subject);

        return (
          <Link
            key={subject.id}
            to={hrefFor(subject)}
            className="glass-panel glow-hover fade-up group relative overflow-hidden rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40"
            style={{ animationDelay: `${0.25 + i * 0.08}s` }}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-400/10 opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-2">
              <h2 className="text-2xl font-bold text-yellow-300">
                {subject.code}
              </h2>
              {meta.badge && (
                <span className="font-mono-brand shrink-0 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                  {meta.badge}
                </span>
              )}
            </div>

            <p className="relative mt-2 text-zinc-400">{subject.name}</p>

            {meta.progress !== undefined && meta.progress > 0 && (
              <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                  style={{ width: `${Math.min(1, meta.progress) * 100}%` }}
                />
              </div>
            )}

            <span className="shine-sweep relative mt-5 block w-full rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 py-2 text-center font-semibold text-zinc-950 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-yellow-500/20">
              {meta.cta}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
