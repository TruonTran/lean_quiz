import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, deleteQuestion, errMsg, updateQuestion } from "../data/api";
import {
  draftFromQuestion,
  emptyDraft,
  optionLabel,
  type QuestionPayload,
} from "../data/drafts";
import { useSubject } from "../data/hooks";
import PageShell from "../components/PageShell";
import QuestionForm from "../components/QuestionForm";
import { ErrorBox, Loading } from "../components/LoadState";
import {
  dangerBtn,
  ghostBtn,
  inputClass,
  panel,
  primaryBtn,
} from "../components/adminStyles";

const PAGE_SIZE = 20;

export default function AdminQuestionsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const qc = useQueryClient();
  const subjectQuery = useSubject(subjectId);
  const subject = subjectQuery.data;

  const [adding, setAdding] = useState(false);
  const [formKey, setFormKey] = useState(0); // đổi key để xoá trắng form sau khi thêm
  const [editing, setEditing] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const id = subjectId ?? "";
  const refresh = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: ["subject", id] }),
      qc.invalidateQueries({ queryKey: ["subjects"] }),
      qc.invalidateQueries({ queryKey: ["questions", id] }),
    ]);

  const add = useMutation({
    mutationFn: (p: QuestionPayload) => createQuestion(id, p),
    onSuccess: async (newId) => {
      await refresh();
      setNotice(`Đã thêm câu #${newId}. Bạn có thể nhập tiếp câu mới.`);
      setFormKey((k) => k + 1);
    },
  });
  const update = useMutation({
    mutationFn: (v: { qid: number; p: QuestionPayload }) => updateQuestion(id, v.qid, v.p),
    onSuccess: async () => {
      await refresh();
      setEditing(null);
      setNotice("Đã lưu thay đổi.");
    },
  });
  const remove = useMutation({
    mutationFn: (qid: number) => deleteQuestion(id, qid),
    onSuccess: async () => {
      await refresh();
      setNotice("Đã xoá câu hỏi.");
    },
  });

  const questions = useMemo(() => subject?.questions ?? [], [subject]);
  const filtered = useMemo(() => {
    const t = search.trim().toLowerCase();
    if (!t) return questions;
    return questions.filter(
      (q) => String(q.id) === t || q.question.toLowerCase().includes(t),
    );
  }, [questions, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const startAdd = () => {
    add.reset();
    setNotice(null);
    setEditing(null);
    setAdding(true);
  };
  const startEdit = (qid: number) => {
    update.reset();
    setNotice(null);
    setAdding(false);
    setEditing(qid);
  };

  if (subjectQuery.isPending || subjectQuery.isError || !subject) {
    return (
      <PageShell eyebrow="Quản trị" title="Câu hỏi" backTo="/admin/subjects" backLabel="← Quản lý môn">
        {subjectQuery.isError ? (
          <ErrorBox error={subjectQuery.error} onRetry={() => subjectQuery.refetch()} />
        ) : subjectQuery.isPending ? (
          <Loading />
        ) : (
          <p className={`${panel} mx-auto max-w-md text-center text-zinc-400`}>
            Không tìm thấy môn này.{" "}
            <Link to="/admin/subjects" className="text-yellow-200 underline">
              Quay lại
            </Link>
          </p>
        )}
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow={subject.code}
      title={`Câu hỏi — ${subject.name}`}
      subtitle={`${questions.length} câu hỏi`}
      backTo="/admin/subjects"
      backLabel="← Quản lý môn"
    >
      <div className="space-y-5">
        {!adding && (
          <button onClick={startAdd} className={primaryBtn}>
            + Thêm câu hỏi
          </button>
        )}

        {adding && (
          <QuestionForm
            key={formKey}
            title="Thêm câu hỏi mới"
            initial={emptyDraft()}
            submitLabel="Lưu câu hỏi"
            pending={add.isPending}
            serverError={add.error ? errMsg(add.error) : null}
            onSubmit={(p) => add.mutate(p)}
            onCancel={() => setAdding(false)}
          />
        )}

        {notice && (
          <p role="status" className="text-sm text-emerald-300">
            {notice}
          </p>
        )}
        {remove.error && (
          <p role="alert" className="text-sm text-red-300">
            {errMsg(remove.error)}
          </p>
        )}

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          placeholder="Tìm theo nội dung hoặc số câu…"
          className={inputClass}
          aria-label="Tìm câu hỏi"
        />

        {questions.length === 0 ? (
          <p className={`${panel} text-center text-zinc-400`}>
            Môn này chưa có câu hỏi nào. Bấm "+ Thêm câu hỏi" để bắt đầu.
          </p>
        ) : filtered.length === 0 ? (
          <p className={`${panel} text-center text-zinc-400`}>Không có câu nào khớp.</p>
        ) : (
          <>
            {visible.map((q) =>
              editing === q.id ? (
                <QuestionForm
                  key={q.id}
                  title={`Sửa câu #${q.id}`}
                  initial={draftFromQuestion(q)}
                  submitLabel="Lưu thay đổi"
                  pending={update.isPending}
                  serverError={update.error ? errMsg(update.error) : null}
                  onSubmit={(p) => update.mutate({ qid: q.id, p })}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <div key={q.id} className={`${panel} flex items-start justify-between gap-4`}>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-yellow-300">
                      #{q.id}
                      {Array.isArray(q.answer) && (
                        <span className="ml-2 rounded-full border border-yellow-400/25 px-2 py-0.5 text-xs font-normal text-yellow-200">
                          chọn nhiều
                        </span>
                      )}
                    </p>
                    <p className="mt-1 line-clamp-3 text-zinc-200">{q.question}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {q.options.length} đáp án · Đúng:{" "}
                      {(Array.isArray(q.answer) ? q.answer : [q.answer])
                        .map(optionLabel)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => startEdit(q.id)} className={ghostBtn}>
                      Sửa
                    </button>
                    <button
                      disabled={remove.isPending}
                      onClick={() => {
                        if (window.confirm(`Xoá câu #${q.id}? Không hoàn tác được.`)) {
                          remove.mutate(q.id);
                        }
                      }}
                      className={dangerBtn}
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              ),
            )}

            {pageCount > 1 && (
              <div className="flex items-center justify-center gap-3 text-sm text-zinc-400">
                <button
                  disabled={safePage === 0}
                  onClick={() => setPage(safePage - 1)}
                  className={ghostBtn}
                >
                  ← Trước
                </button>
                <span>
                  Trang {safePage + 1}/{pageCount} · {filtered.length} câu
                </span>
                <button
                  disabled={safePage >= pageCount - 1}
                  onClick={() => setPage(safePage + 1)}
                  className={ghostBtn}
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}
