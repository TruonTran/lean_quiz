import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { badgesFor, summarize, type PeriodStat } from "../data/achievements";
import { useLeaderboard, useMyActivity, useMyProfile } from "../data/hooks";
import PageShell from "../components/PageShell";
import RequireAuth from "../components/RequireAuth";
import { ErrorBox, Loading } from "../components/LoadState";
import { inputClass, panel, primaryBtn } from "../components/adminStyles";

type Period = "week" | "month" | "year";
const PERIOD_LABEL: Record<Period, string> = { week: "Tuần này", month: "Tháng này", year: "Năm nay" };
const MEDAL = ["🥇", "🥈", "🥉"];

const pct = (c: number, a: number) => (a > 0 ? `${Math.round((c / a) * 100)}%` : "–");

function StatCard({ label, stat }: { label: string; stat: PeriodStat }) {
  return (
    <div className={panel}>
      <p className="font-mono-brand text-xs uppercase tracking-widest text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-yellow-300">{stat.answered}</p>
      <p className="text-sm text-zinc-400">câu đã làm</p>
      <p className="mt-3 text-xs text-zinc-500">
        Đúng {pct(stat.correct, stat.answered)} · học {stat.activeDays} ngày
      </p>
    </div>
  );
}

function Leaderboard() {
  const [period, setPeriod] = useState<Period>("week");
  const q = useLeaderboard(period);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-yellow-300">Bảng xếp hạng</h2>
      <div className="flex gap-2" role="tablist">
        {(Object.keys(PERIOD_LABEL) as Period[]).map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={period === p}
            onClick={() => setPeriod(p)}
            className={
              period === p
                ? "rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-1.5 text-sm font-semibold text-zinc-950"
                : "rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-1.5 text-sm font-semibold text-yellow-200 hover:bg-white/10"
            }
          >
            {PERIOD_LABEL[p]}
          </button>
        ))}
      </div>

      {q.isError ? (
        <ErrorBox error={q.error} onRetry={() => q.refetch()} />
      ) : q.isPending ? (
        <Loading />
      ) : q.data.length === 0 ? (
        <p className={`${panel} text-center text-zinc-400`}>Chưa có ai làm bài trong khoảng này. Hãy là người đầu tiên!</p>
      ) : (
        <div className={`${panel} overflow-x-auto p-0`}>
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-4 py-3">Hạng</th>
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3 text-right">Số câu</th>
                <th className="px-4 py-3 text-right">Đúng</th>
                <th className="px-4 py-3 text-right">Ngày học</th>
              </tr>
            </thead>
            <tbody>
              {q.data.map((r) => (
                <tr
                  key={`${r.rnk}-${r.name}-${r.total_answered}-${r.is_me}`}
                  className={r.is_me ? "bg-yellow-400/10 font-semibold text-yellow-200" : "text-zinc-300"}
                >
                  <td className="px-4 py-2.5">{MEDAL[r.rnk - 1] ?? r.rnk}</td>
                  <td className="px-4 py-2.5">
                    {r.name}
                    {r.is_me && " (bạn)"}
                  </td>
                  <td className="px-4 py-2.5 text-right">{r.total_answered}</td>
                  <td className="px-4 py-2.5 text-right">{pct(r.total_correct, r.total_answered)}</td>
                  <td className="px-4 py-2.5 text-right">{r.days_active}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-zinc-600">Xếp theo số câu đã làm trong khoảng thời gian. Tuần tính từ thứ Hai.</p>
    </section>
  );
}

function NameEditor() {
  const userId = useAuthStore((s) => s.session?.user.id);
  const qc = useQueryClient();
  const profile = useMyProfile();
  const [draft, setDraft] = useState<string | null>(null); // null = chưa sửa, hiện tên đang lưu
  const [msg, setMsg] = useState<string | null>(null);

  const save = useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ display_name: name })
        .eq("id", userId as string)
        .select("id");
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Không tìm thấy hồ sơ của bạn. Hãy thử đăng xuất rồi đăng nhập lại.");
    },
    onSuccess: async () => {
      setDraft(null);
      setMsg("Đã lưu tên hiển thị.");
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["my-profile"] }),
        qc.invalidateQueries({ queryKey: ["leaderboard"] }),
      ]);
    },
  });

  const current = profile.data?.displayName ?? "";
  const value = draft ?? current;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setMsg(null);
    const name = value.trim();
    if (name.length < 2 || name.length > 30) return setMsg("Tên hiển thị cần từ 2 đến 30 ký tự.");
    save.mutate(name);
  };

  return (
    <form onSubmit={submit} className={`${panel} space-y-2`}>
      <label className="font-mono-brand text-xs uppercase tracking-widest text-zinc-500" htmlFor="display-name">
        Tên hiển thị
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id="display-name"
          value={value}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={30}
          disabled={profile.isPending}
          className={`${inputClass} min-w-0 flex-1`}
        />
        <button type="submit" disabled={save.isPending || value.trim() === current} className={primaryBtn}>
          {save.isPending ? "Đang lưu…" : "Lưu"}
        </button>
      </div>
      <p className="text-xs text-zinc-500">
        Tên này hiện công khai trên bảng xếp hạng với mọi người đã đăng nhập. Nên dùng biệt danh thay vì tên thật.
      </p>
      {msg && <p role="status" className="text-sm text-yellow-200">{msg}</p>}
      {save.isError && <p role="alert" className="text-sm text-red-300">{(save.error as Error).message}</p>}
    </form>
  );
}

