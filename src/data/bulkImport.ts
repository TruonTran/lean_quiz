import { MAX_OPTIONS, validateDraft, type QuestionPayload } from "./drafts";

export type ParsedItem = { index: number; payload: QuestionPayload };
export type ParseIssue = {
  index: number;
  line?: number;
  message: string;
  preview: string;
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

const NUMBERED = /^(?:câu|cau|question|q)\s*\.?\s*\d+\s*[.:)\-–]\s*(.*)$/i; // "Câu 1: …", "Q2. …"
const NUMBERED_PLAIN = /^\d+\s*[.)]\s+(.*)$/; // "1. …", "12) …"
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
  question: string;
  options: { letter: string; text: string }[];
  answerRaw: string | null;
  hint: string;
  rationale: string;
  field: "question" | "option" | "hint" | "rationale" | null;
};

const newBlock = (line: number, question = ""): Block => ({
  startLine: line,
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
  let cur: Block | null = null;
  let n = 0;

  const flush = () => {
    if (!cur) return;
    const b = cur;
    cur = null;
    const empty =
      !b.question.trim() && b.options.length === 0 && b.answerRaw === null;
    if (empty) return;
    n++;
    const r = finalize(b, n);
    if (r.ok) items.push({ index: n, payload: r.payload });
    else
      issues.push({
        index: n,
        line: b.startLine,
        message: r.message,
        preview: preview(b.question),
      });
  };

  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const raw = lines[i].replace(/\s+$/, ""); 
    const lineNo = i + 1;

    if (!line) {
      // dòng trống kết thúc một câu đã có đáp án (hoặc có đáp án nào đó)
      if (cur && (cur.options.length > 0 || cur.answerRaw !== null)) flush();
      continue;
    }

    let m: RegExpExecArray | null;

    m = NUMBERED.exec(line);
    if (!m && (!cur || cur.answerRaw !== null)) m = NUMBERED_PLAIN.exec(line);
    if (m) {
      flush();
      cur = newBlock(lineNo, m[1].trim());
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
      flush();
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
  flush();
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
    if (
      typeof o.question !== "string" ||
      !Array.isArray(o.options) ||
      o.options.some((x) => typeof x !== "string")
    ) {
      issues.push({
        index,
        message: "Mỗi câu cần “question” (chuỗi) và “options” (mảng chuỗi).",
        preview: pv,
      });
      return;
    }
    const idx = answerToIndexes(o.answer);
    if ("error" in idx) {
      issues.push({ index, message: idx.error, preview: pv });
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
    else issues.push({ index, message: r.error, preview: pv });
  });
  return { format: "json", items, issues };
}

export function parseBulk(input: string): ParseResult {
  const t = input.trim();
  if (!t) return { format: "empty", items: [], issues: [] };
  return t.startsWith("[") || t.startsWith("{") ? parseJson(t) : parseText(t);
}

export const normalizeForDup = (s: string) =>
  s.toLowerCase().replace(/\s+/g, " ").trim();
