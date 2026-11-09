import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useIsAdmin } from "../data/hooks";
import { useAuthStore } from "../store/authStore";
import PageShell from "./PageShell";
import { Loading } from "./LoadState";
import { panel, primaryBtn } from "./adminStyles";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const session = useAuthStore((s) => s.session);
  const ready = useAuthStore((s) => s.ready);
  const { isAdmin, isLoading } = useIsAdmin();

  if (!ready || isLoading) {
    return (
      <PageShell eyebrow="Quản trị" title="Quản trị" backTo="/" backLabel="← Trang chủ">
        <Loading />
      </PageShell>
    );
  }

  if (!session || !isAdmin) {
    return (
      <PageShell eyebrow="Quản trị" title="Khu vực dành cho admin" backTo="/" backLabel="← Trang chủ">
        <div className={`${panel} mx-auto max-w-md space-y-4 text-center`}>
          <p className="text-zinc-300">
            {session
              ? "Tài khoản này không có quyền admin."
              : "Bạn cần đăng nhập bằng tài khoản admin."}
          </p>
          <Link to="/admin" className={`${primaryBtn} inline-block`}>
            Đến trang đăng nhập
          </Link>
        </div>
      </PageShell>
    );
  }

  return <>{children}</>;
}
