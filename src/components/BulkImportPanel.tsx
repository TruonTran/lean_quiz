import { useMemo, useState, type ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionsBulk, errMsg } from "../data/api";
import {
  DUP_KIND_LABEL,
  SAMPLE_TEXT,
  describeDup,
  findDuplicates,
  parseBulk,
  type DupInfo,
  type DupKind,
  type DupMatch,
  type ExistingQuestion,
  type ParseIssue,
  type ParsedItem,
} from "../data/bulkImport";
import { optionLabel } from "../data/drafts";
import { ghostBtn, inputClass, panel, primaryBtn } from "./adminStyles";

type Props = {
  subjectId: string;
  /** Các câu đã có trong môn, dùng để báo trùng (kèm mã #id để chỉ rõ trùng với câu nào). */
  existing: ExistingQuestion[];
  onClose: () => void;
  onImported: (r: { count: number; first: number; last: number }) => void;
};

type Row =
  | { kind: "ok" | "dup"; index: number; item: ParsedItem; dup?: DupInfo }
  | { kind: "error"; index: number; issue: ParseIssue };

type Filter = "all" | "ok" | "dup" | "error";

const MAX_FILE = 2 * 1024 * 1024;
const PAGE_ROWS = 200;

const KIND_STYLE: Record<DupKind, string> = {
  identical: "border-yellow-400/40 bg-yellow-400/10 text-yellow-200",
  "answer-differs": "border-orange-400/50 bg-orange-500/15 text-orange-200",
  "options-differ": "border-sky-400/40 bg-sky-400/10 text-sky-200",
};

const snippet = (s: string, n = 140) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
};

const lineText = (line?: number, endLine?: number) =>
  line ? (endLine && endLine > line ? `dòng ${line}–${endLine}` : `dòng ${line}`) : "";

const answerText = (a: number | number[]) =>
  (Array.isArray(a) ? a : [a]).map(optionLabel).join(", ");

function OptionList({
  options,
  answer,
}: {
  options: string[];
  answer: number | number[];
}) {
  const correct = Array.isArray(answer) ? answer : [answer];
  return (
    <ul className="space-y-0.5">
      {options.map((o, i) => (
        <li
          key={i}
          className={correct.includes(i) ? "text-emerald-300" : "text-zinc-400"}
        >
          {optionLabel(i)}. {o}
          {correct.includes(i) ? " ✓" : ""}
        </li>
      ))}
    </ul>
  );
}

