import { useMemo, useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errMsg } from "../data/api";
import {
  deleteUser,
  setUserAdmin,
  setUserDisplayName,
  useAdminUsers,
  type AdminUser,
} from "../data/adminUsers";
import { useAuthStore } from "../store/authStore";
import PageShell from "../components/PageShell";
import AdminCreateUser from "../components/AdminCreateUser";
import { ErrorBox, Loading } from "../components/LoadState";
import { dangerBtn, ghostBtn, inputClass, panel, primaryBtn } from "../components/adminStyles";

const PAGE_SIZE = 25;

const fmt = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })
    : "Chưa đăng nhập";

type Filter = "all" | "admin" | "user" | "unconfirmed";
const FILTER_LABEL: Record<Filter, string> = {
  all: "Tất cả",
  admin: "Admin",
  user: "Người dùng",
  unconfirmed: "Chưa xác nhận email",
};

export default function AdminUsersPage() {
  const qc = useQueryClient();
  const meId = useAuthStore((s) => s.session?.user.id);
  const users = useAdminUsers();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const refresh = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: ["admin-users"] }),
      qc.invalidateQueries({ queryKey: ["leaderboard"] }),
      qc.invalidateQueries({ queryKey: ["my-profile"] }),
    ]);

  const rename = useMutation({
    mutationFn: (v: { id: string; name: string }) => setUserDisplayName(v.id, v.name),
    onSuccess: async () => {
      await refresh();
      setEditing(null);
      setNotice("Đã đổi tên hiển thị.");
    },
  });
  const toggleAdmin = useMutation({
    mutationFn: (v: { id: string; make: boolean }) => setUserAdmin(v.id, v.make),
    onSuccess: async (_d, v) => {
      await Promise.all([refresh(), qc.invalidateQueries({ queryKey: ["is-admin"] })]);
      setNotice(v.make ? "Đã cấp quyền admin." : "Đã gỡ quyền admin.");
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await refresh();
      setNotice("Đã xoá tài khoản.");
    },
  });

  const error = rename.error ?? toggleAdmin.error ?? remove.error;
  const clearMessages = () => {
    rename.reset();
    toggleAdmin.reset();
    remove.reset();
    setNotice(null);
  };

  const all = useMemo(() => users.data ?? [], [users.data]);
  const filtered = useMemo(() => {
    const t = search.trim().toLowerCase();
    return all.filter((u) => {
      if (filter === "admin" && !u.isAdmin) return false;
      if (filter === "user" && u.isAdmin) return false;
      if (filter === "unconfirmed" && u.confirmed) return false;
      if (!t) return true;
      return (u.email ?? "").toLowerCase().includes(t) || (u.displayName ?? "").toLowerCase().includes(t);
    });
  }, [all, search, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const startRename = (u: AdminUser) => {
    clearMessages();
    setEditing(u.id);
    setNameDraft(u.displayName ?? "");
  };
  const submitRename = (e: FormEvent, u: AdminUser) => {
    e.preventDefault();
    const name = nameDraft.trim();
    if (name.length < 2 || name.length > 30) {
      return window.alert("Tên hiển thị cần từ 2 đến 30 ký tự.");
    }
    rename.mutate({ id: u.id, name });
  };

  const confirmToggle = (u: AdminUser) => {
    clearMessages();
    const label = u.email ?? u.displayName ?? u.id;
    const msg = u.isAdmin
      ? `Gỡ quyền admin của ${label}?`
      : `Cấp quyền admin cho ${label}? Người này sẽ sửa / xoá được toàn bộ nội dung và quản lý tài khoản.`;
    if (window.confirm(msg)) toggleAdmin.mutate({ id: u.id, make: !u.isAdmin });
  };

  const confirmDelete = (u: AdminUser) => {
    clearMessages();
    const key = (u.email ?? u.id).toLowerCase();
    const typed = window.prompt(
      `Xoá tài khoản này sẽ xoá VĨNH VIỄN hồ sơ và dữ liệu học của họ. Không hoàn tác được.\n\nGõ "${u.email ?? u.id}" để xác nhận:`,
    );
    if (typed === null) return;
    if (typed.trim().toLowerCase() !== key) {
      return window.alert("Nội dung không khớp — đã huỷ, không xoá gì cả.");
    }
    remove.mutate(u.id);
  };

  const busy = rename.isPending || toggleAdmin.isPending || remove.isPending;

  return (
    <PageShell
      eyebrow="Người dùng"
      title="Quản lý tài khoản"
      subtitle={
        users.data
          ? `${all.length} tài khoản · ${all.filter((u) => u.isAdmin).length} admin`
          : "Xem, đổi tên, cấp / gỡ quyền admin và xoá tài khoản."
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Tìm theo email hoặc tên hiển thị…"
            className={`${inputClass} min-w-0 flex-1 basis-64`}
            aria-label="Tìm tài khoản"
          />
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as Filter);
              setPage(0);
            }}
            className={`${inputClass} !w-auto`}
            aria-label="Lọc tài khoản"
          >
            {(Object.keys(FILTER_LABEL) as Filter[]).map((f) => (
              <option key={f} value={f}>
                {FILTER_LABEL[f]}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => users.refetch()} disabled={users.isFetching} className={primaryBtn}>
            {users.isFetching ? "Đang tải…" : "Làm mới"}
          </button>
          <button
            type="button"
            onClick={() => {
              clearMessages();
              setCreating((v) => !v);
            }}
            className={primaryBtn}
          >
            {creating ? "Đóng form" : "+ Tạo tài khoản"}
          </button>
        </div>

        {creating && (
          <AdminCreateUser
            onCreated={() => {
              void refresh();
            }}
            onClose={() => setCreating(false)}
          />
        )}

        {notice && (
          <p role="status" className="text-sm text-emerald-300">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="text-sm text-red-300">
            {errMsg(error)}
          </p>
        )}

        {users.isPending ? (
          <Loading />
        ) : users.isError ? (
          <ErrorBox error={users.error} onRetry={() => users.refetch()} />
        ) : filtered.length === 0 ? (
          <p className={`${panel} text-center text-zinc-400`}>Không có tài khoản nào khớp.</p>
        ) : (
          <>
            <div className={`${panel} overflow-x-auto p-0`}>
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">Tên hiển thị</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Tham gia</th>
                    <th className="px-4 py-3">Đăng nhập gần nhất</th>
                    <th className="px-4 py-3">Vai trò</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((u) => {
                    const isMe = u.id === meId;
                    return (
                      <tr
                        key={u.id}
                        className={`border-t border-white/5 ${isMe ? "bg-yellow-400/5" : ""} text-zinc-300`}
                      >
                        <td className="px-4 py-2.5">
                          {editing === u.id ? (
                            <form onSubmit={(e) => submitRename(e, u)} className="flex gap-2">
                              <input
                                value={nameDraft}
                                onChange={(e) => setNameDraft(e.target.value)}
                                maxLength={30}
                                autoFocus
                                className={`${inputClass} !p-2`}
                                aria-label="Tên hiển thị mới"
                              />
                              <button type="submit" disabled={rename.isPending} className={ghostBtn}>
                                Lưu
                              </button>
                              <button type="button" onClick={() => setEditing(null)} className={ghostBtn}>
                                Huỷ
                              </button>
                            </form>
                          ) : (
                            <span className="font-semibold text-zinc-100">
                              {u.displayName ?? <em className="font-normal text-zinc-500">(chưa đặt)</em>}
                              {isMe && <span className="ml-2 text-xs font-normal text-yellow-200">(bạn)</span>}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="break-all">{u.email ?? "—"}</span>
                          {!u.confirmed && (
                            <span className="ml-2 rounded-full border border-red-400/30 px-2 py-0.5 text-xs text-red-200">
                              chưa xác nhận
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap">{fmt(u.createdAt)}</td>
                        <td className="px-4 py-2.5 whitespace-nowrap">{fmt(u.lastSignInAt)}</td>
                        <td className="px-4 py-2.5">
                          {u.isAdmin ? (
                            <span className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-2 py-0.5 text-xs font-semibold text-yellow-200">
                              Admin
                            </span>
                          ) : (
                            <span className="text-zinc-500">Người dùng</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex flex-wrap justify-end gap-2">
                            <button onClick={() => startRename(u)} disabled={busy} className={ghostBtn}>
                              Đổi tên
                            </button>
                            <button
                              onClick={() => confirmToggle(u)}
                              disabled={busy || (isMe && u.isAdmin)}
                              title={isMe && u.isAdmin ? "Bạn không thể tự gỡ quyền của mình" : undefined}
                              className={ghostBtn}
                            >
                              {u.isAdmin ? "Gỡ admin" : "Cấp admin"}
                            </button>
                            <button
                              onClick={() => confirmDelete(u)}
                              disabled={busy || isMe || u.isAdmin}
                              title={
                                isMe
                                  ? "Bạn không thể tự xoá tài khoản của mình"
                                  : u.isAdmin
                                    ? "Gỡ quyền admin trước khi xoá"
                                    : undefined
                              }
                              className={dangerBtn}
                            >
                              Xoá
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {pageCount > 1 && (
              <div className="flex items-center justify-center gap-3 text-sm text-zinc-400">
                <button disabled={safePage === 0} onClick={() => setPage(safePage - 1)} className={ghostBtn}>
                  ← Trước
                </button>
                <span>
                  Trang {safePage + 1}/{pageCount} · {filtered.length} tài khoản
                </span>
                <button disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)} className={ghostBtn}>
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}
