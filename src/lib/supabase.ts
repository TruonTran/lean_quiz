import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** false khi chưa điền .env.local — App sẽ hiện hướng dẫn thay vì trang trắng. */
export const isSupabaseConfigured = Boolean(url && anonKey);

// Giá trị tạm để createClient không ném lỗi khi chưa cấu hình.
export const supabase = createClient(
  url ?? "http://localhost:54321",
  anonKey ?? "chua-cau-hinh",
);
