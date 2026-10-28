import { useEffect, useMemo, useRef, useState } from "react";
import { useExamTheme } from "../theme/ThemeContext";
import QuestionMatrixCell from "./QuestionMatrixCell";

const DEFAULT_SIZE = 10; // mặc định chỉ hiện 10 câu đầu

type Props = {
  questionIds: number[];
  currentIndex: number;
  answeredIds: Set<number>;
  flaggedIds: number[];
  onSelect: (index: number) => void;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function QuestionMatrix({
  questionIds,
  currentIndex,
  answeredIds,
  flaggedIds,
  onSelect,
}: Props) {
  const { theme } = useExamTheme();
  const total = questionIds.length;
  const firstEnd = Math.min(DEFAULT_SIZE, total);

  // khoảng đang hiện (tính từ 1, gồm cả hai đầu)
  const [range, setRange] = useState<[number, number]>([1, firstEnd]);
  const [fromDraft, setFromDraft] = useState("1");
  const [toDraft, setToDraft] = useState(String(firstEnd));
  const [openMobile, setOpenMobile] = useState(false);
  const [start, end] = range;

  const applyRange = (from: number, to: number) => {
    const s = clamp(Number.isFinite(from) ? from : 1, 1, total);
    const e = clamp(Number.isFinite(to) ? to : total, s, total);
    setRange([s, e]);
    setFromDraft(String(s));
    setToDraft(String(e));
  };

  // đổi bộ câu hỏi (vd: làm lại câu sai) -> về lại 10 câu đầu
  useEffect(() => {
    applyRange(1, Math.min(DEFAULT_SIZE, total));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // bấm Next/Previous sang câu nằm ngoài khoảng đang hiện -> dời khoảng theo
  // (chỉ chạy khi câu hiện tại đổi, nên không phá lựa chọn khoảng của bạn)
  const prevIndexRef = useRef(currentIndex);
  useEffect(() => {
    if (prevIndexRef.current === currentIndex) return;
    prevIndexRef.current = currentIndex;
    const n = currentIndex + 1;
    if (n >= start && n <= end) return;
    const len = end - start + 1;
    const s = Math.floor(currentIndex / len) * len + 1;
    applyRange(s, s + len - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // nút chọn nhanh: từng nhóm 10 câu (hoặc 50 nếu đề dài) + Tất cả
  const presets = useMemo(() => {
    const size = total > 100 ? 50 : 10;
    const list: { label: string; from: number; to: number }[] = [];
    for (let s = 1; s <= total; s += size) {
      const e = Math.min(s + size - 1, total);
      list.push({ label: `${s}–${e}`, from: s, to: e });
    }
    return list;
  }, [total]);

  const isAll = start === 1 && end === total;
  const visibleIndexes = useMemo(
    () => Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i),
    [start, end],
  );

  const inputClass = `w-full rounded-md px-2 py-1 text-center text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/40 ${theme.input}`;
  const chip = (active: boolean) =>
    `rounded-md px-2 py-1 text-[11px] font-semibold transition ${
      active ? theme.rangeActive : theme.rangeIdle
    }`;

  return (
    <aside
      className={`w-full shrink-0 rounded-2xl p-4 lg:sticky lg:top-6 lg:w-64 ${theme.sidePanel}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <span
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.muted}`}
          >
            Ma trận câu hỏi
          </span>
          <p className={`mt-0.5 text-xs ${theme.faint}`}>
            {answeredIds.size}/{total} đã làm
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenMobile((o) => !o)}
          className={`rounded-md px-3 py-1 text-xs font-semibold lg:hidden ${theme.ghostBtn}`}
        >
          {openMobile ? "Ẩn" : "Hiện"}
        </button>
      </div>

      <div className={`${openMobile ? "block" : "hidden"} lg:block`}>
        {/* Chọn khoảng tự do: từ câu ... đến câu ... */}
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={total}
            value={fromDraft}
            onChange={(e) => setFromDraft(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && applyRange(Number(fromDraft), Number(toDraft))
            }
            aria-label="Từ câu"
            className={inputClass}
          />
          <span className={`text-xs ${theme.faint}`}>→</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={total}
            value={toDraft}
            onChange={(e) => setToDraft(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && applyRange(Number(fromDraft), Number(toDraft))
            }
            aria-label="Đến câu"
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => applyRange(Number(fromDraft), Number(toDraft))}
            className={`shrink-0 rounded-md px-3 py-1 text-xs font-semibold ${theme.rangeActive}`}
          >
            Hiện
          </button>
        </div>

        {/* Chọn nhanh */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyRange(p.from, p.to)}
              className={chip(start === p.from && end === p.to)}
            >
              {p.label}
            </button>
          ))}
          {total > DEFAULT_SIZE && (
            <button
              type="button"
              onClick={() => applyRange(1, total)}
              className={chip(isAll)}
            >
              Tất cả
            </button>
          )}
        </div>

        <p className={`mt-2 text-[11px] ${theme.faint}`}>
          Đang hiện câu {start}–{end} ({visibleIndexes.length}/{total} câu)
        </p>

        <div className="mt-3 grid max-h-[calc(100vh-20rem)] grid-cols-5 gap-1.5 overflow-y-auto pr-1">
          {visibleIndexes.map((index) => {
            const id = questionIds[index];
            return (
              <QuestionMatrixCell
                key={id ?? index}
                number={index + 1}
                isCurrent={index === currentIndex}
                isDone={answeredIds.has(id)}
                isFlagged={flaggedIds.includes(id)}
                onClick={() => onSelect(index)}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
