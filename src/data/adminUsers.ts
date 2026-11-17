import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { DENIED } from "./api";

export type AdminUser = {
  id: string;
  email: string | null;
  displayName: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  confirmed: boolean;
  isAdmin: boolean;
};

type Row = {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed: boolean;
  is_admin: boolean;
};

export const SQL_MISSING =
  "Chưa cài phần quản lý tài khoản. Hãy chạy file supabase/admin-dashboard.sql trong Supabase (SQL Editor) rồi tải lại trang.";

function fail(error: { code?: string; message: string }): never {
  if (error.code === "PGRST202" || error.code === "42883") throw new Error(SQL_MISSING);
  if (error.code === "42501") throw new Error(DENIED);
  throw new Error(error.message);
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabase.rpc("admin_list_users");
  if (error) fail(error);
  return ((data ?? []) as Row[]).map((r) => ({
    id: r.id,
    email: r.email,
    displayName: r.display_name,
    createdAt: r.created_at,
    lastSignInAt: r.last_sign_in_at,
    confirmed: r.email_confirmed,
    isAdmin: r.is_admin,
  }));
}

export async function setUserAdmin(userId: string, makeAdmin: boolean): Promise<void> {
  const { error } = await supabase.rpc("admin_set_admin", { p_user: userId, p_admin: makeAdmin });
  if (error) fail(error);
}

export async function setUserDisplayName(userId: string, name: string): Promise<void> {
  const { error } = await supabase.rpc("admin_set_display_name", { p_user: userId, p_name: name });
  if (error) fail(error);
}

export type NewUser = {
  email: string;
  password: string;
  displayName: string;
  isAdmin: boolean;
};

export const FUNCTION_MISSING =
  "Không gọi được function tạo tài khoản. Hãy triển khai supabase/functions/admin-create-user (hướng dẫn ở đầu file) rồi thử lại.";

/** Tạo tài khoản qua Edge Function (cần service_role nên không thể làm trực tiếp từ trình duyệt). */
export async function createUser(input: NewUser): Promise<{ id: string; email: string; warning?: string }> {
  const { data, error } = await supabase.functions.invoke("admin-create-user", { body: input });
  if (error) {
    const ctx = (error as { context?: unknown }).context;
    if (ctx instanceof Response) {
      if (ctx.status === 404) throw new Error(FUNCTION_MISSING);
      const body = (await ctx.json().catch(() => null)) as { error?: string } | null;
      throw new Error(body?.error ?? `Lỗi ${ctx.status} khi tạo tài khoản.`);
    }
    throw new Error(FUNCTION_MISSING);
  }
  const res = data as { user?: { id: string; email: string }; warning?: string; error?: string } | null;
  if (!res?.user) throw new Error(res?.error ?? "Không tạo được tài khoản.");
  return { ...res.user, warning: res.warning };
}

export async function deleteUser(userId: string): Promise<void> {
  const { error } = await supabase.rpc("admin_delete_user", { p_user: userId });
  if (error) fail(error);
}

export function useAdminUsers() {
  const userId = useAuthStore((s) => s.session?.user.id);
  return useQuery({
    queryKey: ["admin-users", userId],
    enabled: Boolean(userId),
    staleTime: 30_000,
    retry: false,
    queryFn: fetchAdminUsers,
  });
}
