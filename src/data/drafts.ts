import type { Question } from "../types/Question";
import type { ExamType } from "../types/Subject";

/* =============================== Câu hỏi =============================== */

export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 10;

/** Bản nháp trong form: đáp án đúng lưu theo chỉ số (0 = A, 1 = B, …). */
export type QuestionDraft = {
  question: string;
  options: string[];
  correct: number[];
  /** true = câu chọn nhiều đáp án (answer là mảng), false = chọn 1 (answer là số) */
  multi: boolean;
  hint: string;
  rationale: string;
};

/** Dữ liệu đúng dạng cột trong bảng `questions`. */
export type QuestionPayload = {
  question: string;
  options: string[];
  answer: number | number[];
  hint: string | null;
  rationale: string | null;
};

export const optionLabel = (i: number) => String.fromCharCode(65 + i);

export const emptyDraft = (): QuestionDraft => ({
  question: "",
  options: ["", "", "", ""],
  correct: [],
  multi: false,
  hint: "",
  rationale: "",
});

export const draftFromQuestion = (q: Question): QuestionDraft => ({
  question: q.question,
  options: [...q.options],
  correct: (Array.isArray(q.answer) ? [...q.answer] : [q.answer]).sort((a, b) => a - b),
  multi: Array.isArray(q.answer),
  hint: q.hint ?? "",
  rationale: q.rationale ?? "",
});

/** Chọn / bỏ chọn đáp án đúng. Câu chọn 1 đáp án thì luôn chỉ giữ đúng 1. */
export function toggleCorrect(d: QuestionDraft, i: number): QuestionDraft {
  if (!d.multi) return { ...d, correct: [i] };
  const has = d.correct.includes(i);
  const correct = has ? d.correct.filter((c) => c !== i) : [...d.correct, i];
  return { ...d, correct: correct.sort((a, b) => a - b) };
}

export function setMulti(d: QuestionDraft, multi: boolean): QuestionDraft {
  if (multi) return { ...d, multi };
  // chuyển về chọn 1: giữ lại đáp án đúng đầu tiên (nếu có)
  return { ...d, multi, correct: d.correct.length > 0 ? [d.correct[0]] : [] };
}

export function addOption(d: QuestionDraft): QuestionDraft {
  if (d.options.length >= MAX_OPTIONS) return d;
  return { ...d, options: [...d.options, ""] };
}

/** Xoá đáp án i và dồn lại chỉ số các đáp án đúng phía sau. */
export function removeOption(d: QuestionDraft, i: number): QuestionDraft {
  if (d.options.length <= MIN_OPTIONS) return d;
  return {
    ...d,
    options: d.options.filter((_, idx) => idx !== i),
    correct: d.correct.filter((c) => c !== i).map((c) => (c > i ? c - 1 : c)),
  };
}

export function validateDraft(
  d: QuestionDraft,
): { ok: true; value: QuestionPayload } | { ok: false; error: string } {
  const question = d.question.trim();
  if (!question) return { ok: false, error: "Chưa nhập nội dung câu hỏi." };

  const options = d.options.map((o) => o.trim());
  if (options.length < MIN_OPTIONS) {
    return { ok: false, error: `Cần ít nhất ${MIN_OPTIONS} đáp án.` };
  }
  const empty = options.findIndex((o) => !o);
  if (empty >= 0) {
    return {
      ok: false,
      error: `Đáp án ${optionLabel(empty)} đang trống (điền nội dung hoặc bấm ✕ để xoá).`,
    };
  }

  const correct = [...new Set(d.correct)].sort((a, b) => a - b);
  if (correct.length === 0) return { ok: false, error: "Chưa chọn đáp án đúng." };
  if (correct.some((c) => c < 0 || c >= options.length)) {
    return { ok: false, error: "Đáp án đúng nằm ngoài danh sách đáp án." };
  }
  if (!d.multi && correct.length !== 1) {
    return { ok: false, error: "Câu chọn 1 đáp án chỉ được có đúng 1 đáp án đúng." };
  }

  return {
    ok: true,
    value: {
      question,
      options,
      answer: d.multi ? correct : correct[0],
      hint: d.hint.trim() || null,
      rationale: d.rationale.trim() || null,
    },
  };
}

/* ================================= Môn ================================= */

export type SubjectDraft = { code: string; name: string; description: string; examType: ExamType };

/** Dữ liệu môn đã kiểm tra hợp lệ, sẵn sàng gửi lên DB. */
export type SubjectValue = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  examType: ExamType;
};

/** "MLN111" → "mln111", "MLN 111" → "mln-111", "Kinh tế" → "kinh-te". Dùng làm id trong URL. */
export function slugify(code: string): string {
  return code
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateSubjectDraft(
  d: SubjectDraft,
): { ok: true; value: SubjectValue } | { ok: false; error: string } {
  const code = d.code.trim();
  const name = d.name.trim();
  if (!code) return { ok: false, error: "Chưa nhập mã môn (vd: MLN111)." };
  if (!name) return { ok: false, error: "Chưa nhập tên môn." };
  const id = slugify(code);
  if (!id) return { ok: false, error: "Mã môn cần có chữ hoặc số." };
  return {
    ok: true,
    value: {
      id,
      code: code.toUpperCase(),
      name,
      description: d.description.trim() || null,
      examType: d.examType,
    },
  };
}
