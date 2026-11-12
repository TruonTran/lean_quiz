import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import {
  fetchQuestionsByIds,
  fetchSubject,
  fetchSubjectList,
  fetchSummary,
} from "./api";
import {
  fetchEssayPrompts,
  fetchEssaySamples,
  fetchMySubmissionContent,
  fetchMySubmissions,
} from "./essayApi";
import { addDays, vnToday, type DayRow } from "./achievements";

const MIN = 60_000;

export const useSubjectList = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjectList,
    staleTime: 5 * MIN,
  });

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

export function useMyActivity() {
  const userId = useAuthStore((s) => s.session?.user.id);
  return useQuery({
    queryKey: ["my-activity", userId],
    enabled: Boolean(userId),
    staleTime: 30_000,
    queryFn: async (): Promise<DayRow[]> => {
      const since = addDays(vnToday(), -400);
      const load = (cols: string) =>
        supabase.from("daily_activity").select(cols).gte("day", since).order("day");
      let res = await load("day, answered, correct, pop_answered, pop_correct");
      if (res.error?.code === "42703") res = await load("day, answered, correct");
      if (res.error) throw res.error;
      type Row = { day: string; answered: number; correct: number; pop_answered?: number; pop_correct?: number };
      return ((res.data ?? []) as unknown as Row[]).map((r) => ({
        day: r.day,
        answered: r.answered,
        correct: r.correct,
        popAnswered: r.pop_answered ?? 0,
        popCorrect: r.pop_correct ?? 0,
      }));
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

export function useMySubmissions() {
  const userId = useAuthStore((s) => s.session?.user.id);
  return useQuery({
    queryKey: ["my-submissions", userId],
    enabled: Boolean(userId),
    staleTime: 30_000,
    queryFn: fetchMySubmissions,
  });
}

/** Bài đã nộp cho một đề (để khôi phục khi đổi máy hoặc lỡ xoá dữ liệu trình duyệt). */
export function useMySubmissionContent(promptId: number | undefined) {
  const userId = useAuthStore((s) => s.session?.user.id);
  return useQuery({
    queryKey: ["my-submission", userId, promptId],
    enabled: Boolean(userId) && Boolean(promptId),
    staleTime: 30_000,
    queryFn: () => fetchMySubmissionContent(promptId as number),
  });
}
