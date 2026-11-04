import { supabase } from "../lib/supabase";
import type { Question } from "../types/Question";
import type { Subject, SubjectInfo, SummarySection } from "../types/Subject";
import type { QuestionPayload } from "./drafts";

// Khớp max_rows mặc định của Supabase (1000 dòng / request)
const PAGE_SIZE = 1000;
const QUESTION_COLS = "id, question, options, answer, hint, rationale";

type QuestionRow = {
  id: number;
  question: string;
  options: string[];
  answer: number | number[];
  hint: string | null;
  rationale: string | null;
};

const toQuestion = (r: QuestionRow): Question => ({
  id: r.id,
  question: r.question,
  options: r.options,
  answer: r.answer,
  hint: r.hint ?? undefined,
  rationale: r.rationale ?? undefined,
});

export function errMsg(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    return String((e as { message: unknown }).message);
  }
  return String(e);
}

/* ------------------------------ đọc ------------------------------ */

export async function fetchSubjectList(): Promise<SubjectInfo[]> {
  const { data, error } = await supabase
    .from("subjects")
    .select("id, code, name, description, questions(count), summary_sections(count)")
    .order("sort_order");
  if (error) throw error;

  type Row = {
    id: string;
    code: string;
    name: string;
    description: string | null;
    questions: { count: number }[];
    summary_sections: { count: number }[];
  };
  return ((data ?? []) as Row[]).map((r) => ({
    id: r.id,
    code: r.code,
    name: r.name,
    description: r.description ?? undefined,
    questionCount: r.questions[0]?.count ?? 0,
    summaryCount: r.summary_sections[0]?.count ?? 0,
  }));
}

async function fetchQuestions(subjectId: string): Promise<Question[]> {
  const out: Question[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("questions")
      .select(QUESTION_COLS)
      .eq("subject_id", subjectId)
      .order("id")
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    const rows = (data ?? []) as QuestionRow[];
    out.push(...rows.map(toQuestion));
    if (rows.length < PAGE_SIZE) break;
  }
  return out;
}

/** Một môn kèm toàn bộ câu hỏi. Trả về null nếu không có môn này. */
export async function fetchSubject(id: string): Promise<Subject | null> {
  const [subjectRes, questions] = await Promise.all([
    supabase
      .from("subjects")
      .select("id, code, name, description")
      .eq("id", id)
      .maybeSingle(),
    fetchQuestions(id),
  ]);
  if (subjectRes.error) throw subjectRes.error;
  const s = subjectRes.data as {
    id: string;
    code: string;
    name: string;
    description: string | null;
  } | null;
  if (!s) return null;
  return {
    id: s.id,
    code: s.code,
    name: s.name,
    description: s.description ?? undefined,
    questions,
  };
}

/** Chỉ lấy các câu cần hiển thị (vd: trang Ghi chú). */
export async function fetchQuestionsByIds(
  subjectId: string,
  ids: number[],
): Promise<Question[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from("questions")
    .select(QUESTION_COLS)
    .eq("subject_id", subjectId)
    .in("id", ids)
    .order("id");
  if (error) throw error;
  return ((data ?? []) as QuestionRow[]).map(toQuestion);
}

export async function fetchSummary(subjectId: string): Promise<SummarySection[]> {
  const { data, error } = await supabase
    .from("summary_sections")
    .select("id, position, title, points")
    .eq("subject_id", subjectId)
    .order("position")
    .order("id");
  if (error) throw error;
  return (data ?? []) as SummarySection[];
}

/* ------------------------ ghi (chỉ admin) ------------------------ */
// RLS chặn ghi với người không phải admin. Với update/delete, Postgres trả về
// 0 dòng thay vì báo lỗi, nên ta yêu cầu trả dòng về và tự kiểm tra.

const DENIED = "Không có quyền thực hiện (cần đăng nhập bằng tài khoản admin).";

/** Lỗi thiếu quyền (42501: bị RLS hoặc thiếu grant chặn) luôn ra cùng một thông báo thân thiện. */
function raise(error: { code?: string }): never {
  if (error.code === "42501") throw new Error(DENIED);
  throw error;
}

export async function saveSection(input: {
  id?: number;
  subjectId: string;
  title: string;
  points: string[];
  position?: number;
}): Promise<void> {
  if (input.id !== undefined) {
    const { data, error } = await supabase
      .from("summary_sections")
      .update({ title: input.title, points: input.points })
      .eq("id", input.id)
      .select("id");
    if (error) raise(error);
    if (!data || data.length === 0) throw new Error(DENIED);
    return;
  }
  const { error } = await supabase.from("summary_sections").insert({
    subject_id: input.subjectId,
    title: input.title,
    points: input.points,
    position: input.position ?? 0,
  });
  if (error) raise(error);
}

