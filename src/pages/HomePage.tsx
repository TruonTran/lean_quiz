import { Link } from "react-router-dom";
import { useSubjectList } from "../data/hooks";
import { useExamStore } from "../store/examStore";
import { hasQuiz } from "../types/Subject";
import { useEssayStore } from "../store/essayStore";

type Section = {
  to: string;
  icon: string;
  title: string;
  desc: string;
  stat: string;
  cta: string;
};

export default function HomePage() {
  const allAnswers = useExamStore((s) => s.answers);
  const allNotes = useExamStore((s) => s.notes);
  const { data: subjects } = useSubjectList();

  const answeredTotal = Object.values(allAnswers).reduce(
    (sum, a) => sum + Object.keys(a).length,
    0,
  );
  const essayDrafts = useEssayStore((s) => s.drafts);
  const essayTotal = Object.values(essayDrafts).filter((d) => d.text.trim()).length;
  const noteTotal = Object.values(allNotes).reduce(
    (sum, n) => sum + Object.values(n).filter((t) => t.trim()).length,
    0,
  );
  const summaryTotal =
    subjects?.filter((s) => hasQuiz(s.examType) && s.summaryCount > 0).length ?? 0;

  const sections: Section[] = [
    {
      to: "/subjects",
      icon: "🎯",
      title: "Môn học",
      desc: "Chọn môn rồi làm trắc nghiệm, theo dõi tiến độ và làm lại câu sai.",
      stat: subjects
        ? `${subjects.filter((s) => hasQuiz(s.examType)).length} môn · ${answeredTotal} câu đã làm`
        : "Đang tải…",
      cta: "Chọn môn để học",
    },
    {
      to: "/essays",
      icon: "🖋️",
      title: "Thi viết",
      desc: "Đọc đề tự luận, viết bài của bạn và đối chiếu với bài mẫu.",
      stat: essayTotal > 0 ? `${essayTotal} bài đã viết` : "Đã có đề. Vào viết bài đầu tiên",
      cta: "Luyện viết",
    },
    {
      to: "/summary",
      icon: "📚",
      title: "Tóm tắt kiến thức",
      desc: "Các ý chính của từng môn, đọc nhanh trước khi vào làm bài.",
      stat: !subjects
        ? "Đang tải…"
        : summaryTotal > 0
          ? `${summaryTotal} môn đã có tóm tắt`
          : "Đang cập nhật",
      cta: "Xem tóm tắt",
    },
    {
      to: "/notes",
      icon: "📝",
      title: "Ghi chú",
      desc: "Mọi ghi chú bạn viết trong lúc làm bài, gộp lại theo từng môn.",
      stat: `${noteTotal} ghi chú`,
      cta: "Mở ghi chú",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090c] p-6 sm:p-10">
      <div className="bg-ambient" />

      {/* Orb trôi nổi trang trí - thuần hiệu ứng, không ảnh hưởng bố cục */}
      <div
        aria-hidden="true"
        className="floating-orb -left-16 top-10 h-72 w-72 bg-yellow-400/10"
        style={{ animationDelay: "0s", animationDuration: "8s" }}
      />
      <div
        aria-hidden="true"
        className="floating-orb right-0 top-1/3 h-56 w-56 bg-amber-500/10"
        style={{ animationDelay: "1.2s", animationDuration: "9s" }}
      />
      <div
        aria-hidden="true"
        className="floating-orb bottom-0 left-1/3 h-64 w-64 bg-yellow-300/10"
        style={{ animationDelay: "2.4s", animationDuration: "7s" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span
            className="fade-up font-mono-brand inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-yellow-300"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_theme(colors.yellow.400)]" />
            Nền tảng ôn luyện
          </span>

          <h1
            className="fade-up mt-5 text-4xl font-extrabold text-white sm:text-5xl"
            style={{ animationDelay: "0.15s" }}
          >
            Quiz{" "}
            <span className="text-gradient-animate bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Cùng T
            </span>
          </h1>
          <p
            className="fade-up mt-4 text-base text-zinc-400 sm:text-lg"
            style={{ animationDelay: "0.25s" }}
          >
            Hôm nay của bạn thế nào?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="glass-panel glow-hover fade-up group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900/40 p-7 shadow-lg shadow-black/40"
              style={{ animationDelay: `${0.35 + i * 0.1}s` }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-yellow-400/10 opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-3xl">
                <span aria-hidden="true">{s.icon}</span>
              </div>

              <h2 className="relative mt-5 text-2xl font-bold text-yellow-300">
                {s.title}
              </h2>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {s.desc}
              </p>

              <span className="font-mono-brand relative mt-5 inline-block self-start rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                {s.stat}
              </span>

              <span className="shine-sweep relative mt-5 block w-full rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 py-2 text-center font-semibold text-zinc-950 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-yellow-500/20">
                {s.cta} →
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-10 flex flex-col items-center gap-2">
          <Link
            to="/contact"
            className="rounded-full border border-yellow-400/25 bg-white/5 px-4 py-1.5 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            💌 Liên hệ để cập nhật đề
          </Link>
          <Link to="/admin" className="text-xs text-zinc-600 transition hover:text-zinc-400">
            Quản trị
          </Link>
        </div>
      </div>
    </div>
  );
}
