import type { ClipboardEvent } from "react";

/** Bảng viết theo cú pháp markdown: mỗi dòng bắt đầu bằng "|". */
export const isTablePoint = (p: string) => p.trimStart().startsWith("|");

export const TABLE_TEMPLATE = `| Tiêu chí | Khái niệm A | Khái niệm B |
| --- | --- | --- |
| Định nghĩa | ... | ... |
| Ví dụ | ... | ... |`;

/**
 * Tách ô nhập thành các "ý" cho tóm tắt kiến thức.
 * Mỗi dòng thường là một ý; các dòng liên tiếp bắt đầu bằng "|" gộp thành MỘT ý (một cái bảng).
 * Dòng trống kết thúc bảng, nên hai bảng liền nhau chỉ cần cách nhau một dòng trống.
 */
export function parsePoints(text: string): string[] {
  const out: string[] = [];
  let table: string[] = [];
  const flush = () => {
    if (table.length) out.push(table.join("\n"));
    table = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("|")) {
      table.push(line);
    } else {
      flush();
      if (line) out.push(line);
    }
  }
  flush();
  return out;
}

/** Bỏ các dòng bảng để làm đoạn xem trước (không hiện ký tự | lộn xộn). */
export const plainPreview = (text: string) =>
  text
    .split("\n")
    .filter((l) => !l.trimStart().startsWith("|"))
    .join(" ")
    .trim() || "(Đề có bảng — mở để xem)";

/** Bảng copy từ Word/Excel/Google Sheets là chữ ngăn bằng Tab → đổi thành bảng markdown. Không phải bảng thì trả null. */
export function tsvToMarkdownTable(text: string): string | null {
  const rows = text
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => l.trim() !== "")
    .map((l) => l.split("\t"));
  if (rows.length < 2) return null;
  const cols = rows[0].length;
  if (cols < 2 || rows.some((r) => r.length !== cols)) return null;
  const cell = (c: string) => c.trim().replace(/\|/g, "\\|") || " ";
  const line = (r: string[]) => `| ${r.map(cell).join(" | ")} |`;
  return [line(rows[0]), line(rows[0].map(() => "---")), ...rows.slice(1).map(line)].join("\n");
}

/** Gắn vào onPaste của textarea: dán bảng từ Word/Excel sẽ tự thành bảng markdown, dán chữ thường thì giữ nguyên. */
export function pasteTable(e: ClipboardEvent<HTMLTextAreaElement>, setValue: (v: string) => void) {
  const table = tsvToMarkdownTable(e.clipboardData.getData("text/plain"));
  if (!table) return;
  e.preventDefault();
  const { selectionStart, selectionEnd, value } = e.currentTarget;
  const before = value.slice(0, selectionStart);
  const after = value.slice(selectionEnd).replace(/^\n+/, "");
  const pad = !before || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
  setValue(`${before}${pad}${table}\n\n${after}`);
}

/**
 * Markdown chỉ nhận bảng khi trước và sau bảng có dòng trống. Admin hay dán bảng ngay dưới câu chữ
 * (không cách dòng) nên bảng hiện thành chữ trơn. Hàm này tự chèn dòng trống đó (bỏ qua khối code ```).
 */
export function normalizeTables(text: string): string {
  const out: string[] = [];
  let inFence = false;
  for (const line of text.split("\n")) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    const isRow = !inFence && line.trimStart().startsWith("|");
    const prev = out.length ? out[out.length - 1] : "";
    const prevIsRow = prev.trimStart().startsWith("|");
    if (!inFence && prev.trim() !== "" && isRow !== prevIsRow) out.push("");
    out.push(line);
  }
  return out.join("\n");
}
