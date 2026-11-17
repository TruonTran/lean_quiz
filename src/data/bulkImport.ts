import { MAX_OPTIONS, validateDraft, type QuestionPayload } from "./drafts";

export type ParsedItem = {
  /** Số thứ tự câu theo thứ tự xuất hiện trong nội dung dán (1, 2, 3…). */
  index: number;
  /** Nhãn người dùng viết trong file, vd "Câu 12" (không có nếu không đánh số). */
  label?: string;
  /** Dòng bắt đầu / kết thúc của câu trong nội dung dán (chỉ có với dạng văn bản). */
  line?: number;
  endLine?: number;
  payload: QuestionPayload;
};
export type ParseIssue = {
  index: number;
  label?: string;
  line?: number;
  endLine?: number;
  message: string;
  preview: string;
  /** Đoạn gốc của câu bị lỗi, để đối chiếu và sửa trong file. */
  raw?: string;
};
export type ParseResult = {
  format: "empty" | "json" | "text";
  items: ParsedItem[];
  issues: ParseIssue[];
};

const LETTERS = "ABCDEFGHIJ";

export const SAMPLE_TEXT = `Câu 1: Thủ đô của Việt Nam là gì?
A. Hà Nội
B. Đà Nẵng
C. Huế
D. Cần Thơ
Đáp án: A
Gợi ý: Thành phố nghìn năm văn hiến
Giải thích: Hà Nội là thủ đô từ năm 1010.

Câu 2: Những số nào là số nguyên tố? (chọn nhiều)
A. 2
B. 4
C. 7
D. 9
Đáp án: A, C

Câu 3: HTML là viết tắt của gì?
A. HyperText Markup Language
B. High Tech Modern Language
Đáp án: A`;

/* ----------------------------- nhận diện dòng ----------------------------- */

const NUMBERED = /^(?:câu|cau|question|q)\s*\.?\s*(\d+)\s*[.:)\-–]\s*(.*)$/i; // "Câu 1: …", "Q2. …"
const NUMBERED_PLAIN = /^(\d+)\s*[.)]\s+(.*)$/; // "1. …", "12) …"
const OPTION = /^([A-Ja-j])\s*[.):]\s*(.*)$/; // "A. …", "b) …"
const ANSWER =
  /^(?:đáp\s*án(?:\s*đúng)?|dap\s*an(?:\s*dung)?|answer|ans|đa)\s*[:：=]\s*(.*)$/i;
const ANSWER_NO_SEP =
  /^(?:đáp\s*án(?:\s*đúng)?|answer)\s+([A-Ja-j](?:[\s,;&.)]|$).*)$/i; // "Đáp án B"
const HINT = /^(?:gợi\s*ý|goi\s*y|hint)\s*[:：]\s*(.*)$/i;
const RATIONALE =
  /^(?:giải\s*thích|giai\s*thich|lý\s*do|explanation|rationale)\s*[:：]\s*(.*)$/i;

/** "B", "A, C", "A và C", "AC", "B. Hà Nội" → ["B"] / ["A","C"] / … ; không đọc được → null. */
export function parseAnswerLetters(rest: string): string[] | null {
  const letters: string[] = [];
  for (const raw of rest.split(/[\s,;&/+]+/)) {
    if (!raw) continue;
    const t = raw.toLowerCase();
    if (t === "và" || t === "and") continue;
    const m = /^([A-Ja-j]+)[.):]?$/.exec(raw);
    if (!m) break; // gặp chữ thường (vd "Hà Nội" sau "B.") thì dừng
    for (const ch of m[1].toUpperCase())
      if (!letters.includes(ch)) letters.push(ch);
  }
  return letters.length > 0 ? letters : null;
}

/**
 * Dòng đáp án hợp lệ ("A. …", "b) …") chỉ khi:
 *  - chưa qua dòng Đáp án/Gợi ý/Giải thích của câu hiện tại,
 *  - đáp án đầu tiên là A, các đáp án sau phải đứng SAU chữ cái trước đó (tránh nhầm "C. Mác" ở đầu dòng),
 *  - chữ thường phải có khoảng trắng sau dấu (tránh nhầm code như "c.listen()").
 */
