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
