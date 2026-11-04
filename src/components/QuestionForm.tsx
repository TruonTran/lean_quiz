import { useState, type FormEvent } from "react";
import {
  MAX_OPTIONS,
  MIN_OPTIONS,
  addOption,
  optionLabel,
  removeOption,
  setMulti,
  toggleCorrect,
  validateDraft,
  type QuestionDraft,
  type QuestionPayload,
} from "../data/drafts";
import { dangerBtn, ghostBtn, inputClass, panel, primaryBtn } from "./adminStyles";

type Props = {
  title: string;
  initial: QuestionDraft;
  submitLabel: string;
  pending: boolean;
  /** lỗi từ server (sau khi gửi) */
  serverError: string | null;
  onSubmit: (payload: QuestionPayload) => void;
  onCancel?: () => void;
};

export default function QuestionForm({
  title,
  initial,
  submitLabel,
  pending,
  serverError,
  onSubmit,
  onCancel,
}: Props) {
  const [draft, setDraft] = useState<QuestionDraft>(initial);
  const [localError, setLocalError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateDraft(draft);
    if (!result.ok) {
      setLocalError(result.error);
      return;
    }
    setLocalError(null);
    onSubmit(result.value);
  };

  const error = localError ?? serverError;

  return (
    <form onSubmit={submit} className={`${panel} space-y-4`}>
      <h2 className="text-lg font-bold text-yellow-300">{title}</h2>

      <textarea
        value={draft.question}
        onChange={(e) => setDraft({ ...draft, question: e.target.value })}
        placeholder="Nội dung câu hỏi"
        rows={3}
        className={`${inputClass} resize-y`}
        aria-label="Nội dung câu hỏi"
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-300">
          Các đáp án{" "}
          <span className="font-normal text-zinc-500">
            (tích vào ô tròn / ô vuông ở đáp án đúng)
          </span>
        </p>
        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={draft.multi}
            onChange={(e) => setDraft(setMulti(draft, e.target.checked))}
          />
          Chọn nhiều đáp án
        </label>
      </div>

      <div className="space-y-2">
        {draft.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type={draft.multi ? "checkbox" : "radio"}
              name="correct"
              checked={draft.correct.includes(i)}
              onChange={() => setDraft(toggleCorrect(draft, i))}
              aria-label={`Đáp án ${optionLabel(i)} là đáp án đúng`}
              className="h-4 w-4 shrink-0 accent-yellow-400"
            />
            <span className="w-5 shrink-0 text-sm font-bold text-yellow-300">
              {optionLabel(i)}
            </span>
            <input
              value={opt}
              onChange={(e) => {
                const options = [...draft.options];
                options[i] = e.target.value;
                setDraft({ ...draft, options });
              }}
              placeholder={`Đáp án ${optionLabel(i)}`}
              className={inputClass}
              aria-label={`Nội dung đáp án ${optionLabel(i)}`}
            />
            <button
              type="button"
              onClick={() => setDraft(removeOption(draft, i))}
              disabled={draft.options.length <= MIN_OPTIONS}
              aria-label={`Xoá đáp án ${optionLabel(i)}`}
              className={`${dangerBtn} shrink-0`}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setDraft(addOption(draft))}
          disabled={draft.options.length >= MAX_OPTIONS}
          className={ghostBtn}
        >
          + Thêm đáp án
        </button>
      </div>

      <input
        value={draft.hint}
        onChange={(e) => setDraft({ ...draft, hint: e.target.value })}
        placeholder="Gợi ý (không bắt buộc)"
        className={inputClass}
        aria-label="Gợi ý"
      />
      <textarea
        value={draft.rationale}
        onChange={(e) => setDraft({ ...draft, rationale: e.target.value })}
        placeholder="Giải thích đáp án (không bắt buộc)"
        rows={3}
        className={`${inputClass} resize-y`}
        aria-label="Giải thích đáp án"
      />

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button type="submit" disabled={pending} className={primaryBtn}>
          {pending ? "Đang lưu…" : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={ghostBtn}>
            Huỷ
          </button>
        )}
      </div>
    </form>
  );
}
