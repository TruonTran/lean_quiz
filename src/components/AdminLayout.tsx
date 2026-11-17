import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { useIsAdmin } from "../data/hooks";
import PageShell from "./PageShell";
import AdminLogin from "./AdminLogin";
import { Loading } from "./LoadState";
import { AdminEmbedContext } from "./adminContext";
import { ghostBtn, panel } from "./adminStyles";

type NavItem = {
  to: string;
  label: string;
  match: (path: string) => boolean;
};

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Tổng quan",
    items: [
      {
        to: "/admin",
        label: "Tông Môn Chủ Điện",
        match: (p) => p === "/admin" || p === "/admin/",
      },
    ],
  },
  {
    group: "Nội dung",
    items: [
      {
        to: "/admin/subjects",
        label: "Công Pháp Các",
        match: (p) => p === "/admin/subjects",
      },
      {
        to: "/admin/questions",
        label: "Khảo Hạch Đề Các",
        match: (p) =>
          p.startsWith("/admin/questions") ||
          /^\/admin\/subjects\/[^/]+\/questions/.test(p),
      },
      {
        to: "/admin/essays",
        label: "Luận Đạo Điện",
        match: (p) =>
          p.startsWith("/admin/essays") ||
          /^\/admin\/subjects\/[^/]+\/essays/.test(p),
      },
      {
        to: "/admin/summaries",
        label: "Huyền Yếu Lục",
        match: (p) => p.startsWith("/admin/summaries"),
      },
    ],
  },
  {
    group: "Người dùng",
    items: [
      {
        to: "/admin/users",
        label: "Đệ Tử Danh Sách",
        match: (p) => p.startsWith("/admin/users"),
      },
    ],
  },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const email = useAuthStore((s) => s.session?.user.email);

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-4 pt-6">
        <p className="mt-1 text-lg font-extrabold text-white">Vấn Đạo Thiên</p>
      </div>

      <nav
        className="flex-1 space-y-5 overflow-y-auto px-3 pb-4"
        aria-label="Menu quản trị"
      >
        {NAV.map((g) => (
          <div key={g.group}>
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {g.group}
            </p>
            <ul className="space-y-1">
              {g.items.map((it) => {
                const active = it.match(pathname);
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        active
                          ? "border border-yellow-400/40 bg-yellow-400/10 text-yellow-200"
                          : "border border-transparent text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        {email && <p className="truncate text-xs text-zinc-500">{email}</p>}
        <div className="flex gap-2">
          <Link
            to="/"
            onClick={onNavigate}
            className={`${ghostBtn} flex-1 text-center`}
          >
            Về chu trảng
          </Link>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className={`${ghostBtn} flex-1`}
          >
            Cút ra ngoài
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminShell() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Trang mới thì cuộn lên đầu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AdminEmbedContext.Provider value={true}>
      <div className="min-h-screen bg-[#08090c]">
        {/* Sidebar cố định trên màn hình lớn */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-zinc-900/40 lg:block">
          <SidebarContent />
        </aside>

        {/* Thanh trên cùng + ngăn kéo trên điện thoại */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-[#08090c]/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Mở menu"
            aria-expanded={open}
            className={`${ghostBtn} !px-3 !py-2 !text-base`}
          >
            ☰
          </button>
          <span className="font-bold text-yellow-300">Quản trị</span>
        </header>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/50"
            />
            <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-white/10 bg-[#0d0e12] shadow-2xl">
              <SidebarContent onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className="px-4 py-6 sm:px-8 sm:py-8 lg:pl-72 lg:pr-8">
          <Outlet />
        </main>
      </div>
    </AdminEmbedContext.Provider>
  );
}

export default function AdminLayout() {
  const session = useAuthStore((s) => s.session);
  const ready = useAuthStore((s) => s.ready);
  const { isAdmin, isLoading } = useIsAdmin();

  if (!ready || isLoading) {
    return (
      <PageShell
        eyebrow="Quản trị"
        title="Quản trị"
        backTo="/"
        backLabel="Về tiền điện"
      >
        <Loading />
      </PageShell>
    );
  }

  if (!session) return <AdminLogin />;

  if (!isAdmin) {
    return (
      <PageShell
        eyebrow="Quản trị"
        title="Khu vực dành cho admin"
        backTo="/"
        backLabel="Lùi về tiền điện"
      >
        <div className={`${panel} mx-auto max-w-md space-y-4 text-center`}>
          <p className="text-sm text-zinc-400">{session.user.email}</p>
          <p className="text-red-200">Tài khoản này không có quyền admin.</p>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className={ghostBtn}
          >
            Đăng xuất
          </button>
        </div>
      </PageShell>
    );
  }

  return <AdminShell />;
}
