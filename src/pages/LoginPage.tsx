import { useState, type FormEvent } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import PageShell from "../components/PageShell";
import { inputClass, primaryBtn } from "../components/adminStyles";

/** Chỉ cho quay về đường dẫn nội bộ, tránh bị lợi dụng để chuyển sang trang lạ. */
const safeNext = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/");

function friendlyError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "Email hoặc mật khẩu không đúng.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Email này đã được đăng ký. Hãy chuyển sang Đăng nhập.";
  if (m.includes("signups not allowed") || m.includes("signup is disabled"))
    return "Hiện chưa mở đăng ký tài khoản mới.";
  if (m.includes("provider is not enabled") || m.includes("unsupported provider"))
    return "Đăng nhập Google chưa được bật trong Supabase.";
  if (m.includes("not authorized"))
    return "Chưa gửi được email: dự án cần cấu hình SMTP riêng trong Supabase để gửi cho người dùng bên ngoài.";
  if (m.includes("token") && (m.includes("expired") || m.includes("invalid")))
    return "Mã không đúng hoặc đã hết hạn. Hãy bấm “Gửi lại mã”.";
  if (m.includes("password")) return "Mật khẩu chưa hợp lệ (cần tối thiểu 8 ký tự).";
  if (m.includes("rate limit") || m.includes("seconds"))
    return "Thử quá nhiều lần, hãy đợi một lúc rồi thử lại.";
  return message;
}

export default function LoginPage() {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const session = useAuthStore((s) => s.session);

  const [mode, setMode] = useState<"login" | "register">(
    params.get("mode") === "register" ? "register" : "login",
  );
  const [step, setStep] = useState<"form" | "verify">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendWait, setResendWait] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (session) return <Navigate to={next} replace />;

  const resend = async () => {
    setError(null);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) return setError(friendlyError(error.message));
    setNotice("Đã gửi lại email xác nhận.");
    setResendWait(true);
    setTimeout(() => setResendWait(false), 60_000);
  };

  const google = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}${next}` },
    });
    if (error) setError(friendlyError(error.message));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (mode === "register") {
      const display = name.trim();
      if (display.length < 2 || display.length > 30) return setError("Tên hiển thị cần từ 2 đến 30 ký tự.");
      if (password.length < 8) return setError("Mật khẩu cần tối thiểu 8 ký tự.");
    }

    setBusy(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          // Đã đăng ký nhưng chưa xác nhận: chuyển sang bước nhập mã và gửi lại thư
          setStep("verify");
          await resend();
        } else setError(friendlyError(error.message));
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: name.trim() } },
      });
      if (error) setError(friendlyError(error.message));
      else if (!data.session) {
        // Dự án bật xác nhận email: chờ người dùng nhập mã hoặc bấm liên kết trong thư
        setStep("verify");
        setResendWait(true);
        setTimeout(() => setResendWait(false), 60_000);
      }
    }
    setBusy(false);
  };

  const verify = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: code.trim(), type: "signup" });
    if (error) setError(friendlyError(error.message));
    setBusy(false); // thành công thì session xuất hiện và trang tự chuyển hướng
  };

  const isRegister = mode === "register";
  const card =
    "glass-panel mx-auto max-w-md space-y-3 rounded-2xl bg-zinc-900/40 p-6 shadow-lg shadow-black/40";

  if (step === "verify") {
    return (
      <PageShell eyebrow="Tài khoản" title="Xác nhận email" backTo="/" backLabel="← Trang chủ">
        <form onSubmit={verify} className={card}>
          <p className="text-sm text-zinc-300">
            Mình đã gửi email tới <span className="font-semibold text-yellow-200">{email}</span>.
            Bạn có thể <b>bấm vào liên kết</b> trong thư, hoặc <b>nhập mã xác nhận</b> (dãy số) có trong thư:
          </p>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\s/g, ""))}
            placeholder="Mã xác nhận"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={10}
            required
            className={`${inputClass} text-center font-mono-brand text-lg tracking-[0.3em]`}
            aria-label="Mã xác nhận"
          />
          {notice && <p role="status" className="text-sm text-yellow-200">{notice}</p>}
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <button type="submit" disabled={busy || code.length < 6} className={`${primaryBtn} w-full`}>
            {busy ? "Đang kiểm tra…" : "Xác nhận"}
          </button>
          <div className="flex items-center justify-between pt-1 text-sm">
            <button type="button" onClick={resend} disabled={resendWait} className="text-yellow-300 underline disabled:opacity-40 disabled:no-underline">
              {resendWait ? "Gửi lại mã (đợi 60 giây)" : "Gửi lại mã"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setMode("login");
                setCode("");
                setError(null);
                setNotice(null);
              }}
              className="text-zinc-400 underline"
            >
              Quay lại
            </button>
          </div>
          <p className="text-xs text-zinc-600">
            Không thấy thư? Kiểm tra mục Spam, hoặc nếu bạn đã đăng ký trước đó thì hãy quay lại và Đăng nhập.
          </p>
        </form>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Tài khoản"
      title={isRegister ? "Tạo tài khoản" : "Đăng nhập"}
      subtitle="Đăng nhập để làm quiz và lưu thành tích học theo tuần, tháng, năm."
      backTo="/"
      backLabel="← Trang chủ"
    >
      <div className={card}>
        <button
          type="button"
          onClick={google}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
            <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.9 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
          </svg>
          Tiếp tục với Google
        </button>

        <div className="flex items-center gap-3 py-1 text-xs text-zinc-600">
          <span className="h-px flex-1 bg-white/10" />
          hoặc dùng email
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={submit} className="space-y-3">
          {isRegister && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên hiển thị (hiện trên bảng xếp hạng)"
              maxLength={30}
              autoComplete="nickname"
              required
              className={inputClass}
              aria-label="Tên hiển thị"
            />
          )}
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
            placeholder={isRegister ? "Mật khẩu (tối thiểu 8 ký tự)" : "Mật khẩu"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
            className={inputClass}
            aria-label="Mật khẩu"
          />

          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}

          <button type="submit" disabled={busy} className={`${primaryBtn} w-full`}>
            {busy ? "Đang xử lý…" : isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        <p className="pt-1 text-center text-sm text-zinc-400">
          {isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
          <button
            type="button"
            onClick={() => {
              setMode(isRegister ? "login" : "register");
              setError(null);
            }}
            className="font-semibold text-yellow-300 underline"
          >
            {isRegister ? "Đăng nhập" : "Đăng ký"}
          </button>
        </p>
        <p className="text-center text-xs text-zinc-500">
          Khi đăng nhập hoặc đăng ký, bạn đồng ý với{" "}
          <Link to="/privacy" className="underline">Chính sách quyền riêng tư</Link>.
        </p>
        <p className="text-center text-xs text-zinc-600">
          Tài khoản admin vẫn đăng nhập ở <Link to="/admin" className="underline">trang quản trị</Link>.
        </p>
      </div>
    </PageShell>
  );
}
