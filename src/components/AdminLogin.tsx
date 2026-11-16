import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";
import PageShell from "./PageShell";
import { inputClass, primaryBtn } from "./adminStyles";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
    <PageShell eyebrow="Quản trị" title="Đăng nhập admin" backTo="/" backLabel="Cút vìa trang chủ">
      <form
        onSubmit={login}
        className="glass-panel mx-auto max-w-md space-y-3 rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="username"
          required
          className={inputClass}
          aria-label="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          autoComplete="current-password"
          required
          className={inputClass}
          aria-label="Mật khẩu"
        />
        {error && (
          <p role="alert" className="text-sm text-red-300">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className={`${primaryBtn} w-full`}>
          {busy ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>
      </form>
    </PageShell>
  );
}
