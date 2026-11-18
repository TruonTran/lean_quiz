/**
 * Cú pháp một ý trong tóm tắt (mỗi dòng = một ý, không cần đổi DB):
 *   Đầu dòng:  `# `  tiêu đề nhỏ (không chấm)
 *              `! `  quan trọng (khung vàng nổi bật)
 *              `> `  ghi chú / ví dụ (khung nghiêng bên trái)
 *              `~ `  dòng thường nhưng không chấm
 *   Trong dòng: `==chữ==` tô vàng, `**chữ**` in đậm, `!!chữ!!` chữ đỏ
 */
type Kind = "normal" | "heading" | "important" | "note" | "plain";

export function parseKind(raw: string): { kind: Kind; text: string } {
  const m = /^(#|!|>|~)\s+(.*)$/s.exec(raw);
  if (!m) return { kind: "normal", text: raw };
  const kind: Kind =
    m[1] === "#" ? "heading" : m[1] === "!" ? "important" : m[1] === ">" ? "note" : "plain";
  return { kind, text: m[2] };
}

const hash = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
};

export const markKey = (sectionId: number, point: string) => `${sectionId}:${hash(point)}`;

