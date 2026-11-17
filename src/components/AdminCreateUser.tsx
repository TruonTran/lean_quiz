import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { errMsg } from "../data/api";
import { createUser } from "../data/adminUsers";
import { ghostBtn, inputClass, panel, primaryBtn } from "./adminStyles";

const ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function genPassword(len = 12) {
  const buf = new Uint32Array(len);
  crypto.getRandomValues(buf);
  return Array.from(buf, (n) => ALPHABET[n % ALPHABET.length]).join("");
}

type Created = { email: string; password: string; name: string; warning?: string };

export default function AdminCreateUser({
  onCreated,
  onClose,
}: {
  onCreated: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(() => genPassword());
  const [showPw, setShowPw] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [created, setCreated] = useState<Created | null>(null);
  const [copied, setCopied] = useState(false);

  const create = useMutation({
    mutationFn: createUser,
    onSuccess: (res, vars) => {
      setCreated({ email: res.email, password: vars.password, name: vars.displayName, warning: res.warning });
      onCreated();
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const dn = name.trim();
    const em = email.trim();
    if (dn.length < 2 || dn.length > 30) return setFormError("Tên hiển thị cần từ 2 đến 30 ký tự.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return setFormError("Email không hợp lệ.");
    if (password.length < 8) return setFormError("Mật khẩu cần tối thiểu 8 ký tự.");
    if (isAdmin && !window.confirm(`Cấp quyền admin ngay khi tạo cho ${em}?`)) return;
    create.mutate({ displayName: dn, email: em, password, isAdmin });
  };

  const another = () => {
    setCreated(null);
    setName("");
    setEmail("");
    setPassword(genPassword());
    setIsAdmin(false);
    setCopied(false);
    create.reset();
  };

  const copy = async () => {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(`Email: ${created.email}\nMật khẩu: ${created.password}`);
      setCopied(true);
    } catch {
      window.alert("Trình duyệt không cho sao chép tự động — hãy bôi đen và copy thủ công.");
    }
  };

  if (created) {
    return (
      <div className={`${panel} space-y-3`}>
        <h2 className="text-lg font-bold text-yellow-300">Đã tạo tài khoản “{created.name}”</h2>
        {created.warning && (
          <p role="alert" className="text-sm text-red-300">
            {created.warning}
          </p>
        )}
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 font-mono-brand text-sm text-zinc-200">
          <p>Email: {created.email}</p>
          <p>Mật khẩu: {created.password}</p>
        </div>
        <p className="text-xs text-zinc-500">
          Mật khẩu chỉ hiện ở đây một lần — hãy gửi cho người dùng ngay. Họ nên đổi mật khẩu sau khi đăng nhập.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={copy} className={primaryBtn}>
            {copied ? "Đã sao chép ✓" : "Sao chép thông tin đăng nhập"}
          </button>
          <button type="button" onClick={another} className={ghostBtn}>
            Tạo tài khoản khác
          </button>
          <button type="button" onClick={onClose} className={ghostBtn}>
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`${panel} space-y-3`}>
      <h2 className="text-lg font-bold text-yellow-300">Tạo tài khoản mới</h2>
      <p className="text-xs text-zinc-500">
        Tài khoản được xác nhận email sẵn, người dùng đăng nhập ngay bằng email + mật khẩu bên dưới.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên hiển thị (2–30 ký tự)"
          maxLength={30}
          autoFocus
          required
          className={inputClass}
          aria-label="Tên hiển thị"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="off"
          required
          className={inputClass}
          aria-label="Email"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu (tối thiểu 8 ký tự)"
          autoComplete="new-password"
          required
          className={`${inputClass} min-w-0 flex-1 basis-56 font-mono-brand`}
          aria-label="Mật khẩu"
        />
        <button type="button" onClick={() => setShowPw((v) => !v)} className={ghostBtn}>
          {showPw ? "Ẩn" : "Hiện"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPassword(genPassword());
            setShowPw(true);
          }}
          className={ghostBtn}
        >
          Tạo ngẫu nhiên
        </button>
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        Cấp quyền admin cho tài khoản này
      </label>

      {(formError || create.error) && (
        <p role="alert" className="text-sm text-red-300">
          {formError ?? errMsg(create.error)}
        </p>
      )}

      <div className="flex gap-2">
        <button type="submit" disabled={create.isPending} className={primaryBtn}>
          {create.isPending ? "Đang tạo…" : "Tạo tài khoản"}
        </button>
        <button type="button" onClick={onClose} className={ghostBtn}>
          Huỷ
        </button>
      </div>
    </form>
  );
}
