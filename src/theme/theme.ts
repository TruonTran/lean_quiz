/**
 * Toàn bộ class màu sáng/tối nằm ở đây.
 * Muốn đổi màu giao diện -> chỉ sửa file này.
 * (Tailwind vẫn quét được vì class là chuỗi đầy đủ.)
 */
const dark = {
  page: "bg-[#08090c]",
  ambient: "bg-ambient",
  panel: "glass-panel bg-zinc-900/40 shadow-2xl shadow-black/50",
  sidePanel: "glass-panel bg-zinc-900/40 shadow-lg shadow-black/40",
  mobileBar: "glass-panel bg-zinc-900/85 shadow-lg shadow-black/40 backdrop-blur-md",
  card: "border border-white/10 bg-black/30",
  box: "border border-white/10 bg-white/[0.02]",
  modal: "glass-panel bg-zinc-900/90 shadow-2xl",
  overlay: "bg-black/50",

  title: "text-white",
  accent: "text-yellow-400",
  text: "text-zinc-100",
  muted: "text-zinc-400",
  faint: "text-zinc-500",

  track: "bg-white/5",
  handle: "bg-white/15 group-hover:bg-yellow-400/50",
  ghostBtn: "border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10",
  softBtn: "border border-yellow-400/25 bg-white/5 text-yellow-200 hover:bg-white/10",
  badge: "border border-yellow-400/30 bg-yellow-400/10 text-yellow-200",
  navArrow:
    "glass-panel text-zinc-300 hover:border-yellow-400/40 hover:bg-white/10 hover:text-yellow-300",
  input:
    "border border-white/10 bg-black/20 text-zinc-200 placeholder:text-zinc-600",

  toggleOn: "border-yellow-400/50 bg-yellow-400/20 text-yellow-100",
  toggleOff: "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
  flagOn: "border-red-400/50 bg-red-500/20 text-red-100",

  optionIdle:
    "border-white/10 bg-white/[0.03] text-zinc-200 hover:border-yellow-400/40 hover:bg-yellow-400/5",
  optionChecked:
    "border-yellow-400/60 bg-yellow-400/10 text-zinc-100 shadow-[0_10px_20px_rgba(246,190,66,0.16)]",
  optionCorrect:
    "border-yellow-400 bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-950 pop-correct",
  optionWrong: "border-red-500 bg-red-500/90 text-white shake-wrong",
  optionDim: "border-white/10 bg-white/[0.02] text-zinc-500",
  chosenRing: "ring-2 ring-white/80",
  letterIdle: "text-yellow-300",
  letterCorrect: "text-zinc-950",
  letterDim: "text-zinc-400",

  hint: "border border-yellow-400/25 bg-yellow-400/5 text-yellow-100",
  hintTitle: "text-yellow-300",
  correctBox: "border border-yellow-400/30 bg-yellow-400/5 text-yellow-50",
  wrongBox: "border border-red-400/40 bg-red-500/10 text-red-50",

  cellIdle: "bg-white/5 text-zinc-400 hover:bg-white/10",
  cellCurrent: "bg-[#f9c645] text-[#2a1a00] ring-2 ring-[#f2b12e]",
  cellDone: "bg-zinc-100 text-zinc-900",
  cellFlagged: "bg-red-500/20 text-red-200 border border-red-400/40",
  rangeActive: "bg-yellow-400 text-zinc-950",
  rangeIdle: "bg-white/5 text-zinc-300 hover:bg-white/10",
};

export type ExamTheme = Record<keyof typeof dark, string>;

const light: ExamTheme = {
  page: "bg-[#f5f2ec]",
  ambient: "",
  panel: "border border-zinc-200 bg-white shadow-xl shadow-zinc-300/40",
  sidePanel: "border border-zinc-200 bg-white shadow-lg shadow-zinc-300/40",
  mobileBar: "border border-zinc-200 bg-white/90 shadow-lg shadow-zinc-300/50 backdrop-blur-md",
  card: "border border-zinc-200 bg-zinc-50",
  box: "border border-zinc-200 bg-white",
  modal: "border border-zinc-200 bg-white shadow-2xl",
  overlay: "bg-black/40",

  title: "text-zinc-900",
  accent: "text-amber-600",
  text: "text-zinc-900",
  muted: "text-zinc-500",
  faint: "text-zinc-400",

  track: "bg-zinc-200",
  handle: "bg-zinc-300 group-hover:bg-amber-400",
  ghostBtn: "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100",
  softBtn: "border border-amber-400/50 bg-amber-50 text-amber-800 hover:bg-amber-100",
  badge: "border border-amber-400/50 bg-amber-100 text-amber-800",
  navArrow:
    "border border-zinc-200 bg-white text-zinc-600 shadow hover:border-amber-400 hover:text-amber-600",
  input:
    "border border-zinc-300 bg-white text-zinc-800 placeholder:text-zinc-400",

  toggleOn: "border-amber-400 bg-amber-100 text-amber-900",
  toggleOff: "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100",
  flagOn: "border-red-300 bg-red-100 text-red-700",

  optionIdle:
    "border-zinc-200 bg-white text-zinc-800 hover:border-amber-400 hover:bg-amber-50",
  optionChecked:
    "border-amber-400 bg-amber-100 text-zinc-900 shadow-[0_10px_20px_rgba(246,190,66,0.25)]",
  optionCorrect:
    "border-yellow-400 bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-950 pop-correct",
  optionWrong: "border-red-500 bg-red-500/90 text-white shake-wrong",
  optionDim: "border-zinc-200 bg-zinc-100 text-zinc-400",
  chosenRing: "ring-2 ring-zinc-900/70",
  letterIdle: "text-amber-600",
  letterCorrect: "text-zinc-950",
  letterDim: "text-zinc-400",

  hint: "border border-amber-300 bg-amber-50 text-amber-900",
  hintTitle: "text-amber-700",
  correctBox: "border border-amber-300 bg-amber-50 text-zinc-800",
  wrongBox: "border border-red-300 bg-red-50 text-red-900",

  cellIdle: "bg-zinc-100 text-zinc-500 hover:bg-zinc-200",
  cellCurrent: "bg-[#f9c645] text-[#2a1a00] ring-2 ring-[#f2b12e]",
  cellDone: "bg-zinc-900 text-white",
  cellFlagged: "bg-[#f5d5d5] text-[#7a2d2d] border border-[#e7a8a8]",
  rangeActive: "bg-amber-500 text-white",
  rangeIdle: "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
};

export type ThemeMode = "dark" | "light";
export const examThemes: Record<ThemeMode, ExamTheme> = { dark, light };