export async function deleteSection(id: number): Promise<void> {
  const { data, error } = await supabase
    .from("summary_sections")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

/** Đổi chỗ thứ tự hai chủ đề. */
export async function swapSections(
  a: SummarySection,
  b: SummarySection,
): Promise<void> {
  const results = await Promise.all([
    supabase
      .from("summary_sections")
      .update({ position: b.position })
      .eq("id", a.id)
      .select("id"),
    supabase
      .from("summary_sections")
      .update({ position: a.position })
      .eq("id", b.id)
      .select("id"),
  ]);
  for (const r of results) {
    if (r.error) raise(r.error);
    if (!r.data || r.data.length === 0) throw new Error(DENIED);
  }
}

/* ---------------- Môn & câu hỏi (chỉ admin) ---------------- */

const DUPLICATE = "23505"; // mã lỗi Postgres: vi phạm khoá duy nhất

export async function createSubject(input: {
  id: string;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;
}): Promise<void> {
  const { error } = await supabase.from("subjects").insert({
    id: input.id,
    code: input.code,
    name: input.name,
    description: input.description,
    sort_order: input.sortOrder,
  });
  if (error) {
    if (error.code === DUPLICATE) throw new Error(`Mã môn "${input.id}" đã tồn tại.`);
    raise(error);
  }
}

export async function updateSubject(
  id: string,
  input: { code: string; name: string; description: string | null },
): Promise<void> {
  const { data, error } = await supabase
    .from("subjects")
    .update(input)
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

/** Xoá môn sẽ xoá luôn toàn bộ câu hỏi và tóm tắt của môn đó. */
export async function deleteSubject(id: string): Promise<void> {
  const { data, error } = await supabase
    .from("subjects")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

/** id kế tiếp của môn = id lớn nhất hiện có + 1 (hoặc 1 nếu môn còn trống). */
async function nextQuestionId(subjectId: string): Promise<number> {
  const { data, error } = await supabase
    .from("questions")
    .select("id")
    .eq("subject_id", subjectId)
    .order("id", { ascending: false })
    .limit(1);
  if (error) raise(error);
  return ((data?.[0] as { id: number } | undefined)?.id ?? 0) + 1;
}

const BULK_CHUNK = 500;

/**
 * Thêm nhiều câu hỏi một lượt, id liên tiếp từ id lớn nhất + 1.
 * Gửi theo lô 500 câu (mỗi lô là một giao dịch). Nếu một lô giữa chừng lỗi,
 * các lô trước đó đã được lưu — thông báo lỗi nói rõ đã nhập được bao nhiêu câu.
 */
export async function createQuestionsBulk(
  subjectId: string,
  payloads: QuestionPayload[],
): Promise<{ first: number; last: number }> {
  if (payloads.length === 0) throw new Error("Không có câu hỏi nào để nhập.");
  const first = await nextQuestionId(subjectId);
  const rows = payloads.map((p, i) => ({ subject_id: subjectId, id: first + i, ...p }));

  for (let i = 0; i < rows.length; i += BULK_CHUNK) {
    const { error } = await supabase.from("questions").insert(rows.slice(i, i + BULK_CHUNK));
    if (error) {
      if (i === 0) raise(error);
      throw new Error(
        `Đã nhập được ${i} câu đầu rồi gặp lỗi: ${errMsg(error)}. Hãy kiểm tra lại danh sách câu hỏi của môn trước khi nhập tiếp.`,
      );
    }
  }
  return { first, last: first + rows.length - 1 };
}

/** Thêm câu hỏi vào cuối môn, id = id lớn nhất hiện có + 1. Trả về id mới. */
export async function createQuestion(
  subjectId: string,
  payload: QuestionPayload,
): Promise<number> {
  const id = await nextQuestionId(subjectId);

  const { error } = await supabase
    .from("questions")
    .insert({ subject_id: subjectId, id, ...payload });
  if (error) raise(error);
  return id;
}

export async function updateQuestion(
  subjectId: string,
  id: number,
  payload: QuestionPayload,
): Promise<void> {
  const { data, error } = await supabase
    .from("questions")
    .update(payload)
    .eq("subject_id", subjectId)
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}

export async function deleteQuestion(subjectId: string, id: number): Promise<void> {
  const { data, error } = await supabase
    .from("questions")
    .delete()
    .eq("subject_id", subjectId)
    .eq("id", id)
    .select("id");
  if (error) raise(error);
  if (!data || data.length === 0) throw new Error(DENIED);
}
