import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

interface AuthState {
  session: Session | null;
  /** đã biết chắc người dùng đang đăng nhập hay chưa */
  ready: boolean;
}

export const useAuthStore = create<AuthState>(() => ({
  session: null,
  ready: !isSupabaseConfigured,
}));

// Đăng ký một lần ở cấp module (ngoài React) để không dính quy tắc effect/setState.
if (isSupabaseConfigured) {
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({ session, ready: true });
  });
}
