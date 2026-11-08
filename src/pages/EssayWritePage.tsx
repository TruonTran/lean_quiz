import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useEssayPrompts, useEssaySamples } from "../data/hooks";
import { countWords, useEssayStore } from "../store/essayStore";
import PageShell from "../components/PageShell";
import Markdown from "../components/Markdown";
import { ErrorBox, Loading } from "../components/LoadState";
import { dangerBtn, ghostBtn, panel } from "../components/adminStyles";

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

  const [showHint, setShowHint] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [copied, setCopied] = useState(false);

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
          {/* Trái: đề, gợi ý, bài mẫu */}
          <div className="space-y-4">
            <div className={panel}>
              <h2 className="mb-2 font-bold text-yellow-300">Đề bài</h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                {prompt.prompt}
              </p>
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
                  {showHint ? "Ẩn gợi ý dàn ý" : "💡 Xem gợi ý dàn ý"}
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
                    Hãy thử tự viết trước rồi mới đối chiếu với bài mẫu.
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
            <textarea
              value={text}
              onChange={(e) => setDraft(prompt.id, prompt.subjectId, e.target.value)}
              placeholder="Viết bài của bạn ở đây… (tự lưu trên trình duyệt)"
              aria-label="Bài viết của bạn"
              className="min-h-[24rem] w-full flex-1 resize-y rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono-brand text-xs text-zinc-400">
                {countWords(text)} từ · {text.length} ký tự
                {draft && ` · đã lưu ${timeLabel(draft.updatedAt)}`}
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={copy} disabled={!text} className={ghostBtn}>
                  {copied ? "Đã chép ✓" : "Sao chép"}
                </button>
                <button onClick={download} disabled={!text} className={ghostBtn}>
                  Tải .txt
                </button>
                <button onClick={reset} disabled={!text} className={dangerBtn}>
                  Xoá bài
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
