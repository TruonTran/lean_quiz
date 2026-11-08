import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import {
  fetchQuestionsByIds,
  fetchSubject,
  fetchSubjectList,
  fetchSummary,
} from "./api";
import { fetchEssayPrompts, fetchEssaySamples } from "./essayApi";
import { addDays, vnToday, type DayRow } from "./achievements";

const MIN = 60_000;

export const useSubjectList = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjectList,
    staleTime: 5 * MIN,
  });

/** Một môn kèm câu hỏi — chỉ tải khi vào làm bài / xem kết quả. */
export const useSubject = (id: string | undefined) =>
  useQuery({
    queryKey: ["subject", id],
    queryFn: () => fetchSubject(id as string),
    enabled: Boolean(id),
    staleTime: 10 * MIN,
  });

export const useSummary = (subjectId: string | undefined) =>
  useQuery({
    queryKey: ["summary", subjectId],
    queryFn: () => fetchSummary(subjectId as string),
    enabled: Boolean(subjectId),
  });

export const useEssayPrompts = (subjectId: string | undefined) =>
  useQuery({
    queryKey: ["essay-prompts", subjectId],
    queryFn: () => fetchEssayPrompts(subjectId as string),
    enabled: Boolean(subjectId),
    staleTime: 5 * MIN,
  });

export const useEssaySamples = (subjectId: string | undefined) =>
  useQuery({
    queryKey: ["essay-samples", subjectId],
    queryFn: () => fetchEssaySamples(subjectId as string),
    enabled: Boolean(subjectId),
    staleTime: 5 * MIN,
  });

export const useQuestionsByIds = (subjectId: string, ids: number[]) =>
  useQuery({
    queryKey: ["questions", subjectId, ids.join(",")],
    queryFn: () => fetchQuestionsByIds(subjectId, ids),
    placeholderData: keepPreviousData,
    staleTime: 10 * MIN,
  });

/** Quyền admin do DB quyết định (hàm is_admin()), UI chỉ dùng để ẩn/hiện nút. */
export function useIsAdmin() {
  const userId = useAuthStore((s) => s.session?.user.id);
  const q = useQuery({
    queryKey: ["is-admin", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase.rpc("is_admin");
      if (error) throw error;
      return data === true;
    },
    staleTime: 5 * MIN,
  });
  return { isAdmin: q.data === true, isLoading: Boolean(userId) && q.isPending };
}

/** Hoạt động học của chính người dùng (400 ngày gần nhất, đủ để tính chuỗi 365 ngày). */
export function useMyActivity() {
  const userId = useAuthStore((s) => s.session?.user.id);
  return useQuery({
    queryKey: ["my-activity", userId],
    enabled: Boolean(userId),
    staleTime: 30_000,
    queryFn: async (): Promise<DayRow[]> => {
      const since = addDays(vnToday(), -400);
      const { data, error } = await supabase
        .from("daily_activity")
        .select("day, answered, correct")
        .gte("day", since)
        .order("day");
      if (error) throw error;
      return (data ?? []) as DayRow[];
    },
  });
}

export type LeaderRow = {
  rnk: number;
  name: string;
  total_answered: number;
  total_correct: number;
  days_active: number;
  is_me: boolean;
};

export function useLeaderboard(period: "week" | "month" | "year") {
  const userId = useAuthStore((s) => s.session?.user.id);
  return useQuery({
    queryKey: ["leaderboard", period, userId],
    enabled: Boolean(userId),
    staleTime: 60_000,
    queryFn: async (): Promise<LeaderRow[]> => {
      const { data, error } = await supabase.rpc("leaderboard", { p_period: period });
      if (error) throw error;
      return (data ?? []) as LeaderRow[];
    },
  });
}

/** Tên hiển thị của chính người dùng (hiện trên bảng xếp hạng). */
export function useMyProfile() {
  const userId = useAuthStore((s) => s.session?.user.id);
  return useQuery({
    queryKey: ["my-profile", userId],
    enabled: Boolean(userId),
    staleTime: 5 * MIN,
    queryFn: async (): Promise<{ displayName: string } | null> => {
      const { data, error } = await supabase.from("profiles").select("display_name").maybeSingle();
      if (error) throw error;
      return data ? { displayName: (data as { display_name: string }).display_name } : null;
    },
  });
}
