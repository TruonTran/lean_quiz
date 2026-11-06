import { useMemo, useState } from "react";
import { useSummary } from "../data/hooks";
import { errMsg } from "../data/api";
import { useExamTheme } from "../theme/ThemeContext";
import type { SummarySection } from "../types/Subject";

type Props = {
  subjectId: string;
  open: boolean;
  onClose: () => void;
};

/** Bỏ dấu + chữ thường để tìm "co so" vẫn ra "Cơ sở". */
const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();

function SummaryBody({ subjectId, onClose }: { subjectId: string; onClose: () => void }) {
  const { theme } = useExamTheme();
  const summary = useSummary(subjectId);
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const sections: SummarySection[] = useMemo(() => {
    const all = summary.data ?? [];
    const q = norm(query.trim());
    if (!q) return all;
    return all.filter(
      (s) => norm(s.title).includes(q) || s.points.some((p) => norm(p).includes(q)),
    );
  }, [summary.data, query]);

  const searching = query.trim() !== "";
  const toggle = (id: number) =>
    setOpenIds((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h2 className={`text-sm font-bold uppercase tracking-wider ${theme.accent}`}>
          Kiến thức tóm tắt
        </h2>
        <div className="flex items-center gap-1">
          {!searching && (summary.data?.length ?? 0) > 0 && (
            <button
              type="button"
              onClick={() =>
                setOpenIds(
                  openIds.size > 0 ? new Set() : new Set((summary.data ?? []).map((s) => s.id)),
                )
              }
              className={`rounded-md px-2 py-1 text-xs ${theme.ghostBtn}`}
            >
              {openIds.size > 0 ? "Thu hết" : "Mở hết"}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng kiến thức tóm tắt"
            className={`rounded-md px-2 py-1 text-xs ${theme.ghostBtn}`}
          >
            ✕
          </button>
        </div>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm trong tóm tắt…"
        className={`mt-3 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/40 ${theme.input}`}
      />

      <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {summary.isPending ? (
          <p className={`text-sm ${theme.muted}`}>Đang tải…</p>
        ) : summary.isError ? (
          <div className="space-y-2 text-sm">
            <p className={theme.muted}>{errMsg(summary.error)}</p>
            <button
              type="button"
              onClick={() => summary.refetch()}
              className={`rounded-md px-3 py-1 text-xs ${theme.softBtn}`}
            >
              Thử lại
            </button>
          </div>
        ) : sections.length === 0 ? (
          <p className={`text-sm ${theme.muted}`}>
            {searching ? "Không có mục nào khớp." : "Môn này chưa có tóm tắt kiến thức."}
          </p>
        ) : (
          sections.map((s) => {
            const isOpen = searching || openIds.has(s.id);
            return (
              <section key={s.id} className={`rounded-lg ${theme.box}`}>
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-start justify-between gap-2 px-3 py-2 text-left text-sm font-semibold ${theme.title}`}
                >
                  <span>{s.title}</span>
                  <span className={`mt-0.5 text-xs transition ${theme.faint} ${isOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>
                {isOpen && s.points.length > 0 && (
                  <ul className={`space-y-1.5 px-3 pb-3 text-sm leading-relaxed ${theme.text}`}>
                    {s.points.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className={theme.accent}>•</span>
                        <span className="min-w-0 break-words">{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })
        )}
      </div>
    </>
  );
}

export default function SummaryPanel({ subjectId, open, onClose }: Props) {
  const { theme } = useExamTheme();
  if (!open) return null;

  return (
    <>
      {/* Màn hình rộng (xl+): cột bên phải, dính khi cuộn, tự cuộn riêng */}
      <aside
        className={`sticky top-6 hidden max-h-[calc(100vh-3rem)] w-80 shrink-0 flex-col rounded-2xl p-4 xl:flex 2xl:w-96 ${theme.sidePanel}`}
      >
        <SummaryBody subjectId={subjectId} onClose={onClose} />
      </aside>

      {/* Điện thoại / màn hình nhỏ: ngăn kéo từ dưới lên */}
      <div className="fixed inset-0 z-40 xl:hidden">
        <button
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className={`absolute inset-0 ${theme.overlay}`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 flex h-[75vh] flex-col rounded-t-2xl p-4 ${theme.modal}`}
        >
          <SummaryBody subjectId={subjectId} onClose={onClose} />
        </div>
      </div>
    </>
  );
}
