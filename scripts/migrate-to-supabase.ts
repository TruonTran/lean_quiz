import { existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { subjects } from "../src/data/subjects";
import { toRows, validate } from "./lib/rows";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const overwrite = args.has("--overwrite");
const BATCH = 500;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  const problems = validate(subjects);
  const { subjectRows, questionRows } = toRows(subjects);

  console.log("Nguồn dữ liệu:");
  for (const s of subjects) {
    console.log(`  ${s.code.padEnd(8)} ${String(s.questions.length).padStart(5)} câu`);
  }
  console.log(`  Tổng: ${subjectRows.length} môn, ${questionRows.length} câu\n`);

  if (problems.length > 0) {
    console.error(`Phát hiện ${problems.length} vấn đề trong dữ liệu:`);
    problems.slice(0, 50).forEach((p) => console.error("  - " + p));
    if (problems.length > 50) console.error(`  ... và ${problems.length - 50} vấn đề nữa`);
    process.exit(1);
  }
  console.log("Dữ liệu hợp lệ.");
  if (dryRun) return;

  if (!process.env.SUPABASE_URL && existsSync(".env.migrate.local")) {
    process.loadEnvFile(".env.migrate.local");
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Thiếu SUPABASE_URL hoặc SUPABASE_SECRET_KEY (xem .env.migrate.local).");
    process.exit(1);
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const ignoreDuplicates = !overwrite;
  console.log(
    overwrite
      ? "Chế độ --overwrite: dòng đã có sẽ bị ghi đè."
      : "Chế độ mặc định: bỏ qua dòng đã có (không ghi đè chỉnh sửa trong DB).",
  );

  const { error: subjectError } = await supabase
    .from("subjects")
    .upsert(subjectRows, { onConflict: "id", ignoreDuplicates });
  if (subjectError) throw subjectError;
  console.log(`  subjects: ${subjectRows.length} dòng`);

  let done = 0;
  for (const batch of chunk(questionRows, BATCH)) {
    const { error } = await supabase
      .from("questions")
      .upsert(batch, { onConflict: "subject_id,id", ignoreDuplicates });
    if (error) throw error;
    done += batch.length;
    console.log(`  questions: ${done}/${questionRows.length}`);
  }

  console.log("\nĐối chiếu:");
  let ok = true;
  for (const s of subjects) {
    const { count, error } = await supabase
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("subject_id", s.id);
    if (error) throw error;
    const match = count === s.questions.length;
    ok &&= match;
    console.log(`  ${s.code.padEnd(8)} nguồn ${s.questions.length} / DB ${count} ${match ? "done" : "error"}`);
  }
  if (!ok) {
    console.error("\nSố câu không khớp — kiểm tra lại (có thể DB đã có thêm câu do bạn thêm tay).");
    process.exitCode = 1;
  } else {
    console.log("\nXong.");
  }
}

main().catch((e: unknown) => {
  const err = (e ?? {}) as { message?: string; hint?: string; details?: string };
  console.error("Lỗi:", err.message ?? String(e));
  if (err.details && err.details !== err.message) console.error("   chi tiết:", err.details);
  if (err.hint) console.error("   gợi ý:", err.hint);
  process.exit(1);
});
