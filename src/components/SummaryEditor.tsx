import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSection, errMsg, saveSection, swapSections } from "../data/api";
import type { SummarySection } from "../types/Subject";
import { isTablePoint, parsePoints, pasteTable } from "../data/tableText";
import Markdown from "./Markdown";
import TableHelp from "./TableHelp";

type Props = {
  subjectId: string;
  sections: SummarySection[];
  isAdmin: boolean;
};

type Draft = { title: string; pointsText: string };

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40";
const ghostBtn =
  "rounded-lg border border-yellow-400/25 bg-white/5 px-3 py-1.5 text-xs font-semibold text-yellow-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30";

function SectionForm({
  initial,
  pending,
  error,
  onSubmit,
  onCancel,
}: {
  initial: Draft;
  pending: boolean;
  error: string | null;
  onSubmit: (d: Draft) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [pointsText, setPointsText] = useState(initial.pointsText);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, pointsText });
  };

  return (
    <form
      onSubmit={submit}
      className="glass-panel space-y-3 rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề chủ đề"
        className={inputClass}
        autoFocus
      />
      <textarea
        value={pointsText}
        onPaste={(e) => pasteTable(e, setPointsText)}
        onChange={(e) => setPointsText(e.target.value)}
        placeholder={"Mỗi dòng là một ý chính. Muốn thêm bảng: bấm \"Cách tạo bảng\" bên dưới."}
        rows={7}
        className={`${inputClass} resize-y`}
      />
      <TableHelp onInsert={(t) => setPointsText((v) => (v.trim() ? `${v}\n\n${t}\n` : `${t}\n`))} />
      {error && <p className="text-sm text-red-300">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending || !title.trim()}
          className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {pending ? "Đang lưu…" : "Lưu"}
        </button>
        <button type="button" onClick={onCancel} className={ghostBtn}>
          Huỷ
        </button>
      </div>
    </form>
  );
}

/** Danh sách chủ đề tóm tắt. Admin thấy thêm các nút thêm / sửa / xoá / đổi thứ tự. */
export default function SummaryEditor({ subjectId, sections, isAdmin }: Props) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<number | "new" | null>(null);

  const nextPosition = sections.reduce((m, s) => Math.max(m, s.position), 0) + 1;

  const refresh = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: ["summary", subjectId] }),
      qc.invalidateQueries({ queryKey: ["subjects"] }),
    ]);

  const save = useMutation({
    mutationFn: (v: { id?: number; draft: Draft }) =>
      saveSection({
        id: v.id,
        subjectId,
        title: v.draft.title.trim(),
        points: parsePoints(v.draft.pointsText),
        position: nextPosition,
      }),
    onSuccess: async () => {
      await refresh();
      setEditing(null);
    },
  });
  const remove = useMutation({ mutationFn: deleteSection, onSuccess: refresh });
  const move = useMutation({
    mutationFn: (v: { a: SummarySection; b: SummarySection }) =>
      swapSections(v.a, v.b),
    onSuccess: refresh,
  });

  const openEditor = (target: number | "new" | null) => {
    save.reset();
    setEditing(target);
  };

  const actionError = remove.error ?? move.error;

  return (
    <div className="space-y-5">
      {isAdmin && editing !== "new" && (
        <button
          onClick={() => openEditor("new")}
          className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20"
        >
          + Thêm chủ đề
        </button>
      )}

      {actionError && (
        <p role="alert" className="text-sm text-red-300">
          {errMsg(actionError)}
        </p>
      )}

      {editing === "new" && (
        <SectionForm
          initial={{ title: "", pointsText: "" }}
          pending={save.isPending}
          error={save.error ? errMsg(save.error) : null}
          onSubmit={(draft) => save.mutate({ draft })}
          onCancel={() => openEditor(null)}
        />
      )}

      {sections.length === 0 && editing !== "new" && (
        <p className="glass-panel mx-auto max-w-xl rounded-2xl bg-zinc-900/40 p-8 text-center text-zinc-400">
          Môn này chưa có phần tóm tắt kiến thức.
        </p>
      )}

      {sections.map((section, i) =>
        editing === section.id ? (
          <SectionForm
            key={section.id}
            initial={{
              title: section.title,
              pointsText: section.points.join("\n"),
            }}
            pending={save.isPending}
            error={save.error ? errMsg(save.error) : null}
            onSubmit={(draft) => save.mutate({ id: section.id, draft })}
            onCancel={() => openEditor(null)}
          />
        ) : (
          <section
            key={section.id}
            className="glass-panel fade-up rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40"
            style={{ animationDelay: `${0.1 + i * 0.06}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-yellow-300">
                {section.title}
              </h2>

              {isAdmin && (
                <div className="flex shrink-0 gap-2">
                  <button
                    aria-label="Chuyển lên"
                    disabled={i === 0 || move.isPending}
                    onClick={() => move.mutate({ a: section, b: sections[i - 1] })}
                    className={ghostBtn}
                  >
                    ↑
                  </button>
                  <button
                    aria-label="Chuyển xuống"
                    disabled={i === sections.length - 1 || move.isPending}
                    onClick={() => move.mutate({ a: section, b: sections[i + 1] })}
                    className={ghostBtn}
                  >
                    ↓
                  </button>
                  <button onClick={() => openEditor(section.id)} className={ghostBtn}>
                    Sửa
                  </button>
                  <button
                    disabled={remove.isPending}
                    onClick={() => {
                      if (window.confirm(`Xoá chủ đề "${section.title}"?`)) {
                        remove.mutate(section.id);
                      }
                    }}
                    className={`${ghostBtn} !border-red-400/30 !text-red-200`}
                  >
                    Xoá
                  </button>
                </div>
              )}
            </div>

            {section.points.length > 0 && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
                {section.points.map((p, j) =>
                  isTablePoint(p) ? (
                    <li key={j} className="-ml-5 list-none">
                      <Markdown>{p}</Markdown>
                    </li>
                  ) : (
                    <li key={j}>{p}</li>
                  ),
                )}
              </ul>
            )}
          </section>
        ),
      )}
    </div>
  );
}
