import { subjects } from "../src/data/subjects/index.ts";
import { SAMPLE_TEXT, parseAnswerLetters, parseBulk } from "../src/data/bulkImport.ts";
let pass = 0, fail = 0;
const ok = (n: string, c: boolean, x = "") => { if (c) pass++; else fail++; console.log(`${c ? "✅" : "❌"} ${n} ${x}`); };
const one = (t: string) => { const r = parseBulk(t); return { ...r, p: r.items[0]?.payload }; };

// ---------- định dạng mẫu ----------
const s = parseBulk(SAMPLE_TEXT);
ok("mẫu: 3 câu hợp lệ, 0 lỗi", s.items.length === 3 && s.issues.length === 0, JSON.stringify(s.issues));
ok("mẫu: câu 1 chọn 1 (đáp án A = 0) + gợi ý + giải thích", s.items[0].payload.answer === 0 && s.items[0].payload.hint === "Thành phố nghìn năm văn hiến" && s.items[0].payload.rationale!.startsWith("Hà Nội"));
ok("mẫu: câu 2 chọn nhiều [0,2]", JSON.stringify(s.items[1].payload.answer) === "[0,2]");
ok("mẫu: câu 3 chỉ 2 đáp án", s.items[2].payload.options.length === 2);

// ---------- các kiểu viết khác nhau ----------
ok("đánh số kiểu '1.' và đáp án 'a)'", (() => { const r = one("1. Hỏi gì?\na) x\nb) y\nĐáp án: b"); return r.p?.answer === 1 && r.p.options.join() === "x,y"; })());
ok("đánh số kiểu 'Q2)' / 'Question 3.'", parseBulk("Q2) Hỏi?\nA. x\nB. y\nAnswer: A\n\nQuestion 3. Hỏi nữa?\nA. x\nB. y\nAnswer: B").items.length === 2);
ok("KHÔNG đánh số, ngăn cách bằng dòng trống", parseBulk("Hỏi một?\nA. x\nB. y\nĐáp án: A\n\nHỏi hai?\nA. x\nB. y\nĐáp án: B").items.length === 2);
ok("KHÔNG đánh số, KHÔNG dòng trống (câu mới bắt đầu sau dòng Đáp án)", parseBulk("Hỏi một?\nA. x\nB. y\nĐáp án: A\nHỏi hai?\nA. x\nB. y\nĐáp án: B").items.length === 2);
ok("xuống dòng kiểu Windows (CRLF)", parseBulk("Câu 1: Hỏi?\r\nA. x\r\nB. y\r\nĐáp án: B\r\n").items[0]?.payload.answer === 1);
ok("câu hỏi nhiều dòng giữ xuống dòng", one("Câu 1: Dòng một\nDòng hai\nA. x\nB. y\nĐáp án: A").p?.question === "Dòng một\nDòng hai");
ok("đáp án nhiều dòng nối bằng khoảng trắng", one("Câu 1: H?\nA. phần một\ntiếp phần hai\nB. y\nĐáp án: A").p?.options[0] === "phần một tiếp phần hai");
ok("giải thích nhiều dòng", one("Câu 1: H?\nA. x\nB. y\nĐáp án: A\nGiải thích: dòng 1\ndòng 2").p?.rationale === "dòng 1\ndòng 2");
for (const [raw, want] of [["B", "B"], ["A, C", "A,C"], ["A và C", "A,C"], ["AC", "A,C"], ["a;c", "A,C"], ["B. Hà Nội", "B"], ["C)", "C"], ["B, B", "B"]] as const)
  ok(`đọc đáp án "${raw}" → ${want}`, parseAnswerLetters(raw)?.join() === want, `(được ${parseAnswerLetters(raw)?.join()})`);
ok("đáp án 'Hà Nội' (không có chữ cái) → null", parseAnswerLetters("Hà Nội") === null);
ok("nhãn 'Đáp án đúng: C' và 'Answer: C' và 'Đáp án C'", ["Đáp án đúng: C", "Answer: C", "Đáp án C", "ĐA: C"].every(l => one(`Hỏi?\nA. x\nB. y\nC. z\n${l}`).p?.answer === 2));

