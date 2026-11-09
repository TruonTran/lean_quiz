import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { useIsAdmin } from "../data/hooks";
import PageShell from "../components/PageShell";
import { Loading } from "../components/LoadState";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40";

export default function AdminPage() {
  const session = useAuthStore((s) => s.session);
  const ready = useAuthStore((s) => s.ready);
  const { isAdmin, isLoading } = useIsAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(
        error.message.toLowerCase().includes("invalid")
          ? "Email hoặc mật khẩu không đúng."
          : error.message,
      );
    }
    setBusy(false);
  };

  return (
    <PageShell
      eyebrow="Quản trị"
      title="Đăng nhập admin"
      backTo="/"
      backLabel="← Trang chủ"
    >
      <div className="glass-panel mx-auto max-w-md rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40">
        {!ready || isLoading ? (
          <Loading />
        ) : !session ? (
          <form onSubmit={login} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="username"
              required
              className={inputClass}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              autoComplete="current-password"
              required
              className={inputClass}
            />
            {error && <p className="text-sm text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 py-2 font-semibold text-zinc-950 transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {busy ? "Đang đăng nhập…" : "Đăng nhập"}
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-sm text-zinc-400">{session.user.email}</p>
            {isAdmin ? (
              <>
                <p className="font-semibold text-yellow-300">
                  Bạn đang có quyền admin
                </p>
                <Link
                  to="/admin/subjects"
                  className="block rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 py-2 font-semibold text-zinc-950 transition hover:-translate-y-0.5"
                >
                  Quản lý môn & câu hỏi
                </Link>
                <p className="text-sm text-zinc-400">
                  Hoặc vào{" "}
                  <Link to="/summary" className="text-yellow-200 underline">
                    Tóm tắt kiến thức
                  </Link>{" "}
                  để thêm, sửa, xoá chủ đề.
                </p>
              </>
            ) : (
              <p className="text-red-200">
                Tài khoản này không có quyền chỉnh sửa nội dung.
              </p>
            )}
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
