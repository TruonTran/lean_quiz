import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import {
  fetchQuestionsByIds,
  fetchSubject,
  fetchSubjectList,
  fetchSummary,
} from "./api";

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
