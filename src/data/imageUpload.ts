import type { ClipboardEvent, Dispatch, SetStateAction } from "react";
import { supabase } from "../lib/supabase";
import { pasteTable, tsvToMarkdownTable } from "./tableText";

/** Tải ảnh lên kho "content-images" của Supabase (chỉ admin). Ảnh được thu nhỏ và nén trước khi tải. */

const BUCKET = "content-images";
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_SIDE = 1600; // cạnh dài tối đa sau khi thu nhỏ (px)
const MAX_INPUT_BYTES = 15 * 1024 * 1024; // ảnh gốc tối đa
export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024; // khớp giới hạn của kho ảnh trong supabase/images.sql

export const isImageFile = (f: File) => ALLOWED.includes(f.type);

/** Lấy ảnh từ clipboard (Ctrl+V), hoặc null nếu không có. */
export function imageFromClipboard(data: DataTransfer | null): File | null {
  if (!data) return null;
  for (const item of Array.from(data.items)) {
    if (item.kind === "file" && ALLOWED.includes(item.type)) {
      const f = item.getAsFile();
      if (f) return f;
    }
  }
  return null;
}

/** Thu nhỏ về tối đa 1600px và đổi sang WebP nếu nhẹ hơn. Lỗi ở bước nào thì giữ ảnh gốc. GIF giữ nguyên (ảnh động). */
async function shrink(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    const w = Math.max(1, Math.round(bmp.width * scale));
    const h = Math.max(1, Math.round(bmp.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bmp, 0, 0, w, h);
    bmp.close?.();
    const webp = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", 0.85));
    return webp && webp.type === "image/webp" && webp.size < file.size ? webp : file;
  } catch {
    return file;
  }
}

function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("bucket not found")) return "Chưa có kho ảnh. Hãy chạy supabase/images.sql trong Supabase rồi thử lại.";
  if (m.includes("row-level security") || m.includes("unauthorized") || m.includes("not authorized"))
    return "Chỉ tài khoản admin mới tải ảnh lên được. Hãy đăng nhập admin rồi thử lại.";
  if (m.includes("mime") || m.includes("not supported")) return "Định dạng ảnh không được hỗ trợ (chỉ PNG, JPG, WebP, GIF).";
  if (m.includes("size") || m.includes("too large") || m.includes("exceeded")) return "Ảnh quá lớn (tối đa 3 MB).";
  return message;
}

/** Tải ảnh lên và trả về địa chỉ công khai (https). */
export async function uploadContentImage(file: File): Promise<string> {
  if (!isImageFile(file)) throw new Error("Chỉ nhận ảnh PNG, JPG, WebP hoặc GIF.");
  if (file.size > MAX_INPUT_BYTES) throw new Error("Ảnh quá lớn (tối đa 15 MB trước khi nén).");

  const blob = await shrink(file);
  if (blob.size > MAX_UPLOAD_BYTES) {
    const mb = (blob.size / 1024 / 1024).toFixed(1);
    throw new Error(`Ảnh vẫn nặng ${mb} MB sau khi nén (tối đa 3 MB). Hãy dùng ảnh nhỏ hơn.`);
  }

  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.${EXT[blob.type] ?? "png"}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: blob.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw new Error(friendly(error.message));
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Số dòng trống cần thêm trước đoạn chèn để nó nằm riêng một đoạn. */
function caretPad(before: string): string {
  return !before || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
}

/** Chèn ảnh markdown vào văn bản tại vị trí con trỏ, cách đoạn trên và dưới một dòng trống. */
export function insertAtCaret(value: string, start: number, end: number, snippet: string): string {
  const before = value.slice(0, start);
  const after = value.slice(end).replace(/^\n+/, "");
  return `${before}${caretPad(before)}${snippet}\n\n${after}`;
}

let counter = 0;

/**
 * Gắn vào onPaste của ô nhập markdown (đề, gợi ý, bài mẫu):
 * - dán bảng từ Word/Excel → tự thành bảng markdown;
 * - dán ảnh (không kèm chữ) → tải lên rồi chèn ![](địa chỉ);
 * - còn lại để trình duyệt dán chữ như bình thường.
 * `report` nhận thông báo tiến trình / lỗi để hiện cho admin (null = xoá thông báo).
 */
export function handleContentPaste(
  e: ClipboardEvent<HTMLTextAreaElement>,
  setValue: Dispatch<SetStateAction<string>>,
  report: (message: string | null) => void,
) {
  const text = e.clipboardData.getData("text/plain");

  if (tsvToMarkdownTable(text)) {
    pasteTable(e, setValue);
    return;
  }
  if (text.trim()) return; // có chữ kèm theo: dán chữ bình thường

  const file = imageFromClipboard(e.clipboardData);
  if (!file) return;
  e.preventDefault();

  const { selectionStart, selectionEnd, value } = e.currentTarget;
  const token = `![Đang tải ảnh ${++counter}…](tai-anh-${counter})`;
  const padded = caretPad(value.slice(0, selectionStart)) + token + "\n\n"; // đúng phần đã chèn, để gỡ lại nếu lỗi
  setValue(insertAtCaret(value, selectionStart, selectionEnd, token));
  report("Đang tải ảnh lên…");

  uploadContentImage(file)
    .then((url) => {
      setValue((v) => v.replace(token, `![Hình minh hoạ](${url})`));
      report(null);
    })
    .catch((err: unknown) => {
      setValue((v) => (v.includes(padded) ? v.replace(padded, "") : v.replace(token, "")));
      report(err instanceof Error ? err.message : "Không tải được ảnh.");
    });
}