// ---------- báo lỗi ----------
const err = (t: string) => parseBulk(t).issues[0]?.message ?? "";
ok("thiếu dòng Đáp án → báo", err("Câu 1: H?\nA. x\nB. y").includes("Thiếu dòng"));
ok("chỉ 1 đáp án → báo", err("Câu 1: H?\nA. x\nĐáp án: A").includes("ít nhất 2"));
ok("đáp án E khi chỉ có A–D → báo rõ", err("Câu 1: H?\nA. a\nB. b\nC. c\nD. d\nĐáp án: E").includes("chỉ có A–D"));
ok("đánh số đáp án nhảy (A, B, D) → báo", err("Câu 1: H?\nA. a\nB. b\nD. d\nĐáp án: A").includes("liên tục"));
ok("không có nội dung câu hỏi → báo", err("A. a\nB. b\nĐáp án: A").includes("nội dung câu hỏi"));
ok("không có đáp án nào → báo", err("Câu 1: Chỉ có câu hỏi").includes("Không thấy đáp án"));
ok("'Đáp án: Hà Nội' → báo không đọc được", err("Câu 1: H?\nA. a\nB. b\nĐáp án: Hà Nội").includes("Không đọc được"));
ok("1 câu lỗi KHÔNG làm hỏng các câu còn lại", (() => { const r = parseBulk("Câu 1: ok\nA. a\nB. b\nĐáp án: A\n\nCâu 2: hỏng\nA. a\nB. b\n\nCâu 3: ok\nA. a\nB. b\nĐáp án: B"); return r.items.map(i => i.index).join() === "1,3" && r.issues.length === 1 && r.issues[0].index === 2 && r.issues[0].line === 6; })());
ok("văn bản rác → 0 câu, có báo lỗi (không im lặng)", (() => { const r = parseBulk("xin chào đây là một đoạn văn bất kỳ"); return r.items.length === 0 && r.issues.length === 1; })());
ok("rỗng → format empty, không lỗi", (() => { const r = parseBulk("   \n  "); return r.format === "empty" && r.issues.length === 0; })());


// ---------- các lỗi nhận nhầm tìm ra từ dữ liệu thật ----------
ok("dòng 'C. Mác …' trong nội dung câu hỏi KHÔNG bị nhận là đáp án C", (() => { const r = one("Câu 1: Đoạn văn sau:\nC. Mác và Ph. Ăngghen viết rằng...\nA. x\nB. y\nĐáp án: A"); return r.p?.options.join() === "x,y" && r.p.question.includes("C. Mác"); })());
ok("dòng 'C.Mác' (không cách) cũng vậy", (() => { const r = one("Câu 1: Trích:\nC.Mác nói...\nA. x\nB. y\nĐáp án: B"); return r.p?.options.length === 2 && r.p.answer === 1; })());
ok("code 'c.add(1);' và 'a.foo()' trong câu hỏi KHÔNG bị nhận là đáp án", (() => { const r = one("Câu 1: Cho code:\nvar c = Ctl();\nc.add(1);\na.foo();\nKết quả?\nA. 1\nB. 2\nĐáp án: A"); return r.p?.options.join() === "1,2" && r.p.question.includes("c.add(1);") && r.p.question.includes("a.foo();"); })());
ok("danh sách '1. … 2. …' trong nội dung câu hỏi KHÔNG tách thành câu mới", (() => { const r = parseBulk("Câu 1: Cho các phát biểu:\n1. Phát biểu một\n2. Phát biểu hai\nA. Chỉ 1\nB. Cả hai\nĐáp án: B"); return r.items.length === 1 && r.issues.length === 0 && r.items[0].payload.question.includes("2. Phát biểu hai"); })());
ok("đáp án chữ thường 'a) x' vẫn nhận, 'a.foo' (không cách) thì không", (() => { const r = one("Hỏi?\na) x\nb) y\nĐáp án: a"); const q = one("Hỏi?\na.foo()\nA. x\nB. y\nĐáp án: A"); return r.p?.options.join() === "x,y" && q.p?.options.join() === "x,y"; })());
ok("giải thích có dòng 'C. Mác …' vẫn nằm trong giải thích", (() => { const r = one("Câu 1: H?\nA. x\nB. y\nC. z\nD. w\nĐáp án: A\nGiải thích: Dòng một\nC. Mác nói thế.\nD. Còn nữa"); return r.p?.options.length === 4 && r.p.rationale === "Dòng một\nC. Mác nói thế.\nD. Còn nữa"; })());
ok("vẫn báo lỗi khi đáp án nhảy cóc (A, B, D)", err("Câu 1: H?\nA. a\nB. b\nD. d\nĐáp án: A").includes("liên tục"));