function matchOption(line: string, cur: Block | null): RegExpExecArray | null {
  const m = OPTION.exec(line);
  if (!m) return null;
  if (
    cur &&
    (cur.answerRaw !== null ||
      (cur.field !== "question" && cur.field !== "option"))
  )
    return null;
  const letter = m[1];
  if (letter === letter.toLowerCase() && !/^[a-j]\s*[.):](\s|$)/.test(line))
    return null;
  const idx = LETTERS.indexOf(letter.toUpperCase());
  const lastIdx =
    cur && cur.options.length > 0
      ? LETTERS.indexOf(
          cur.options[cur.options.length - 1].letter.toUpperCase(),
        )
      : -1;
  return idx > lastIdx && (lastIdx >= 0 || idx === 0) ? m : null;
}

type Block = {
  startLine: number;
  label?: string;
  question: string;
  options: { letter: string; text: string }[];
  answerRaw: string | null;
  hint: string;
  rationale: string;
  field: "question" | "option" | "hint" | "rationale" | null;
};

const newBlock = (line: number, question = "", label?: string): Block => ({
  startLine: line,
  label,
  question,
  options: [],
  answerRaw: null,
  hint: "",
  rationale: "",
  field: "question",
});

const preview = (s: string) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > 70 ? t.slice(0, 67) + "…" : t || "(không có nội dung)";
};

const RAW_MAX_LINES = 14;
function rawExcerpt(lines: string[], start: number, end: number): string {
  const part = lines.slice(start - 1, end).map((l) => l.replace(/\s+$/, ""));
  if (part.length <= RAW_MAX_LINES) return part.join("\n");
  return [...part.slice(0, RAW_MAX_LINES), `… (còn ${part.length - RAW_MAX_LINES} dòng nữa)`].join("\n");
}

function finalize(
  b: Block,
  index: number,
): { ok: true; payload: QuestionPayload } | { ok: false; message: string } {
  if (b.options.length < 2) {
    return {
      ok: false,
      message:
        b.options.length === 0
          ? "Không thấy đáp án nào (mỗi đáp án một dòng, dạng “A. …”)."
          : "Cần ít nhất 2 đáp án.",
    };
  }
  if (b.options.length > MAX_OPTIONS)
    return { ok: false, message: `Tối đa ${MAX_OPTIONS} đáp án.` };
  for (let i = 0; i < b.options.length; i++) {
    if (b.options[i].letter.toUpperCase() !== LETTERS[i]) {
      return {
        ok: false,
        message: `Các đáp án phải đánh liên tục A, B, C… (mong chờ “${LETTERS[i]}” nhưng thấy “${b.options[i].letter}”).`,
      };
    }
  }
  if (b.answerRaw === null)
    return { ok: false, message: "Thiếu dòng “Đáp án: …”." };
  const letters = parseAnswerLetters(b.answerRaw);
  if (!letters)
    return {
      ok: false,
      message: `Không đọc được đáp án đúng từ “${preview(b.answerRaw)}”. Hãy ghi dạng “Đáp án: B” hoặc “Đáp án: A, C”.`,
    };

  const correct = letters.map((l) => LETTERS.indexOf(l));
  const bad = correct.findIndex((c) => c >= b.options.length);
  if (bad >= 0) {
    return {
      ok: false,
      message: `Đáp án ${letters[bad]} không có trong danh sách (chỉ có A–${LETTERS[b.options.length - 1]}).`,
    };
  }

  const r = validateDraft({
    question: b.question,
    options: b.options.map((o) => o.text),
    correct,
    multi: correct.length > 1,
    hint: b.hint,
    rationale: b.rationale,
  });
  void index;
  return r.ok
    ? { ok: true, payload: r.value }
    : { ok: false, message: r.error };
}

