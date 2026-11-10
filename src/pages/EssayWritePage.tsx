import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEssayPrompts, useEssaySamples, useMySubmissionContent } from "../data/hooks";
import { submitEssay } from "../data/essayApi";
import { useAuthStore } from "../store/authStore";
import { countChars, countWords, useEssayStore } from "../store/essayStore";
import PageShell from "../components/PageShell";
import Markdown from "../components/Markdown";
import EssayDoneModal from "../components/EssayDoneModal";
import { ENCOURAGEMENTS } from "../data/encouragements";
import { ErrorBox, Loading } from "../components/LoadState";
import { dangerBtn, ghostBtn, panel, primaryBtn } from "../components/adminStyles";

const timeLabel = (ms: number) =>
  new Date(ms).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

export default function EssayWritePage() {
  const { subjectId, promptId } = useParams();
  const prompts = useEssayPrompts(subjectId);
  const samples = useEssaySamples(subjectId);
  const prompt = prompts.data?.find((p) => String(p.id) === promptId);

  const id = prompt?.id ?? 0;
  const draft = useEssayStore((s) => s.drafts[id]);
  const setDraft = useEssayStore((s) => s.setDraft);
  const clearDraft = useEssayStore((s) => s.clearDraft);
  const markDone = useEssayStore((s) => s.markDone);

  const [showHint, setShowHint] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cheer, setCheer] = useState<string | null>(null);
  const [savedState, setSavedState] = useState<"saved" | "guest">("guest");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const session = useAuthStore((s) => s.session);
  const qc = useQueryClient();
  const remote = useMySubmissionContent(prompt?.id);

  if (prompts.data && !prompt) return <Navigate to={`/essays/${subjectId}`} replace />;

  const failed = prompts.isError ? prompts : samples.isError ? samples : null;
  const text = draft?.text ?? "";
  const mine = (samples.data ?? []).filter((s) => s.promptId === id);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.alert("Không sao chép được — hãy bôi đen và copy thủ công.");
    }
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt?.title ?? "bai-viet"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const chars = countChars(text);
  const min = prompt?.minChars;
  const max = prompt?.maxChars;
  const tooShort = min !== undefined && chars < min;
  const tooLong = max !== undefined && chars > max;
  const canFinish = chars > 0 && !tooShort && !tooLong && !saving;

  const cheerUp = () => setCheer(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);

  const finish = async () => {
    setSaveError(null);

    // Chưa đăng nhập: vẫn hoàn thành được nhưng bài chỉ nằm trên trình duyệt này
    if (!session) {
      markDone(id);
      setSavedState("guest");
      cheerUp();
      return;
    }

    setSaving(true);
    try {
      await submitEssay(id, text); // DB kiểm tra lại số ký tự rồi mới lưu
      markDone(id);
      setSavedState("saved");
      cheerUp();
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["my-submissions"] }),
        qc.invalidateQueries({ queryKey: ["my-submission"] }),
      ]);
    } catch (e) {
      // Không chúc mừng khi chưa lưu được, bài vẫn còn nguyên trong khung viết
      setSaveError(e instanceof Error ? e.message : "Chưa lưu được bài, bạn thử lại nhé.");
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    if (window.confirm("Xoá toàn bộ bài viết của đề này? Không khôi phục được.")) {
      clearDraft(id);
    }
  };

  return (
    <PageShell
      eyebrow="Thi viết"
      title={prompt?.title ?? "Đề thi viết"}
      backTo={`/essays/${subjectId}`}
      backLabel="← Danh sách đề"
    >
      {failed ? (
        <ErrorBox error={failed.error} onRetry={() => failed.refetch()} />
      ) : !prompt ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className={panel}>
              <h2 className="mb-2 font-bold text-yellow-300">Đề bài</h2>
              <Markdown className="text-zinc-200">{prompt.prompt}</Markdown>
              {(min !== undefined || max !== undefined) && (
                <p className="mt-3 rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-3 text-sm text-yellow-100">
                  <span className="font-semibold">Số ký tự: </span>
                  {min !== undefined && max !== undefined
                    ? `từ ${min} đến ${max}`
                    : min !== undefined
                      ? `tối thiểu ${min}`
                      : `tối đa ${max}`}{" "}
                  (tính cả dấu cách)
                </p>
              )}
              {prompt.requirement && (
                <p className="mt-3 rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-3 text-sm text-yellow-100">
                  <span className="font-semibold">Yêu cầu: </span>
                  {prompt.requirement}
                </p>
              )}
            </div>

            {prompt.hint && (
              <div className={panel}>
                <button onClick={() => setShowHint((v) => !v)} className={ghostBtn}>
                  {showHint ? "Ẩn gợi ý dàn ý" : "Xem gợi ý dàn ý"}
                </button>
                {showHint && (
                  <div className="mt-3">
                    <Markdown>{prompt.hint}</Markdown>
                  </div>
                )}
              </div>
            )}

            {mine.length > 0 && (
              <div className={panel}>
                <button onClick={() => setShowSample((v) => !v)} className={ghostBtn}>
                  {showSample ? "Ẩn bài mẫu" : `📖 Xem bài mẫu (${mine.length})`}
                </button>
                {!showSample && (
                  <p className="mt-2 text-xs text-zinc-500">
                    Bạn có thể tham khảo bài mẫu trước khi viết
                  </p>
                )}
                {showSample && (
                  <div className="mt-4 space-y-6">
                    {mine.map((s) => (
                      <div key={s.id} className="space-y-3">
                        <h3 className="text-lg font-bold text-yellow-300">{s.title}</h3>
                        {s.outline && <Markdown>{s.outline}</Markdown>}
                        <Markdown>{s.content}</Markdown>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Phải: khung viết */}
          <div className={`${panel} flex flex-col`}>
            {remote.data && !text.trim() && (
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-3 text-sm text-yellow-100">
                <span>Bạn đã hoàn thành đề này và bài được lưu trên tài khoản.</span>
                <button
                  onClick={() => setDraft(prompt.id, prompt.subjectId, remote.data as string)}
                  className={ghostBtn}
                >
                  Tải bài đã lưu về khung viết
                </button>
              </div>
            )}
            <textarea
              value={text}
              onChange={(e) => setDraft(prompt.id, prompt.subjectId, e.target.value)}
              placeholder="Viết bài của bạn ở đây… (tự lưu trên trình duyệt)"
              aria-label="Bài viết của bạn"
              maxLength={30000}
              className="min-h-[24rem] w-full flex-1 resize-y rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono-brand text-xs text-zinc-400">
                {countWords(text)} từ ·{" "}
                <span className={tooLong ? "text-red-300" : ""}>
                  {chars}
                  {max !== undefined ? ` / ${max}` : ""} ký tự
                </span>
                {draft && ` · đã lưu ${timeLabel(draft.updatedAt)}`}
                {draft?.doneAt && <span className="text-yellow-300"> · ✓ Đã hoàn thành</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={copy} disabled={!text} className={ghostBtn}>
                  {copied ? "Đã chép" : "Sao chép"}
                </button>
                <button onClick={download} disabled={!text} className={ghostBtn}>
                  Tải .txt
                </button>
                <button onClick={reset} disabled={!text} className={dangerBtn}>
                  Xoá bài
                </button>
                <button onClick={finish} disabled={!canFinish} className={primaryBtn}>
                  {saving ? "Đang lưu…" : "Hoàn thành bài viết"}
                </button>
              </div>
            </div>
            {chars > 0 && tooShort && (
              <p role="status" className="mt-2 text-right text-xs text-zinc-400">
                Cần thêm {(min as number) - chars} ký tự nữa để hoàn thành (tối thiểu {min}).
              </p>
            )}
            {tooLong && (
              <p role="status" className="mt-2 text-right text-xs text-red-300">
                Bài đang vượt {chars - (max as number)} ký tự so với giới hạn {max}. Hãy rút gọn để hoàn thành.
              </p>
            )}
            {saveError && (
              <p role="alert" className="mt-2 text-right text-sm text-red-300">
                {saveError}
              </p>
            )}
          </div>
        </div>
      )}
      {cheer && <EssayDoneModal words={countWords(text)} message={cheer} saved={savedState} onClose={() => setCheer(null)} />}
    </PageShell>
  );
}
