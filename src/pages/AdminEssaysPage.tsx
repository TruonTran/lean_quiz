import { useState, type FormEvent } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEssayPrompt,
  createEssaySample,
  deleteEssayPrompt,
  deleteEssaySample,
  updateEssayPrompt,
  updateEssaySample,
} from "../data/essayApi";
import { errMsg } from "../data/api";
import { useEssayPrompts, useEssaySamples, useSubjectList } from "../data/hooks";
import type { EssayPrompt, EssayPromptInput, EssaySample, EssaySampleInput } from "../types/Essay";
import PageShell from "../components/PageShell";
import { plainPreview } from "../data/tableText";
import { handleContentPaste } from "../data/imageUpload";
import { ErrorBox, Loading } from "../components/LoadState";
import { dangerBtn, ghostBtn, inputClass, panel, primaryBtn } from "../components/adminStyles";

const orNull = (s: string) => (s.trim() ? s.trim() : null);

function PromptForm({
  initial,
  pending,
  serverError,
  onSubmit,
  onCancel,
}: {
  initial?: EssayPrompt;
  pending: boolean;
  serverError: string | null;
  onSubmit: (v: EssayPromptInput) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [prompt, setPrompt] = useState(initial?.prompt ?? "");
  const [requirement, setRequirement] = useState(initial?.requirement ?? "");
  const [hint, setHint] = useState(initial?.hint ?? "");
  const [minChars, setMinChars] = useState(initial?.minChars ? String(initial.minChars) : "");
  const [maxChars, setMaxChars] = useState(initial?.maxChars ? String(initial.maxChars) : "");
  const [localError, setLocalError] = useState<string | null>(null);
  const [imgMsg, setImgMsg] = useState<string | null>(null);

  // Ô số ký tự: để trống = không giới hạn; có thì phải là số nguyên dương
  const parseLimit = (v: string): number | null | "bad" => {
    if (!v.trim()) return null;
    const n = Number(v);
    return Number.isInteger(n) && n > 0 && n <= 30000 ? n : "bad";
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setLocalError("Hãy nhập tiêu đề đề thi.");
    if (!prompt.trim()) return setLocalError("Hãy nhập nội dung đề bài.");
    const min = parseLimit(minChars);
    const max = parseLimit(maxChars);
    if (min === "bad" || max === "bad") return setLocalError("Số ký tự phải là số nguyên từ 1 đến 30000 (hoặc để trống).");
    if (min !== null && max !== null && min > max) return setLocalError("Số ký tự tối thiểu không được lớn hơn tối đa.");
    setLocalError(null);
    onSubmit({
      title: title.trim(),
      prompt: prompt.trim(),
      requirement: orNull(requirement),
      hint: orNull(hint),
      minChars: min,
      maxChars: max,
    });
  };
  const error = localError ?? serverError;

  return (
    <form onSubmit={submit} className={`${panel} space-y-3`}>
      <h2 className="text-lg font-bold text-yellow-300">{initial ? "Sửa đề" : "Thêm đề"}</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề (vd: Đề 1 – Nghị luận xã hội)" className={inputClass} aria-label="Tiêu đề" />
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onPaste={(e) => handleContentPaste(e, setPrompt, setImgMsg)} placeholder="Nội dung đề bài (có thể chèn bảng, dán ảnh bằng Ctrl+V)" rows={6} className={inputClass} aria-label="Đề bài" />
      <input value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="Yêu cầu (vd: 300–400 từ, 45 phút) — không bắt buộc" className={inputClass} aria-label="Yêu cầu" />
      <textarea value={hint} onChange={(e) => setHint(e.target.value)} onPaste={(e) => handleContentPaste(e, setHint, setImgMsg)} placeholder="Gợi ý dàn ý (không bắt buộc)" rows={4} className={inputClass} aria-label="Gợi ý dàn ý" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs text-zinc-400">Số ký tự tối thiểu để được hoàn thành (không bắt buộc)</span>
          <input inputMode="numeric" value={minChars} onChange={(e) => setMinChars(e.target.value)} placeholder="vd: 1000" className={inputClass} aria-label="Số ký tự tối thiểu" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs text-zinc-400">Số ký tự tối đa của bài (không bắt buộc)</span>
          <input inputMode="numeric" value={maxChars} onChange={(e) => setMaxChars(e.target.value)} placeholder="vd: 3000" className={inputClass} aria-label="Số ký tự tối đa" />
        </label>
      </div>
      <p className="text-xs text-zinc-500">Tính cả dấu cách. Người học chỉ bấm được “Hoàn thành bài viết” khi số ký tự nằm trong khoảng này.</p>
      {imgMsg && <p role="status" className="text-sm text-yellow-200">{imgMsg}</p>}
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className={primaryBtn}>{pending ? "Đang lưu…" : "Lưu"}</button>
        <button type="button" onClick={onCancel} className={ghostBtn}>Huỷ</button>
      </div>
    </form>
  );
}

function SampleForm({
  initial,
  prompts,
  pending,
  serverError,
  onSubmit,
  onCancel,
}: {
  initial?: EssaySample;
  prompts: EssayPrompt[];
  pending: boolean;
  serverError: string | null;
  onSubmit: (v: EssaySampleInput) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [promptId, setPromptId] = useState<string>(initial?.promptId ? String(initial.promptId) : "");
  const [outline, setOutline] = useState(initial?.outline ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [localError, setLocalError] = useState<string | null>(null);
  const [imgMsg, setImgMsg] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setLocalError("Hãy nhập tiêu đề bài mẫu.");
    if (!content.trim()) return setLocalError("Hãy nhập nội dung bài mẫu.");
    setLocalError(null);
    onSubmit({
      promptId: promptId ? Number(promptId) : null,
      title: title.trim(),
      outline: orNull(outline),
      content: content.trim(),
    });
  };
  const error = localError ?? serverError;

  return (
    <form onSubmit={submit} className={`${panel} space-y-3`}>
      <h2 className="text-lg font-bold text-yellow-300">{initial ? "Sửa bài mẫu" : "Thêm bài mẫu"}</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề bài mẫu" className={inputClass} aria-label="Tiêu đề" />
      <select value={promptId} onChange={(e) => setPromptId(e.target.value)} className={inputClass} aria-label="Gắn với đề">
        <option value="">Không gắn với đề nào (hiện ở mục bài mẫu riêng)</option>
        {prompts.map((p) => (
          <option key={p.id} value={p.id}>Gắn với: {p.title}</option>
        ))}
      </select>
      <textarea value={outline} onChange={(e) => setOutline(e.target.value)} onPaste={(e) => handleContentPaste(e, setOutline, setImgMsg)} placeholder="Dàn ý (không bắt buộc)" rows={4} className={inputClass} aria-label="Dàn ý" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} onPaste={(e) => handleContentPaste(e, setContent, setImgMsg)} placeholder="Nội dung bài mẫu (có thể dán ảnh bằng Ctrl+V)" rows={12} className={inputClass} aria-label="Nội dung" />
      {imgMsg && <p role="status" className="text-sm text-yellow-200">{imgMsg}</p>}
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className={primaryBtn}>{pending ? "Đang lưu…" : "Lưu"}</button>
        <button type="button" onClick={onCancel} className={ghostBtn}>Huỷ</button>
      </div>
    </form>
  );
}

type Mode = { kind: "prompt" | "sample"; id: number | "new" } | null;

export default function AdminEssaysPage() {
  const { subjectId } = useParams();
  const qc = useQueryClient();
  const list = useSubjectList();
  const prompts = useEssayPrompts(subjectId);
  const samples = useEssaySamples(subjectId);
  const [mode, setMode] = useState<Mode>(null);

  const subject = list.data?.find((s) => s.id === subjectId);
  const refresh = async () => {
    await Promise.all([
      qc.invalidateQueries({ queryKey: ["essay-prompts", subjectId] }),
      qc.invalidateQueries({ queryKey: ["essay-samples", subjectId] }),
    ]);
    setMode(null);
  };

  const addPrompt = useMutation({
    mutationFn: (v: EssayPromptInput) =>
      createEssayPrompt(subjectId as string, v, (prompts.data?.length ?? 0) + 1),
    onSuccess: refresh,
  });
  const editPrompt = useMutation({
    mutationFn: (v: EssayPromptInput & { id: number }) => updateEssayPrompt(v.id, v),
    onSuccess: refresh,
  });
  const removePrompt = useMutation({ mutationFn: deleteEssayPrompt, onSuccess: refresh });

  const addSample = useMutation({
    mutationFn: (v: EssaySampleInput) =>
      createEssaySample(subjectId as string, v, (samples.data?.length ?? 0) + 1),
    onSuccess: refresh,
  });
  const editSample = useMutation({
    mutationFn: (v: EssaySampleInput & { id: number }) => updateEssaySample(v.id, v),
    onSuccess: refresh,
  });
  const removeSample = useMutation({ mutationFn: deleteEssaySample, onSuccess: refresh });

  const open = (m: Mode) => {
    for (const mu of [addPrompt, editPrompt, addSample, editSample]) mu.reset();
    setMode(m);
  };

  if (list.data && !subject) return <Navigate to="/admin/subjects" replace />;

  const promptList = prompts.data ?? [];
  const sampleList = samples.data ?? [];
  const failed = prompts.isError ? prompts : samples.isError ? samples : null;
  const loading = prompts.isPending || samples.isPending;
  const deleteError = removePrompt.error ?? removeSample.error;

  return (
    <PageShell
      eyebrow="Quản trị"
      title={`Thi viết – ${subject?.code ?? ""}`}
      backTo="/admin/subjects"
      backLabel="← Quản lý môn"
    >
      {failed ? (
        <ErrorBox error={failed.error} onRetry={() => failed.refetch()} />
      ) : loading ? (
        <Loading />
      ) : (
        <div className="space-y-10">
          {deleteError && <p role="alert" className="text-sm text-red-300">{errMsg(deleteError)}</p>}

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-yellow-300">Đề thi ({promptList.length})</h2>
              {mode?.kind !== "prompt" && (
                <button onClick={() => open({ kind: "prompt", id: "new" })} className={primaryBtn}>+ Thêm đề</button>
              )}
            </div>
            {mode?.kind === "prompt" && mode.id === "new" && (
              <PromptForm pending={addPrompt.isPending} serverError={addPrompt.error ? errMsg(addPrompt.error) : null} onSubmit={(v) => addPrompt.mutate(v)} onCancel={() => open(null)} />
            )}
            {promptList.map((p) =>
              mode?.kind === "prompt" && mode.id === p.id ? (
                <PromptForm key={p.id} initial={p} pending={editPrompt.isPending} serverError={editPrompt.error ? errMsg(editPrompt.error) : null} onSubmit={(v) => editPrompt.mutate({ ...v, id: p.id })} onCancel={() => open(null)} />
              ) : (
                <div key={p.id} className={`${panel} flex flex-wrap items-start justify-between gap-3`}>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-yellow-300">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{plainPreview(p.prompt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => open({ kind: "prompt", id: p.id })} className={ghostBtn}>Sửa</button>
                    <button
                      disabled={removePrompt.isPending}
                      onClick={() => window.confirm(`Xoá đề "${p.title}"? Bài mẫu gắn với đề sẽ thành bài mẫu riêng.`) && removePrompt.mutate(p.id)}
                      className={dangerBtn}
                    >Xoá</button>
                  </div>
                </div>
              ),
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-yellow-300">Bài mẫu ({sampleList.length})</h2>
              {mode?.kind !== "sample" && (
                <button onClick={() => open({ kind: "sample", id: "new" })} className={primaryBtn}>+ Thêm bài mẫu</button>
              )}
            </div>
            {mode?.kind === "sample" && mode.id === "new" && (
              <SampleForm prompts={promptList} pending={addSample.isPending} serverError={addSample.error ? errMsg(addSample.error) : null} onSubmit={(v) => addSample.mutate(v)} onCancel={() => open(null)} />
            )}
            {sampleList.map((s) =>
              mode?.kind === "sample" && mode.id === s.id ? (
                <SampleForm key={s.id} initial={s} prompts={promptList} pending={editSample.isPending} serverError={editSample.error ? errMsg(editSample.error) : null} onSubmit={(v) => editSample.mutate({ ...v, id: s.id })} onCancel={() => open(null)} />
              ) : (
                <div key={s.id} className={`${panel} flex flex-wrap items-start justify-between gap-3`}>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-yellow-300">{s.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {s.promptId ? `Gắn với: ${promptList.find((p) => p.id === s.promptId)?.title ?? "đề đã xoá"}` : "Bài mẫu riêng"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => open({ kind: "sample", id: s.id })} className={ghostBtn}>Sửa</button>
                    <button
                      disabled={removeSample.isPending}
                      onClick={() => window.confirm(`Xoá bài mẫu "${s.title}"?`) && removeSample.mutate(s.id)}
                      className={dangerBtn}
                    >Xoá</button>
                  </div>
                </div>
              ),
            )}
          </section>
        </div>
      )}
    </PageShell>
  );
}
