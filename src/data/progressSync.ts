import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { useExamStore, type SubjectProgress } from "../store/examStore";

type Row = {
  subject_id: string;
  answers: SubjectProgress["answers"];
  current_index: number;
  notes: SubjectProgress["notes"];
  client_updated_at: number;
};

const PUSH_DELAY = 1500;
const synced: Record<string, number> = {}; // mốc đã đồng bộ của từng môn (trong phiên này)
const dirty = new Set<string>();
let timer: ReturnType<typeof setTimeout> | undefined;
let busy: Promise<void> = Promise.resolve();
let started = false;
let channel: RealtimeChannel | undefined;
let pullTimer: ReturnType<typeof setTimeout> | undefined;

const userId = () => useAuthStore.getState().session?.user.id;

function localProgress(subjectId: string): SubjectProgress {
  const s = useExamStore.getState();
  return {
    answers: s.answers[subjectId] ?? {},
    currentIndex: s.currentIndex[subjectId] ?? 0,
    notes: s.notes[subjectId] ?? {},
  };
}

async function push(subjectIds: string[]) {
  const uid = userId();
  if (!uid || subjectIds.length === 0) return;
  const st = useExamStore.getState();
  const rows = subjectIds.map((id) => {
    const p = localProgress(id);
    return {
      user_id: uid,
      subject_id: id,
      answers: p.answers,
      current_index: p.currentIndex,
      notes: p.notes,
      client_updated_at: st.updatedAt[id] ?? 0,
      updated_at: new Date().toISOString(),
    };
  });
  const { error } = await supabase
    .from("exam_progress")
    .upsert(rows, { onConflict: "user_id,subject_id" });
  if (error) throw error;
  rows.forEach((r) => {
    synced[r.subject_id] = r.client_updated_at;
    dirty.delete(r.subject_id);
  });
}

async function pull() {
  const uid = userId();
  if (!uid) return;
  const { data, error } = await supabase
    .from("exam_progress")
    .select("subject_id, answers, current_index, notes, client_updated_at")
    .eq("user_id", uid);
  if (error) throw error;

  const rows = (data ?? []) as Row[];
  const remote = new Map(rows.map((r) => [r.subject_id, r]));
  const st = useExamStore.getState();

  // 1) Server mới hơn → ghi đè máy này.
  for (const r of rows) {
    const localTs = st.updatedAt[r.subject_id] ?? 0;
    if (r.client_updated_at > localTs) {
      synced[r.subject_id] = r.client_updated_at;
      dirty.delete(r.subject_id);
      st.applyRemote(
        r.subject_id,
        { answers: r.answers ?? {}, currentIndex: r.current_index ?? 0, notes: r.notes ?? {} },
        r.client_updated_at,
      );
    } else {
      synced[r.subject_id] = r.client_updated_at;
    }
  }

  // 2) Máy này mới hơn (hoặc server chưa có) → đẩy lên.
  const toPush = Object.keys(useExamStore.getState().updatedAt).filter((id) => {
    const localTs = useExamStore.getState().updatedAt[id] ?? 0;
    const remoteTs = remote.get(id)?.client_updated_at ?? -1;
    return localTs > remoteTs;
  });
  await push(toPush);
}

const run = (fn: () => Promise<void>) => {
  busy = busy.then(fn).catch(() => {
    // Lỗi mạng: giữ nguyên, lần kéo/đẩy sau sẽ thử lại.
  });
  return busy;
};

function schedulePush() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    void run(() => push([...dirty]));
  }, PUSH_DELAY);
}

function subscribeRealtime(uid: string) {
  unsubscribeRealtime();
  channel = supabase
    .channel(`exam_progress:${uid}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "exam_progress", filter: `user_id=eq.${uid}` },
      () => {
        // Gộp nhiều sự kiện liên tiếp thành một lần kéo. Sự kiện do chính máy này đẩy lên
        // cũng về đây, nhưng pull() thấy mốc bằng nhau nên không làm gì.
        clearTimeout(pullTimer);
        pullTimer = setTimeout(() => void run(pull), 300);
      },
    )
    // Nối lại sau khi mất mạng/ngủ máy: bù những thay đổi đã lỡ.
    .subscribe((status) => {
      if (status === "SUBSCRIBED") void run(pull);
    });
}

function unsubscribeRealtime() {
  clearTimeout(pullTimer);
  if (channel) void supabase.removeChannel(channel);
  channel = undefined;
}

export function startProgressSync() {
  if (started) return;
  started = true;

  // Có thay đổi → đánh dấu môn đó cần đẩy.
  useExamStore.subscribe((state) => {
    if (!userId()) return;
    let changed = false;
    for (const [id, ts] of Object.entries(state.updatedAt)) {
      if (ts > (synced[id] ?? 0)) {
        dirty.add(id);
        changed = true;
      }
    }
    if (changed) schedulePush();
  });

  // Đăng nhập / đổi tài khoản → kéo về.
  let lastUid: string | undefined;
  useAuthStore.subscribe((s) => {
    const uid = s.session?.user.id;
    if (uid === lastUid) return;
    lastUid = uid;
    if (!uid) {
      Object.keys(synced).forEach((k) => delete synced[k]);
      dirty.clear();
      unsubscribeRealtime();
      return;
    }
    void run(pull);
    subscribeRealtime(uid);
  });

  const refresh = () => {
    if (!userId()) return;
    void run(async () => {
      await push([...dirty]); // đẩy phần đang chờ trước, tránh bị bản server cũ ghi đè
      await pull();
    });
  };
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") refresh();
    else void run(() => push([...dirty])); // rời tab → đẩy ngay
  });
  window.addEventListener("online", refresh);
  window.addEventListener("pagehide", () => void push([...dirty]).catch(() => {}));
}