function parseText(input: string): ParseResult {
  const items: ParsedItem[] = [];
  const issues: ParseIssue[] = [];
  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  let cur: Block | null = null;
  let n = 0;
  let lastNonEmpty = 0; // số dòng gần nhất có chữ, để biết một câu kết thúc ở dòng nào

  const flush = (endLine: number) => {
    if (!cur) return;
    const b = cur;
    cur = null;
    const empty =
      !b.question.trim() && b.options.length === 0 && b.answerRaw === null;
    if (empty) return;
    n++;
    const r = finalize(b, n);
    const pos = { index: n, label: b.label, line: b.startLine, endLine };
    if (r.ok) items.push({ ...pos, payload: r.payload });
    else
      issues.push({
        ...pos,
        message: r.message,
        preview: preview(b.question),
        raw: rawExcerpt(lines, b.startLine, endLine),
      });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const raw = lines[i].replace(/\s+$/, ""); 
    const lineNo = i + 1;

    if (!line) {
      // dòng trống kết thúc một câu đã có đáp án (hoặc có đáp án nào đó)
      if (cur && (cur.options.length > 0 || cur.answerRaw !== null))
        flush(lastNonEmpty);
      continue;
    }
    const prev = lastNonEmpty; // dòng có chữ ngay trước dòng này = nơi câu trước kết thúc
    lastNonEmpty = lineNo;

    let m: RegExpExecArray | null;

    m = NUMBERED.exec(line);
    if (!m && (!cur || cur.answerRaw !== null)) m = NUMBERED_PLAIN.exec(line);
    if (m) {
      flush(prev);
      cur = newBlock(lineNo, m[2].trim(), `Câu ${m[1]}`);
      continue;
    }
    if ((m = ANSWER.exec(line)) || (m = ANSWER_NO_SEP.exec(line))) {
      if (!cur) cur = newBlock(lineNo);
      cur.answerRaw = m[1].trim();
      cur.field = null;
      continue;
    }
    if ((m = HINT.exec(line))) {
      if (!cur) cur = newBlock(lineNo);
      cur.hint = m[1].trim();
      cur.field = "hint";
      continue;
    }
    if ((m = RATIONALE.exec(line))) {
      if (!cur) cur = newBlock(lineNo);
      cur.rationale = m[1].trim();
      cur.field = "rationale";
      continue;
    }
    if ((m = matchOption(line, cur))) {
      if (!cur) cur = newBlock(lineNo);
      cur.options.push({ letter: m[1], text: m[2].trim() });
      cur.field = "option";
      continue;
    }

    // dòng thường: nối vào phần đang viết, hoặc mở câu mới
    if (!cur || cur.field === null) {
      flush(prev);
      cur = newBlock(lineNo, line);
    } else if (cur.field === "question") {
      cur.question += "\n" + raw;
    } else if (cur.field === "option") {
      cur.options[cur.options.length - 1].text += " " + line;
    } else if (cur.field === "hint") {
      cur.hint += "\n" + raw;
    } else {
      cur.rationale += "\n" + raw;
    }
  }
  flush(lastNonEmpty);
  return { format: "text", items, issues };
}

function answerToIndexes(a: unknown): number[] | { error: string } {
  const one = (v: unknown): number | null => {
    if (typeof v === "number" && Number.isInteger(v)) return v;
    if (typeof v === "string" && /^[A-Ja-j]$/.test(v.trim()))
      return LETTERS.indexOf(v.trim().toUpperCase());
    return null;
  };
  const arr = Array.isArray(a) ? a : [a];
  const out = arr.map(one);
  if (out.length === 0 || out.some((x) => x === null)) {
    return {
      error:
        "“answer” phải là số thứ tự đáp án (bắt đầu từ 0), chữ cái (A, B…), hoặc mảng các giá trị đó.",
    };
  }
  return out as number[];
}