function Content() {
  const q = useMyActivity();
  if (q.isError) return <ErrorBox error={q.error} onRetry={() => q.refetch()} />;
  if (q.isPending) return <Loading />;

  const s = summarize(q.data);
  const badges = badgesFor(s);
  const earned = badges.filter((b) => b.current >= b.target).length;

  return (
    <div className="space-y-10">
      <NameEditor />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Tuần này" stat={s.week} />
        <StatCard label="Tháng này" stat={s.month} />
        <StatCard label="Năm nay" stat={s.year} />
      </section>

      <section className={`${panel} flex flex-wrap items-center justify-around gap-6 text-center`}>
        <div>
          <p className="text-3xl font-extrabold text-yellow-300">🔥 {s.currentStreak}</p>
          <p className="text-sm text-zinc-400">ngày liên tiếp hiện tại</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold text-yellow-300">{s.bestStreak}</p>
          <p className="text-sm text-zinc-400">chuỗi dài nhất</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold text-yellow-300">{s.perfectWeeks}</p>
          <p className="text-sm text-zinc-400">tuần học đủ 7/7 ngày</p>
        </div>
      </section>

      {s.totalAnswered === 0 && (
        <div className={`${panel} text-center`}>
          <p className="text-zinc-300">Bạn chưa làm câu nào. Làm vài câu để bắt đầu tích lũy thành tích nhé!</p>
          <Link to="/subjects" className={`${primaryBtn} mt-4 inline-block`}>Chọn môn để học</Link>
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-yellow-300">
          Huy hiệu ({earned}/{badges.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => {
            const done = b.current >= b.target;
            const ratio = Math.min(1, b.current / b.target);
            return (
              <div key={b.id} className={`${panel} ${done ? "" : "opacity-60"}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl ${done ? "" : "grayscale"}`} aria-hidden="true">{b.icon}</span>
                  <div>
                    <p className={`font-bold ${done ? "text-yellow-300" : "text-zinc-300"}`}>{b.title}</p>
                    <p className="text-xs text-zinc-500">{b.desc}</p>
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" style={{ width: `${ratio * 100}%` }} />
                </div>
                <p className="font-mono-brand mt-1 text-right text-xs text-zinc-500">
                  {done ? "Đã đạt ✓" : `${Math.min(b.current, b.target)}/${b.target}`}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <Leaderboard />
    </div>
  );
}

export default function AchievementsPage() {
  return (
    <PageShell
      eyebrow="Thành tích"
      title="Thành tích của bạn"
      subtitle="Mỗi câu bạn làm trong phần quiz đều được tính vào thành tích."
      backTo="/"
      backLabel="← Trang chủ"
    >
      <RequireAuth>
        <Content />
      </RequireAuth>
    </PageShell>
  );
}
