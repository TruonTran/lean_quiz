import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

interface AuthState {
  session: Session | null;
  ready: boolean;
}

export const useAuthStore = create<AuthState>(() => ({
  session: null,
  ready: !isSupabaseConfigured,
}));

if (isSupabaseConfigured) {
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({ session, ready: true });
  });
}
