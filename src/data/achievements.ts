export type DayRow = { day: string; answered: number; correct: number };

const DAY_MS = 86_400_000;

export const vnToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });

const toMs = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const fromMs = (ms: number) => new Date(ms).toISOString().slice(0, 10);
export const addDays = (iso: string, n: number) => fromMs(toMs(iso) + n * DAY_MS);

export const weekStart = (iso: string) => {
  const dow = (new Date(toMs(iso)).getUTCDay() + 6) % 7; // 0 = thứ Hai
  return addDays(iso, -dow);
};
export const monthStart = (iso: string) => `${iso.slice(0, 7)}-01`;
export const yearStart = (iso: string) => `${iso.slice(0, 4)}-01-01`;

export type PeriodStat = { answered: number; correct: number; activeDays: number };

function sumFrom(rows: DayRow[], start: string): PeriodStat {
  const out = { answered: 0, correct: 0, activeDays: 0 };
  for (const r of rows) {
    if (r.day >= start && r.answered > 0) {
      out.answered += r.answered;
      out.correct += r.correct;
      out.activeDays += 1;
    }
  }
  return out;
}

export type Summary = {
  week: PeriodStat;
  month: PeriodStat;
  year: PeriodStat;
  totalAnswered: number;
  currentStreak: number;
  bestStreak: number;
  perfectWeeks: number;
  busyMonths: number; 
};

export function summarize(rows: DayRow[], today = vnToday()): Summary {
  const active = new Set(rows.filter((r) => r.answered > 0).map((r) => r.day));
  const days = [...active].sort();

  // chuỗi dài nhất
  let best = 0;
  let run = 0;
  let prev = "";
  for (const d of days) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }

  // chuỗi hiện tại: tính đến hôm nay, hoặc đến hôm qua nếu hôm nay chưa làm
  let cursor = active.has(today) ? today : addDays(today, -1);
  let current = 0;
  while (active.has(cursor)) {
    current += 1;
    cursor = addDays(cursor, -1);
  }

  // tuần đủ 7 ngày, tháng từ 20 ngày
  const perWeek = new Map<string, number>();
  const perMonth = new Map<string, number>();
  for (const d of days) {
    const w = weekStart(d);
    perWeek.set(w, (perWeek.get(w) ?? 0) + 1);
    const m = d.slice(0, 7);
    perMonth.set(m, (perMonth.get(m) ?? 0) + 1);
  }

  return {
    week: sumFrom(rows, weekStart(today)),
    month: sumFrom(rows, monthStart(today)),
    year: sumFrom(rows, yearStart(today)),
    totalAnswered: rows.reduce((s, r) => s + r.answered, 0),
    currentStreak: current,
    bestStreak: best,
    perfectWeeks: [...perWeek.values()].filter((n) => n >= 7).length,
    busyMonths: [...perMonth.values()].filter((n) => n >= 20).length,
  };
}

export type Badge = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  current: number;
  target: number;
};

export function badgesFor(s: Summary): Badge[] {
  const streak = (target: number, icon: string, title: string): Badge => ({
    id: `streak-${target}`,
    icon,
    title,
    desc: `Học liên tiếp ${target} ngày`,
    current: s.bestStreak,
    target,
  });
  const volume = (target: number, icon: string, title: string): Badge => ({
    id: `volume-${target}`,
    icon,
    title,
    desc: `Làm tổng cộng ${target.toLocaleString("vi-VN")} câu`,
    current: s.totalAnswered,
    target,
  });

  return [
    streak(3, "🔥", "Khởi động"),
    streak(7, "📅", "Một tuần liên tục"),
    streak(30, "🏅", "Kiên trì một tháng"),
    streak(100, "💎", "Bền bỉ 100 ngày"),
    streak(365, "👑", "Trọn một năm"),
    { id: "perfect-week", icon: "🌟", title: "Tuần trọn vẹn", desc: "Học đủ 7/7 ngày trong một tuần", current: s.perfectWeeks, target: 1 },
    { id: "perfect-week-4", icon: "🌠", title: "Bốn tuần trọn vẹn", desc: "Có 4 tuần học đủ 7/7 ngày", current: s.perfectWeeks, target: 4 },
    { id: "busy-month", icon: "🗓️", title: "Tháng chăm chỉ", desc: "Học từ 20 ngày trở lên trong một tháng", current: s.busyMonths, target: 1 },
    volume(100, "🎯", "100 câu đầu tiên"),
    volume(500, "🚀", "500 câu"),
    volume(1000, "🏆", "1.000 câu"),
    volume(5000, "🦄", "5.000 câu"),
  ];
}

/** Huy hiệu cho phần thi viết: tính theo số bài đã hoàn thành. */
export function essayBadges(completed: number): Badge[] {
  const b = (target: number, icon: string, title: string): Badge => ({
    id: `essay-${target}`,
    icon,
    title,
    desc: target === 1 ? "Hoàn thành bài viết đầu tiên" : `Hoàn thành ${target} bài viết`,
    current: completed,
    target,
  });
  return [b(1, "✍️", "Cây bút mới"), b(5, "📝", "Cây bút chăm chỉ"), b(10, "📚", "Nhà văn tập sự")];
}