export default function BulkImportPanel({
  subjectId,
  existing,
  onClose,
  onImported,
}: Props) {
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const [skipDup, setSkipDup] = useState(true);
  const [forced, setForced] = useState<Set<number>>(new Set()); // câu trùng nhưng vẫn muốn nhập
  const [filter, setFilter] = useState<Filter>("all");
  const [limit, setLimit] = useState(PAGE_ROWS);
  const [copied, setCopied] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const parsed = useMemo(() => parseBulk(text), [text]);
  const dups = useMemo(
    () => findDuplicates(parsed.items, existing),
    [parsed.items, existing],
  );

  const nameOf = (index: number, label?: string) =>
    label ?? (parsed.format === "json" ? `Phần tử ${index}` : `Câu thứ ${index}`);

  const targetName = (m: DupMatch) =>
    m.target.source === "existing"
      ? `câu #${m.target.ref} trong bộ đề`
      : `${nameOf(m.target.ref, m.target.label)}${
          m.target.line
            ? ` (${lineText(m.target.line, m.target.endLine)})`
            : ""
        } trong nội dung đang dán`;

  const rows = useMemo<Row[]>(() => {
    const list: Row[] = [
      ...parsed.items.map(
        (item): Row => ({
          kind: dups.has(item.index) ? "dup" : "ok",
          index: item.index,
          item,
          dup: dups.get(item.index),
        }),
      ),
      ...parsed.issues.map(
        (issue): Row => ({ kind: "error", index: issue.index, issue }),
      ),
    ];
    return list.sort((a, b) => a.index - b.index);
  }, [parsed, dups]);

  const count = {
    ok: parsed.items.length - dups.size,
    dup: dups.size,
    error: parsed.issues.length,
  };
  const dupByKind = useMemo(() => {
    const c: Record<DupKind, number> = {
      identical: 0,
      "answer-differs": 0,
      "options-differ": 0,
    };
    for (const d of dups.values()) c[d.matches[0].kind]++;
    return c;
  }, [dups]);

  const willImport = (it: ParsedItem) =>
    !dups.has(it.index) || !skipDup || forced.has(it.index);
  const toImport = parsed.items.filter(willImport);

  const shown = rows.filter((r) => filter === "all" || r.kind === filter);

  const run = useMutation({
    mutationFn: () =>
      createQuestionsBulk(
        subjectId,
        toImport.map((i) => i.payload),
      ),
    onSuccess: async (r) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["subject", subjectId] }),
        qc.invalidateQueries({ queryKey: ["subjects"] }),
        qc.invalidateQueries({ queryKey: ["questions", subjectId] }),
      ]);
      onImported({ count: toImport.length, ...r });
      setInput("");
    },
  });

  const setInput = (t: string) => {
    run.reset();
    setText(t);
    setForced(new Set());
    setLimit(PAGE_ROWS);
    setCopied(false);
  };

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (f.size > MAX_FILE) return setFileError("File quá lớn (tối đa 2 MB).");
    setFileError(null);
    setInput(await f.text());
  };

  const toggleForced = (index: number) =>
    setForced((cur) => {
      const next = new Set(cur);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const copyReport = async () => {
    const out: string[] = [
      `BÁO CÁO NHẬP HÀNG LOẠT — ${count.ok} câu mới · ${count.dup} câu trùng · ${count.error} câu lỗi`,
    ];
    const errs = rows.filter((r) => r.kind === "error");
    if (errs.length) {
      out.push("", "== CÂU LỖI (bị bỏ qua) ==");
      for (const r of errs) {
        if (r.kind !== "error") continue;
        const is = r.issue;
        const where = lineText(is.line, is.endLine);
        out.push(
          `- ${is.index > 0 ? nameOf(is.index, is.label) : "Lỗi"}${where ? ` (${where})` : ""}: ${is.message}`,
        );
        if (is.preview) out.push(`    “${is.preview}”`);
      }
    }
    const dupRows = rows.filter((r) => r.kind === "dup");
    if (dupRows.length) {
      out.push("", "== CÂU TRÙNG ==");
      for (const r of dupRows) {
        if (r.kind !== "dup" || !r.dup) continue;
        const m = r.dup.matches[0];
        const where = lineText(r.item.line, r.item.endLine);
        out.push(
          `- ${nameOf(r.index, r.item.label)}${where ? ` (${where})` : ""} ↔ ${targetName(m)} [${DUP_KIND_LABEL[m.kind]}]: ${describeDup(m)}`,
        );
        out.push(`    “${snippet(r.item.payload.question, 100)}”`);
        if (r.dup.matches.length > 1)
          out.push(
            `    còn trùng thêm với: ${r.dup.matches
              .slice(1)
              .map(targetName)
              .join("; ")}`,
          );
      }
    }
    try {
      await navigator.clipboard.writeText(out.join("\n"));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const hasInput = parsed.format !== "empty";

  return (
    <div className={`${panel} space-y-4`}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-yellow-300">Nhập hàng loạt</h2>
        <button onClick={onClose} className={ghostBtn}>
          Đóng
        </button>
      </div>

      <details className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-400">
        <summary className="cursor-pointer font-semibold text-zinc-300">
          Dán theo định dạng nào?
        </summary>
        <div className="mt-3 space-y-3">
          <p>
            Mỗi câu gồm: nội dung, các đáp án{" "}
            <code className="text-yellow-200">A. B. C.…</code>, rồi dòng{" "}
            <code className="text-yellow-200">Đáp án: B</code> (chọn nhiều:{" "}
            <code className="text-yellow-200">Đáp án: A, C</code>). Có thể thêm{" "}
            <code className="text-yellow-200">Gợi ý:</code> và{" "}
            <code className="text-yellow-200">Giải thích:</code>. Các câu cách
            nhau một dòng trống, hoặc mở đầu bằng{" "}
            <code className="text-yellow-200">Câu 1:</code>. Cũng dán được JSON
            (mảng các câu có{" "}
            <code className="text-yellow-200">question, options, answer</code>).
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-black/30 p-3 text-xs text-zinc-300">
            {SAMPLE_TEXT}
          </pre>
          <button
            type="button"
            onClick={() => setInput(SAMPLE_TEXT)}
            className={ghostBtn}
          >
            Dùng mẫu này
          </button>
          <p>
            Mẹo: có thể nhờ ChatGPT hoặc Claude chuyển đề của bạn (Word, PDF…)
            sang đúng định dạng này rồi dán vào đây.
          </p>
        </div>
      </details>

      <label className="block text-sm text-zinc-400">
        Hoặc chọn file (.txt, .md, .json):{" "}
        <input
          type="file"
          accept=".txt,.md,.json,text/plain,application/json"
          onChange={onFile}
          className="text-xs"
        />
      </label>
      {fileError && (
        <p role="alert" className="text-sm text-red-300">
          {fileError}
        </p>
      )}

      <textarea
        value={text}
        onChange={(e) => setInput(e.target.value)}
        rows={12}
        placeholder="Dán nội dung các câu hỏi vào đây…"
        className={`${inputClass} resize-y font-mono`}
        aria-label="Nội dung cần nhập"
      />

      {hasInput && (
        <div className="space-y-3" aria-live="polite">
          <p className="text-sm text-zinc-300">
            Đọc được{" "}
            <b className="text-zinc-100">
              {parsed.items.length + parsed.issues.length}
            </b>{" "}
            câu: <b className="text-emerald-300">{count.ok}</b> câu mới ·{" "}
            <b className="text-yellow-300">{count.dup}</b> câu trùng ·{" "}
            <b className="text-red-300">{count.error}</b> câu lỗi (sẽ bị bỏ
            qua)
          </p>

          {count.dup > 0 && (
            <p className="text-xs text-zinc-400">
              Trùng:{" "}
              {(Object.keys(dupByKind) as DupKind[])
                .filter((k) => dupByKind[k] > 0)
                .map((k) => `${DUP_KIND_LABEL[k]} ${dupByKind[k]}`)
                .join(" · ")}
              . “Trùng” nghĩa là cùng nội dung câu hỏi (không phân biệt
              hoa/thường, khoảng trắng); đáp án được so sánh thêm để biết giống
              hệt hay có khác biệt.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ["all", `Tất cả (${rows.length})`],
                ["ok", `Mới (${count.ok})`],
                ["dup", `Trùng (${count.dup})`],
                ["error", `Lỗi (${count.error})`],
              ] as [Filter, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setFilter(k);
                  setLimit(PAGE_ROWS);
                }}
                aria-pressed={filter === k}
                className={`${ghostBtn} ${
                  filter === k ? "bg-white/15 ring-1 ring-yellow-400/60" : ""
                }`}
              >
                {label}
              </button>
            ))}
            {(count.dup > 0 || count.error > 0) && (
              <button
                type="button"
                onClick={copyReport}
                className={`${ghostBtn} ml-auto`}
              >
                {copied ? "Đã sao chép ✓" : "Sao chép báo cáo lỗi/trùng"}
              </button>
            )}
          </div>

          <ul className="max-h-[32rem] space-y-2 overflow-y-auto pr-1 text-sm">
            {shown.slice(0, limit).map((r) => {
              if (r.kind === "error") {
                const is = r.issue;
                const where = lineText(is.line, is.endLine);
                return (
                  <li
                    key={`e${r.index}-${is.line ?? 0}`}
                    className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-red-100"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">
                        {is.index > 0 ? nameOf(is.index, is.label) : "Lỗi"}
                      </span>
                      {where && (
                        <span className="text-xs text-red-200/70">{where}</span>
                      )}
                      <span className="rounded border border-red-400/40 px-1.5 text-xs">
                        Lỗi · bị bỏ qua
                      </span>
                    </div>
                    {is.preview && (
                      <p className="mt-1 text-red-200/80">“{is.preview}”</p>
                    )}
                    <p className="mt-1">→ {is.message}</p>
                    {is.raw && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs text-red-200/80">
                          Xem đoạn gốc
                        </summary>
                        <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-black/30 p-2 text-xs text-zinc-300">
                          {is.raw}
                        </pre>
                      </details>
                    )}
                  </li>
                );
              }

              const { item, dup } = r;
              const where = lineText(item.line, item.endLine);
              const head = dup?.matches[0];
              if (!dup || !head) {
                return (
                  <li
                    key={`o${r.index}`}
                    className="flex flex-wrap items-baseline gap-x-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-zinc-300"
                  >
                    <span className="font-semibold text-emerald-300">
                      {nameOf(r.index, item.label)}
                    </span>
                    {where && (
                      <span className="text-xs text-zinc-500">{where}</span>
                    )}
                    <span className="min-w-0 flex-1 truncate">
                      {snippet(item.payload.question, 200)}
                    </span>
                    <span className="shrink-0 text-xs text-zinc-500">
                      Đúng: {answerText(item.payload.answer)}
                    </span>
                  </li>
                );
              }

              const skipped = !willImport(item);
              return (
                <li
                  key={`d${r.index}`}
                  className={`rounded-lg border p-3 ${KIND_STYLE[head.kind]}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">
                      {nameOf(r.index, item.label)}
                    </span>
                    {where && <span className="text-xs opacity-70">{where}</span>}
                    <span className="rounded border border-current/40 px-1.5 text-xs">
                      Trùng · {DUP_KIND_LABEL[head.kind]}
                    </span>
                    <span className="ml-auto text-xs opacity-80">
                      {skipped ? "Sẽ bỏ qua" : "Sẽ nhập"}
                    </span>
                  </div>
                  <p className="mt-1 text-zinc-100">
                    {snippet(item.payload.question, 200)}
                  </p>
                  <p className="mt-1">
                    ↔ Trùng với <b>{targetName(head)}</b>:{" "}
                    <span className="text-zinc-300">
                      “{snippet(head.target.question, 120)}”
                    </span>
                  </p>
                  <p className="mt-1 text-xs opacity-90">
                    Lý do: {describeDup(head)}
                  </p>
                  {dup.matches.length > 1 && (
                    <p className="mt-1 text-xs opacity-90">
                      Còn trùng thêm với:{" "}
                      {dup.matches
                        .slice(1)
                        .map((m) => `${targetName(m)} (${DUP_KIND_LABEL[m.kind]})`)
                        .join("; ")}
                    </p>
                  )}

                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs opacity-80">
                      So sánh hai câu
                    </summary>
                    <div className="mt-2 grid gap-3 text-xs sm:grid-cols-2">
                      <div className="rounded bg-black/30 p-2">
                        <p className="mb-1 font-semibold text-zinc-200">
                          Câu đang nhập ({nameOf(r.index, item.label)})
                        </p>
                        <OptionList
                          options={item.payload.options}
                          answer={item.payload.answer}
                        />
                      </div>
                      <div className="rounded bg-black/30 p-2">
                        <p className="mb-1 font-semibold text-zinc-200">
                          {targetName(head)}
                        </p>
                        <OptionList
                          options={head.target.options}
                          answer={head.target.answer}
                        />
                      </div>
                    </div>
                  </details>

                  <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-zinc-200">
                    <input
                      type="checkbox"
                      checked={!skipDup || forced.has(r.index)}
                      disabled={!skipDup}
                      onChange={() => toggleForced(r.index)}
                    />
                    Vẫn nhập câu này
                  </label>
                </li>
              );
            })}
            {shown.length === 0 && (
              <li className="text-zinc-500">Không có câu nào ở mục này.</li>
            )}
            {shown.length > limit && (
              <li>
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + PAGE_ROWS)}
                  className={ghostBtn}
                >
                  Hiện thêm {Math.min(PAGE_ROWS, shown.length - limit)} câu (còn{" "}
                  {shown.length - limit})
                </button>
              </li>
            )}
          </ul>

          {count.dup > 0 && (
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={skipDup}
                onChange={(e) => setSkipDup(e.target.checked)}
              />
              Bỏ qua tất cả các câu trùng (có thể tick “Vẫn nhập” ở từng câu)
            </label>
          )}
        </div>
      )}

      {run.error && (
        <p role="alert" className="text-sm text-red-300">
          {errMsg(run.error)}
        </p>
      )}

      <button
        onClick={() => run.mutate()}
        disabled={toImport.length === 0 || run.isPending}
        className={primaryBtn}
      >
        {run.isPending ? "Đang nhập…" : `Nhập ${toImport.length} câu`}
      </button>
    </div>
  );
}
