import type { Subject } from "../../src/types/Subject";

export type SubjectRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type QuestionRow = {
  subject_id: string;
  id: number;
  question: string;
  options: string[];
  answer: number | number[];
  hint: string | null;
  rationale: string | null;
};

export function toRows(subjects: Subject[]) {
  const subjectRows: SubjectRow[] = subjects.map((s, i) => ({
    id: s.id,
    code: s.code,
    name: s.name,
    description: s.description ?? null,
    sort_order: i,
  }));

  const questionRows: QuestionRow[] = subjects.flatMap((s) =>
    s.questions.map((q) => ({
      subject_id: s.id,
      id: q.id,
      question: q.question,
      options: q.options,
      answer: q.answer,
      hint: q.hint ?? null,
      rationale: q.rationale ?? null,
    })),
  );

  return { subjectRows, questionRows };
}

export function validate(subjects: Subject[]): string[] {
  const problems: string[] = [];
  const subjectIds = new Set<string>();

  for (const s of subjects) {
    if (subjectIds.has(s.id)) problems.push(`Trùng id môn: ${s.id}`);
    subjectIds.add(s.id);

    const seen = new Set<number>();
    for (const q of s.questions) {
      const where = `${s.id} câu id=${q.id}`;

      if (!Number.isInteger(q.id)) problems.push(`${where}: id không phải số nguyên`);
      if (seen.has(q.id)) problems.push(`${where}: trùng id`);
      seen.add(q.id);

      if (!q.question?.trim()) problems.push(`${where}: câu hỏi rỗng`);
      if (!Array.isArray(q.options) || q.options.length < 2) {
        problems.push(`${where}: cần ít nhất 2 đáp án`);
        continue;
      }
      if (q.options.some((o) => typeof o !== "string" || !o.trim())) {
        problems.push(`${where}: có đáp án rỗng`);
      }

      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      if (answers.length === 0) problems.push(`${where}: answer rỗng`);
      for (const a of answers) {
        if (!Number.isInteger(a) || a < 0 || a >= q.options.length) {
          problems.push(
            `${where}: answer=${a} nằm ngoài khoảng 0..${q.options.length - 1}`,
          );
        }
      }
      if (Array.isArray(q.answer) && new Set(q.answer).size !== q.answer.length) {
        problems.push(`${where}: answer có phần tử trùng`);
      }
    }
  }
  return problems;
}
