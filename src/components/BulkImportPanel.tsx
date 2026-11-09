import { useMemo, useState, type ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionsBulk, errMsg } from "../data/api";
import { SAMPLE_TEXT, normalizeForDup, parseBulk } from "../data/bulkImport";
import { optionLabel } from "../data/drafts";
import { ghostBtn, inputClass, panel, primaryBtn } from "./adminStyles";

type Props = {
  subjectId: string;
  existing: string[];
  onClose: () => void;
  onImported: (r: { count: number; first: number; last: number }) => void;
};

const MAX_FILE = 2 * 1024 * 1024;
const SHOW_ISSUES = 15;
const SHOW_PREVIEW = 8;

export default function BulkImportPanel({
  subjectId,
  existing,
  onClose,
  onImported,
}: Props) {
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const [skipDup, setSkipDup] = useState(true);
  const [fileError, setFileError] = useState<string | null>(null);

  const parsed = useMemo(() => parseBulk(text), [text]);

  // đánh dấu câu trùng: trùng với câu đã có trong môn, hoặc trùng nhau trong nội dung đã dán
  const dupReason = useMemo(() => {
    const have = new Set(existing.map(normalizeForDup));
    const seen = new Set<string>();
    const out = new Map<number, string>();
    for (const it of parsed.items) {
      const k = normalizeForDup(it.payload.question);
      if (have.has(k)) out.set(it.index, "đã có trong môn");
      else if (seen.has(k)) out.set(it.index, "trùng với câu phía trên");
      seen.add(k);
    }
    return out;
  }, [parsed.items, existing]);

  const toImport = parsed.items.filter(
    (it) => !(skipDup && dupReason.has(it.index)),
  );

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
      setText("");
    },
  });

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (f.size > MAX_FILE) return setFileError("File quá lớn (tối đa 2 MB).");
    setFileError(null);
    run.reset();
    setText(await f.text());
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
            onClick={() => {
              run.reset();
              setText(SAMPLE_TEXT);
            }}
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
        onChange={(e) => {
          run.reset();
          setText(e.target.value);
        }}
        rows={12}
        placeholder="Dán nội dung các câu hỏi vào đây…"
        className={`${inputClass} resize-y font-mono`}
        aria-label="Nội dung cần nhập"
      />

      {hasInput && (
        <div className="space-y-3" aria-live="polite">
          <p className="text-sm text-zinc-300">
            Đọc được <b className="text-emerald-300">{parsed.items.length}</b>{" "}
            câu hợp lệ
            {parsed.issues.length > 0 && (
              <>
                {" "}
                · <b className="text-red-300">{parsed.issues.length}</b> câu có
                lỗi (sẽ bị bỏ qua)
              </>
            )}
            {dupReason.size > 0 && (
              <>
                {" "}
                · <b className="text-yellow-300">{dupReason.size}</b> câu trùng
              </>
            )}
          </p>

          {parsed.issues.length > 0 && (
            <ul className="space-y-1 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
              {parsed.issues.slice(0, SHOW_ISSUES).map((is, i) => (
                <li key={i}>
                  {is.index > 0 ? `Câu thứ ${is.index}` : "Lỗi"}
                  {is.line ? ` (dòng ${is.line})` : ""}: {is.message}
                  {is.preview ? (
                    <span className="text-red-200/70"> — “{is.preview}”</span>
                  ) : null}
                </li>
              ))}
              {parsed.issues.length > SHOW_ISSUES && (
                <li className="text-red-200/70">
                  …và {parsed.issues.length - SHOW_ISSUES} lỗi nữa.
                </li>
              )}
            </ul>
          )}

          {parsed.items.length > 0 && (
            <ul className="space-y-1 text-sm text-zinc-300">
              {parsed.items.slice(0, SHOW_PREVIEW).map((it) => (
                <li key={it.index} className="flex gap-2">
                  <span className="shrink-0 text-yellow-300">{it.index}.</span>
                  <span className="min-w-0 truncate">
                    {it.payload.question.replace(/\s+/g, " ")}
                  </span>
                  <span className="shrink-0 text-xs text-zinc-500">
                    Đúng:{" "}
                    {(Array.isArray(it.payload.answer)
                      ? it.payload.answer
                      : [it.payload.answer]
                    )
                      .map(optionLabel)
                      .join(", ")}
                    {dupReason.has(it.index) && (
                      <span className="text-yellow-300">
                        {" "}
                        · {dupReason.get(it.index)}
                      </span>
                    )}
                  </span>
                </li>
              ))}
              {parsed.items.length > SHOW_PREVIEW && (
                <li className="text-zinc-500">
                  …và {parsed.items.length - SHOW_PREVIEW} câu nữa.
                </li>
              )}
            </ul>
          )}

          {dupReason.size > 0 && (
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={skipDup}
                onChange={(e) => setSkipDup(e.target.checked)}
              />
              Bỏ qua các câu trùng
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
