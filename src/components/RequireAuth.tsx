import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import PageShell from "./PageShell";
import { Loading } from "./LoadState";
import { panel, primaryBtn, ghostBtn } from "./adminStyles";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const session = useAuthStore((s) => s.session);
  const ready = useAuthStore((s) => s.ready);
  const location = useLocation();

  if (!ready) {
    return (
      <PageShell eyebrow="Tài khoản" title="Đang kiểm tra đăng nhập…" backTo="/" backLabel="← Trang chủ">
        <Loading />
      </PageShell>
    );
  }

  if (!session) {
    const next = encodeURIComponent(location.pathname + location.search);
    return (
      <PageShell eyebrow="Tài khoản" title="Đăng nhập để làm quiz" backTo="/subjects" backLabel="← Chọn môn">
        <div className={`${panel} mx-auto max-w-md space-y-4 text-center`}>
          <p className="text-zinc-300">
            Bạn cần có tài khoản để làm quiz, để mình lưu lại thành tích học của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to={`/login?next=${next}`} className={`${primaryBtn} inline-block`}>
              Đăng nhập
            </Link>
            <Link to={`/login?mode=register&next=${next}`} className={`${ghostBtn} inline-block py-2.5`}>
              Tạo tài khoản
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return <>{children}</>;
}