ok("giữ thụt đầu dòng của code trong câu hỏi", one("Câu 1: Code:\nvoid f() {\n  if (x) {\n    y();\n  }\n}\nA. x\nB. y\nĐáp án: A").p?.question === "Code:\nvoid f() {\n  if (x) {\n    y();\n  }\n}");

// ---------- JSON ----------
const js = parseBulk(JSON.stringify([{ question: "Q?", options: ["a", "b", "c"], answer: 1 }, { question: "Q2?", options: ["a", "b", "c"], answer: [0, 2], hint: "h" }]));
ok("JSON mảng: 2 câu, answer số & mảng", js.format === "json" && js.items.length === 2 && js.items[0].payload.answer === 1 && JSON.stringify(js.items[1].payload.answer) === "[0,2]");
ok("JSON bọc { questions: [...] }", parseBulk(JSON.stringify({ questions: [{ question: "Q", options: ["a", "b"], answer: 0 }] })).items.length === 1);
ok("JSON: answer là chữ cái 'B' và ['A','C']", (() => { const r = parseBulk(JSON.stringify([{ question: "Q", options: ["a", "b", "c"], answer: "B" }, { question: "Q", options: ["a", "b", "c"], answer: ["A", "C"] }])); return r.items[0].payload.answer === 1 && JSON.stringify(r.items[1].payload.answer) === "[0,2]"; })());
ok("JSON sai cú pháp → báo lỗi rõ", parseBulk("[{ bị thiếu ngoặc").issues[0]?.message.startsWith("JSON không hợp lệ"));
ok("JSON: answer ngoài khoảng → báo, câu khác vẫn nhận", (() => { const r = parseBulk(JSON.stringify([{ question: "Q", options: ["a", "b"], answer: 5 }, { question: "Q", options: ["a", "b"], answer: 0 }])); return r.items.length === 1 && r.issues.length === 1 && r.issues[0].index === 1; })());
ok("JSON: thiếu options → báo", parseBulk(JSON.stringify([{ question: "Q", answer: 0 }])).issues.length === 1);

// ---------- ĐỌC NGƯỢC TOÀN BỘ DỮ LIỆU THẬT ----------
const L = "ABCDEFGHIJ";
const toText = (qs: typeof subjects[0]["questions"]) => qs.map((q, i) =>
  [`Câu ${i + 1}: ${q.question}`, ...q.options.map((o, j) => `${L[j]}. ${o}`),
   `Đáp án: ${(Array.isArray(q.answer) ? q.answer : [q.answer]).map(a => L[a]).join(", ")}`,
   ...(q.hint ? [`Gợi ý: ${q.hint}`] : []), ...(q.rationale ? [`Giải thích: ${q.rationale}`] : [])].join("\n")).join("\n\n");
const norm = (s: string | null | undefined) => (s ?? "").trim();
let total = 0, mismatch = 0, lost = 0; const bad: string[] = [];
for (const sub of subjects) {
  const r = parseBulk(toText(sub.questions));
  lost += sub.questions.length - r.items.length; total += sub.questions.length;
  for (const it of r.items) {
    const q = sub.questions[it.index - 1], p = it.payload;
    const same = norm(p.question) === norm(q.question) && JSON.stringify(p.options) === JSON.stringify(q.options.map(norm)) &&
      JSON.stringify(p.answer) === JSON.stringify(q.answer) && norm(p.hint) === norm(q.hint) && norm(p.rationale) === norm(q.rationale);
    if (!same) { mismatch++; if (bad.length < 4) bad.push(`${sub.id}#${q.id}`); }
  }
  if (r.issues.length) bad.push(`${sub.id}: ${r.issues.length} lỗi, vd "${r.issues[0].message}" @ ${r.issues[0].preview}`);
}
ok(`TEXT: xuất rồi đọc lại ${total} câu thật → không mất câu nào`, lost === 0, `(mất ${lost})`);
ok(`TEXT: ... và không câu nào bị đổi nội dung/đáp án`, mismatch === 0, `(đổi ${mismatch}) ${bad.join(" | ")}`);
let jl = 0; for (const sub of subjects) { const r = parseBulk(JSON.stringify(sub.questions)); jl += sub.questions.length - r.items.length; }
ok("JSON: xuất rồi đọc lại toàn bộ 1668 câu → không mất câu nào", jl === 0, `(mất ${jl})`);

console.log(`\n${pass} đạt, ${fail} lỗi`); process.exit(fail ? 1 : 0);
