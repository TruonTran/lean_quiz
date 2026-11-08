import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubject, deleteSubject, errMsg, updateSubject } from "../data/api";
import { slugify, validateSubjectDraft, type SubjectDraft, type SubjectValue } from "../data/drafts";
import { useSubjectList } from "../data/hooks";
import { EXAM_TYPE_LABEL, hasEssay, hasQuiz, type ExamType, type SubjectInfo } from "../types/Subject";
import PageShell from "../components/PageShell";
import { ErrorBox, Loading } from "../components/LoadState";
import {
  dangerBtn,
  ghostBtn,
  inputClass,
  panel,
  primaryBtn,
} from "../components/adminStyles";

function SubjectForm({
  title,
  initial,
  lockCode,
  submitLabel,
  pending,
  serverError,
  onSubmit,
  onCancel,
}: {
  title: string;
  initial: SubjectDraft;
  lockCode?: boolean;
  submitLabel: string;
  pending: boolean;
  serverError: string | null;
  onSubmit: (v: SubjectValue) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(initial);
  const [localError, setLocalError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = validateSubjectDraft(draft);
    if (!r.ok) return setLocalError(r.error);
    setLocalError(null);
    onSubmit(r.value);
  };
  const error = localError ?? serverError;
  const id = slugify(draft.code);

  return (
    <form onSubmit={submit} className={`${panel} space-y-3`}>
      <h2 className="text-lg font-bold text-yellow-300">{title}</h2>
      <input
        value={draft.code}
        onChange={(e) => setDraft({ ...draft, code: e.target.value })}
        placeholder="Mã môn (vd: ENG101)"
        disabled={lockCode}
        className={`${inputClass} disabled:opacity-50`}
        aria-label="Mã môn"
      />
      {!lockCode && id && (
        <p className="text-xs text-zinc-500">
          Đường dẫn của môn: <code className="text-yellow-200">/exam/{id}</code> (không đổi được
          sau khi tạo)
        </p>
      )}
      <input
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        placeholder="Tên môn (vd: Tiếng Anh cơ bản)"
        className={inputClass}
        aria-label="Tên môn"
      />
      <label className="block space-y-1">
        <span className="text-xs text-zinc-400">Kiểu thi của môn</span>
        <select
          value={draft.examType}
          onChange={(e) => setDraft({ ...draft, examType: e.target.value as ExamType })}
          className={inputClass}
          aria-label="Kiểu thi"
        >
          {(Object.keys(EXAM_TYPE_LABEL) as ExamType[]).map((t) => (
            <option key={t} value={t}>
              {EXAM_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1">
        <span className="text-xs text-zinc-400">Học kì</span>
        <select
          value={draft.semester}
          onChange={(e) => setDraft({ ...draft, semester: e.target.value })}
          className={inputClass}
          aria-label="Học kì"
        >
          <option value="">Chưa phân loại</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <option key={n} value={n}>
              Kì {n}
            </option>
          ))}
        </select>
      </label>
      <input
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        placeholder="Mô tả (không bắt buộc)"
        className={inputClass}
        aria-label="Mô tả"
      />
      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className={primaryBtn}>
          {pending ? "Đang lưu…" : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className={ghostBtn}>
          Huỷ
        </button>
      </div>
    </form>
  );
}

export default function AdminSubjectsPage() {
  const qc = useQueryClient();
  const { data, isPending, isError, error, refetch } = useSubjectList();
  const [mode, setMode] = useState<"new" | string | null>(null); // "new" | id đang sửa | null

  const refresh = () => qc.invalidateQueries({ queryKey: ["subjects"] });

  const add = useMutation({
    mutationFn: (v: SubjectValue) =>
      createSubject({ ...v, sortOrder: (data?.length ?? 0) + 1 }),
    onSuccess: async () => {
      await refresh();
      setMode(null);
    },
  });
  const edit = useMutation({
    mutationFn: (v: SubjectValue) =>
      updateSubject(v.id, {
        code: v.code,
        name: v.name,
        description: v.description,
        examType: v.examType,
        semester: v.semester,
      }),
    onSuccess: async () => {
      await refresh();
      setMode(null);
    },
  });
  const remove = useMutation({
    mutationFn: deleteSubject,
    onSuccess: async (_d, id) => {
      qc.removeQueries({ queryKey: ["subject", id] });
      qc.removeQueries({ queryKey: ["summary", id] });
      await refresh();
    },
  });

  const open = (m: "new" | string | null) => {
    add.reset();
    edit.reset();
    setMode(m);
  };

  const confirmDelete = (s: SubjectInfo) => {
    const typed = window.prompt(
      `Xoá môn ${s.code} sẽ xoá VĨNH VIỄN ${s.questionCount} câu hỏi và ${s.summaryCount} chủ đề tóm tắt.\\n\\nGõ mã môn "${s.code}" để xác nhận:`,
    );
    if (typed !== null && typed.trim().toUpperCase() === s.code.toUpperCase()) {
      remove.mutate(s.id);
    } else if (typed !== null) {
      window.alert("Mã môn không khớp — đã huỷ, không xoá gì cả.");
    }
  };

  return (
    <PageShell
      eyebrow="Quản trị"
      title="Quản lý môn & câu hỏi"
      subtitle="Thêm môn mới, hoặc vào từng môn để thêm / sửa / xoá câu hỏi."
      backTo="/admin"
      backLabel="← Quản trị"
    >
      <div className="space-y-5">
        {mode !== "new" && (
          <button onClick={() => open("new")} className={primaryBtn}>
            + Thêm môn
          </button>
        )}

        {mode === "new" && (
          <SubjectForm
            title="Thêm môn mới"
            initial={{ code: "", name: "", description: "", examType: "quiz", semester: "" }}
            submitLabel="Tạo môn"
            pending={add.isPending}
            serverError={add.error ? errMsg(add.error) : null}
            onSubmit={(v) => add.mutate(v)}
            onCancel={() => open(null)}
          />
        )}

        {remove.error && (
          <p role="alert" className="text-sm text-red-300">
            {errMsg(remove.error)}
          </p>
        )}

        {isPending ? (
          <Loading />
        ) : isError ? (
          <ErrorBox error={error} onRetry={() => refetch()} />
        ) : data.length === 0 ? (
          <p className={`${panel} text-center text-zinc-400`}>Chưa có môn nào.</p>
        ) : (
          data.map((s) =>
            mode === s.id ? (
              <SubjectForm
                key={s.id}
                title={`Sửa môn ${s.code}`}
                initial={{
                  code: s.code,
                  name: s.name,
                  description: s.description ?? "",
                  examType: s.examType,
                  semester: s.semester ? String(s.semester) : "",
                }}
                lockCode
                submitLabel="Lưu"
                pending={edit.isPending}
                serverError={edit.error ? errMsg(edit.error) : null}
                onSubmit={(v) => edit.mutate({ ...v, id: s.id, code: s.code })}
                onCancel={() => open(null)}
              />
            ) : (
              <div key={s.id} className={`${panel} flex flex-wrap items-center justify-between gap-4`}>
                <div>
                  <h2 className="text-xl font-bold text-yellow-300">{s.code}</h2>
                  <p className="text-sm text-zinc-400">{s.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {s.semester ? `Kì ${s.semester} · ` : ""}
                    {EXAM_TYPE_LABEL[s.examType]}
                    {hasQuiz(s.examType) && ` · ${s.questionCount} câu hỏi · ${s.summaryCount} chủ đề tóm tắt`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hasQuiz(s.examType) && (
                    <Link to={`/admin/subjects/${s.id}/questions`} className={primaryBtn}>
                      Quản lý câu hỏi
                    </Link>
                  )}
                  {hasEssay(s.examType) && (
                    <Link
                      to={`/admin/subjects/${s.id}/essays`}
                      className={(hasQuiz(s.examType) ? ghostBtn : primaryBtn) + " inline-flex items-center"}
                    >
                      Đề thi viết
                    </Link>
                  )}
                  {hasQuiz(s.examType) && (
                    <Link to={`/summary/${s.id}`} className={ghostBtn + " inline-flex items-center"}>
                      Tóm tắt
                    </Link>
                  )}
                  <button onClick={() => open(s.id)} className={ghostBtn}>
                    Sửa
                  </button>
                  <button
                    onClick={() => confirmDelete(s)}
                    disabled={remove.isPending}
                    className={dangerBtn}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ),
          )
        )}
      </div>
    </PageShell>
  );
}
