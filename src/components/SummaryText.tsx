import { Fragment, type ReactNode } from "react";
import { isTablePoint } from "../data/tableText";
import { useSummaryStore } from "../store/summaryStore";
import { markKey, parseKind } from "../data/summaryText";
import Markdown from "./Markdown";

const TOKEN = /(==.+?==|\*\*.+?\*\*|!!.+?!!)/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  const nodes: ReactNode[] = parts.map((p, i) => {
    if (p.length > 4 && p.startsWith("==") && p.endsWith("=="))
      return (
        <mark key={i} className="rounded bg-yellow-300/40 px-1 text-inherit [box-decoration-break:clone]">
          {p.slice(2, -2)}
        </mark>
      );
    if (p.length > 4 && p.startsWith("**") && p.endsWith("**"))
      return <strong key={i} className="font-bold">{p.slice(2, -2)}</strong>;
    if (p.length > 4 && p.startsWith("!!") && p.endsWith("!!"))
      return <span key={i} className="font-semibold text-red-500">{p.slice(2, -2)}</span>;
    return <Fragment key={i}>{p}</Fragment>;
  });
  return <>{nodes}</>;
}

/** Thanh công cụ: bật/tắt chấm đầu dòng, chỉ xem ý đã đánh dấu, xoá đánh dấu. */
export function SummaryToolbar({ className = "" }: { className?: string }) {
  const bullets = useSummaryStore((s) => s.bullets);
  const setBullets = useSummaryStore((s) => s.setBullets);
  const onlyMarked = useSummaryStore((s) => s.onlyMarked);
  const setOnlyMarked = useSummaryStore((s) => s.setOnlyMarked);
  const markCount = useSummaryStore((s) => Object.keys(s.marks).length);
  const clearMarks = useSummaryStore((s) => s.clearMarks);

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1 text-xs font-semibold transition ${
      on
        ? "border-yellow-400/60 bg-yellow-400/20 text-yellow-500"
        : "border-current/20 bg-current/5 opacity-70 hover:opacity-100"
    }`;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button type="button" aria-pressed={bullets} onClick={() => setBullets(!bullets)} className={chip(bullets)}>
        • Chấm đầu dòng: {bullets ? "Bật" : "Tắt"}
      </button>
      <button
        type="button"
        aria-pressed={onlyMarked}
        disabled={markCount === 0 && !onlyMarked}
        onClick={() => setOnlyMarked(!onlyMarked)}
        className={`${chip(onlyMarked)} disabled:cursor-not-allowed disabled:opacity-30`}
      >
        ★ Chỉ ý đã đánh dấu ({markCount})
      </button>
      {markCount > 0 && (
        <button
          type="button"
          onClick={() => window.confirm("Xoá toàn bộ đánh dấu của bạn?") && clearMarks()}
          className="text-xs opacity-60 underline hover:opacity-100"
        >
          Xoá đánh dấu
        </button>
      )}
    </div>
  );
}

/** Danh sách ý của một chủ đề. Bấm vào một ý (hoặc ★) để đánh dấu / bỏ đánh dấu. */
export function SummaryPoints({
  sectionId,
  points,
  compact = false,
}: {
  sectionId: number;
  points: string[];
  compact?: boolean;
}) {
  const bullets = useSummaryStore((s) => s.bullets);
  const marks = useSummaryStore((s) => s.marks);
  const onlyMarked = useSummaryStore((s) => s.onlyMarked);
  const toggleMark = useSummaryStore((s) => s.toggleMark);

  const rows = points
    .map((p) => ({ p, key: markKey(sectionId, p) }))
    .filter((r) => !onlyMarked || marks[r.key]);

  if (rows.length === 0) return null;

  return (
    <ul className={`${compact ? "mt-1 space-y-1" : "mt-3 space-y-1.5"} text-sm leading-relaxed`}>
      {rows.map(({ p, key }) => {
        if (isTablePoint(p))
          return (
            <li key={key} className="list-none">
              <Markdown className="text-inherit">{p}</Markdown>
            </li>
          );

        const { kind, text } = parseKind(p);
        const marked = Boolean(marks[key]);
        const showDot = bullets && (kind === "normal" || kind === "important");

        const box =
          kind === "heading"
            ? "mt-3 text-base font-bold text-yellow-500"
            : kind === "important"
              ? "border-l-4 border-yellow-400 bg-yellow-400/15 font-medium"
              : kind === "note"
                ? "border-l-2 border-current/30 italic opacity-80"
                : "";

        return (
          <li key={key} className="list-none">
            <div
              className={`group flex items-start gap-2 rounded-md px-2 py-1 transition ${box} ${
                marked ? "bg-yellow-300/25 ring-1 ring-yellow-400/50" : "hover:bg-current/5"
              }`}
            >
              {showDot && <span aria-hidden="true" className="mt-[0.1rem] select-none text-yellow-500">•</span>}
              <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">
                <Inline text={text} />
              </span>
              {kind !== "heading" && (
                <button
                  type="button"
                  aria-label={marked ? "Bỏ đánh dấu" : "Đánh dấu ý này"}
                  aria-pressed={marked}
                  onClick={() => toggleMark(key)}
                  className={`shrink-0 select-none px-1 text-base leading-none transition ${
                    marked ? "text-yellow-500" : "opacity-30 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-60"
                  }`}
                >
                  {marked ? "★" : "☆"}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