function parseJson(input: string): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(input);
  } catch (e) {
    return {
      format: "json",
      items: [],
      issues: [
        {
          index: 0,
          message: `JSON không hợp lệ: ${(e as Error).message}`,
          preview: "",
        },
      ],
    };
  }
  const list = Array.isArray(data)
    ? data
    : data &&
        typeof data === "object" &&
        Array.isArray((data as { questions?: unknown }).questions)
      ? (data as { questions: unknown[] }).questions
      : null;
  if (!list) {
    return {
      format: "json",
      items: [],
      issues: [
        {
          index: 0,
          message:
            'JSON cần là một mảng các câu hỏi, hoặc { "questions": [...] }.',
          preview: "",
        },
      ],
    };
  }

  const items: ParsedItem[] = [];
  const issues: ParseIssue[] = [];
  list.forEach((raw, i) => {
    const index = i + 1;
    const o = (raw && typeof raw === "object" ? raw : {}) as Record<
      string,
      unknown
    >;
    const pv = preview(String(o.question ?? ""));
    const rawJson = (() => {
      const t = JSON.stringify(raw, null, 2) ?? "";
      return t.length > 500 ? t.slice(0, 500) + "\n…" : t;
    })();
    if (
      typeof o.question !== "string" ||
      !Array.isArray(o.options) ||
      o.options.some((x) => typeof x !== "string")
    ) {
      issues.push({
        index,
        message: "Mỗi câu cần “question” (chuỗi) và “options” (mảng chuỗi).",
        preview: pv,
        raw: rawJson,
      });
      return;
    }
    const idx = answerToIndexes(o.answer);
    if ("error" in idx) {
      issues.push({ index, message: idx.error, preview: pv, raw: rawJson });
      return;
    }
    const r = validateDraft({
      question: o.question,
      options: o.options as string[],
      correct: idx,
      multi: Array.isArray(o.answer),
      hint: typeof o.hint === "string" ? o.hint : "",
      rationale: typeof o.rationale === "string" ? o.rationale : "",
    });
    if (r.ok) items.push({ index, payload: r.value });
    else issues.push({ index, message: r.error, preview: pv, raw: rawJson });
  });
  return { format: "json", items, issues };
}

export function parseBulk(input: string): ParseResult {
  const t = input.trim();
  if (!t) return { format: "empty", items: [], issues: [] };
  return t.startsWith("[") || t.startsWith("{") ? parseJson(t) : parseText(t);
}

/* ------------------------------- kiểm tra trùng ------------------------------- */

/** Chuẩn hoá để so sánh: bỏ khác biệt hoa/thường, khoảng trắng và dấu ?.:; ở cuối. */
export const normalizeForDup = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\s?.:;]+$/, "");

/** Một câu đã có trong bộ đề (chỉ cần các trường dùng để so sánh). */
export type ExistingQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: number | number[];
};

/**
 * Mức độ trùng (cùng nội dung câu hỏi):
 *  - identical:      cùng cả các đáp án lẫn đáp án đúng
 *  - answer-differs: cùng câu hỏi + cùng các đáp án nhưng ĐÁP ÁN ĐÚNG KHÁC (mâu thuẫn, nên kiểm tra)
 *  - options-differ: cùng nội dung câu hỏi nhưng các đáp án khác nhau
 */
export type DupKind = "identical" | "answer-differs" | "options-differ";

export type DupTarget = {
  /** existing = câu đã có trong bộ đề; batch = câu khác trong nội dung đang dán */
  source: "existing" | "batch";
  /** existing: mã câu (#id) trong bộ đề · batch: số thứ tự trong nội dung dán */
  ref: number;
  label?: string;
  line?: number;
  endLine?: number;
  question: string;
  options: string[];
  answer: number | number[];
};

export type DupMatch = {
  kind: DupKind;
  /** identical nhưng thứ tự các đáp án khác nhau */
  reordered: boolean;
  target: DupTarget;
};

/** matches[0] là câu trùng chính (ưu tiên câu đã có trong bộ đề), các câu còn lại là trùng thêm. */
export type DupInfo = { matches: DupMatch[] };

export const DUP_KIND_LABEL: Record<DupKind, string> = {
  identical: "Giống hệt",
  "answer-differs": "Khác đáp án đúng",
  "options-differ": "Khác các đáp án",
};

export function describeDup(m: DupMatch): string {
  switch (m.kind) {
    case "identical":
      return m.reordered
        ? "Cùng nội dung câu hỏi, cùng các đáp án và cùng đáp án đúng (chỉ khác thứ tự sắp xếp đáp án)."
        : "Cùng nội dung câu hỏi, cùng các đáp án và cùng đáp án đúng.";
    case "answer-differs":
      return "Cùng nội dung câu hỏi và cùng các đáp án, nhưng ĐÁP ÁN ĐÚNG KHÁC nhau — nên kiểm tra xem bên nào đúng.";
    case "options-differ":
      return "Cùng nội dung câu hỏi nhưng các đáp án khác nhau (có thể là bản sửa, hoặc câu khác dùng chung đề bài).";
  }
}

const toArr = (a: number | number[]) => (Array.isArray(a) ? a : [a]);
const SEP = "\u0000";

function compare(
  a: { options: string[]; answer: number | number[] },
  b: { options: string[]; answer: number | number[] },
): { kind: DupKind; reordered: boolean } {
  const oa = a.options.map(normalizeForDup);
  const ob = b.options.map(normalizeForDup);
  const sameSet =
    oa.length === ob.length &&
    [...oa].sort().join(SEP) === [...ob].sort().join(SEP);
  if (!sameSet) return { kind: "options-differ", reordered: false };
  const correct = (x: string[], ans: number | number[]) =>
    toArr(ans)
      .map((i) => x[i])
      .sort()
      .join(SEP);
  if (correct(oa, a.answer) !== correct(ob, b.answer))
    return { kind: "answer-differs", reordered: false };
  return { kind: "identical", reordered: oa.join(SEP) !== ob.join(SEP) };
}

/**
 * Tìm các câu trùng nội dung câu hỏi, cho từng câu trong `items`:
 *  1. trùng với câu ĐÃ CÓ trong bộ đề (trả về mã #id của câu đó),
 *  2. trùng với câu xuất hiện TRƯỚC ĐÓ trong chính nội dung đang dán (trả về số thứ tự/nhãn câu đó).
 * Câu đầu tiên trong nhóm trùng được coi là bản gốc; chỉ các câu sau mới bị đánh dấu.
 */
export function findDuplicates(
  items: ParsedItem[],
  existing: ExistingQuestion[],
): Map<number, DupInfo> {
  const byKey = new Map<string, ExistingQuestion[]>();
  for (const q of existing) {
    const k = normalizeForDup(q.question);
    const list = byKey.get(k);
    if (list) list.push(q);
    else byKey.set(k, [q]);
  }

  const seen = new Map<string, ParsedItem[]>();
  const out = new Map<number, DupInfo>();

  for (const it of items) {
    const k = normalizeForDup(it.payload.question);
    const mine = { options: it.payload.options, answer: it.payload.answer };
    const matches: DupMatch[] = [];

    for (const q of byKey.get(k) ?? []) {
      matches.push({
        ...compare(mine, q),
        target: {
          source: "existing",
          ref: q.id,
          question: q.question,
          options: q.options,
          answer: q.answer,
        },
      });
    }
    for (const prev of seen.get(k) ?? []) {
      matches.push({
        ...compare(mine, prev.payload),
        target: {
          source: "batch",
          ref: prev.index,
          label: prev.label,
          line: prev.line,
          endLine: prev.endLine,
          question: prev.payload.question,
          options: prev.payload.options,
          answer: prev.payload.answer,
        },
      });
    }
    if (matches.length > 0) out.set(it.index, { matches });

    const list = seen.get(k);
    if (list) list.push(it);
    else seen.set(k, [it]);
  }
  return out;
}
