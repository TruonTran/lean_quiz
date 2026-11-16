import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createQuestion,
  deleteAllQuestions,
  deleteQuestion,
  errMsg,
  updateQuestion,
} from "../data/api";
import {
  draftFromQuestion,
  emptyDraft,
  optionLabel,
  type QuestionPayload,
} from "../data/drafts";
import { useSubject } from "../data/hooks";
import PageShell from "../components/PageShell";
import QuestionForm from "../components/QuestionForm";
import BulkImportPanel from "../components/BulkImportPanel";
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
  const [importing, setImporting] = useState(false);
  const [formKey, setFormKey] = useState(0); // đổi key để xoá trắng form sau khi thêm
  const [editing, setEditing] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [confirmAll, setConfirmAll] = useState(false); // đang hiện khung xác nhận xoá toàn bộ
  const [typed, setTyped] = useState(""); // mã môn người dùng gõ để xác nhận

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
    mutationFn: (v: { qid: number; p: QuestionPayload }) =>
      updateQuestion(id, v.qid, v.p),
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

  const removeAll = useMutation({
    mutationFn: () => deleteAllQuestions(id),
    onSuccess: async ({ deleted, idsMayRestart }) => {
      await refresh();
      setConfirmAll(false);
      setTyped("");
      setSearch("");
      setPage(0);
      setEditing(null);
      setNotice(
        `Đã xoá toàn bộ ${deleted} câu hỏi.` +
          (idsMayRestart
            ? " Lưu ý: chưa chạy supabase/delete-all-questions.sql nên câu thêm mới sẽ đánh số lại từ 1."
            : ""),
      );
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
  const visible = filtered.slice(
    safePage * PAGE_SIZE,
    (safePage + 1) * PAGE_SIZE,
  );

  const startConfirmAll = () => {
    removeAll.reset();
    setNotice(null);
    setEditing(null);
    setAdding(false);
    setImporting(false);
    setTyped("");
    setConfirmAll(true);
  };

  const startAdd = () => {
    add.reset();
    setConfirmAll(false);
    setNotice(null);
    setEditing(null);
    setImporting(false);
    setAdding(true);
  };
  const startImport = () => {
    setConfirmAll(false);
    setNotice(null);
    setEditing(null);
    setAdding(false);
    setImporting(true);
  };
  const startEdit = (qid: number) => {
    update.reset();
    setConfirmAll(false);
    setNotice(null);
    setAdding(false);
    setImporting(false);
    setEditing(qid);
  };

  if (subjectQuery.isPending || subjectQuery.isError || !subject) {
    return (
      <PageShell
        eyebrow="Quản trị"
        title="Câu hỏi"
        backTo="/admin/questions"
        backLabel="← Chọn môn khác"
      >
        {subjectQuery.isError ? (
          <ErrorBox
            error={subjectQuery.error}
            onRetry={() => subjectQuery.refetch()}
          />
        ) : subjectQuery.isPending ? (
          <Loading />
        ) : (
          <p className={`${panel} mx-auto max-w-md text-center text-zinc-400`}>
            Không tìm thấy môn này.{" "}
            <Link to="/admin/questions" className="text-yellow-200 underline">
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
      backTo="/admin/questions"
      backLabel="← Chọn môn khác"
    >
      <div className="space-y-5">
        {!adding && !importing && (
          <div className="flex flex-wrap gap-2">
            <button onClick={startAdd} className={primaryBtn}>
              + Thêm câu hỏi
            </button>
            <button
              onClick={startImport}
              className={ghostBtn + " !px-5 !py-2 !text-sm"}
            >
              Nhập hàng loạt
            </button>
            {questions.length > 0 && !confirmAll && (
              <button onClick={startConfirmAll} className={`${dangerBtn} ml-auto`}>
                Xoá toàn bộ câu hỏi
              </button>
            )}
          </div>
        )}

        {confirmAll && (
          <div role="alertdialog" aria-labelledby="del-all-title" className={`${panel} space-y-3 border-red-400/40`}>
            <h2 id="del-all-title" className="text-lg font-bold text-red-300">
              Xoá toàn bộ {questions.length} câu hỏi của môn {subject.code}?
            </h2>
            <p className="text-sm text-zinc-300">
              Thao tác này <b>không hoàn tác được</b>. Môn học, phần tóm tắt và đề thi viết vẫn được giữ. Chỉ các câu
              hỏi trắc nghiệm của môn này bị xoá.
            </p>
            <label className="block space-y-1">
              <span className="text-sm text-zinc-400">
                Gõ mã môn <b className="text-yellow-200">{subject.code}</b> để xác nhận:
              </span>
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={subject.code}
                autoComplete="off"
                autoFocus
                className={inputClass}
                aria-label="Gõ mã môn để xác nhận"
              />
            </label>
            {removeAll.error && (
              <p role="alert" className="text-sm text-red-300">
                {errMsg(removeAll.error)}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => removeAll.mutate()}
                disabled={removeAll.isPending || typed.trim().toLowerCase() !== subject.code.toLowerCase()}
                className={`${dangerBtn} disabled:opacity-40`}
              >
                {removeAll.isPending ? "Đang xoá…" : `Xoá toàn bộ ${questions.length} câu`}
              </button>
              <button
                onClick={() => setConfirmAll(false)}
                disabled={removeAll.isPending}
                className={ghostBtn}
              >
                Huỷ
              </button>
            </div>
          </div>
        )}

        {importing && (
          <BulkImportPanel
            subjectId={id}
            existing={questions.map((q) => q.question)}
            onClose={() => setImporting(false)}
            onImported={({ count, first, last }) => {
              setImporting(false);
              setSearch("");
              setPage(9999); // nhảy tới trang cuối, nơi các câu mới nằm
              setNotice(`Đã nhập ${count} câu (#${first}–#${last}).`);
            }}
          />
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
          <p className={`${panel} text-center text-zinc-400`}>
            Không có câu nào khớp.
          </p>
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
                <div
                  key={q.id}
                  className={`${panel} flex items-start justify-between gap-4`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-yellow-300">
                      #{q.id}
                      {Array.isArray(q.answer) && (
                        <span className="ml-2 rounded-full border border-yellow-400/25 px-2 py-0.5 text-xs font-normal text-yellow-200">
                          chọn nhiều
                        </span>
                      )}
                    </p>
                    <p className="mt-1 line-clamp-3 text-zinc-200">
                      {q.question}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {q.options.length} đáp án · Đúng:{" "}
                      {(Array.isArray(q.answer) ? q.answer : [q.answer])
                        .map(optionLabel)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(q.id)}
                      className={ghostBtn}
                    >
                      Sửa
                    </button>
                    <button
                      disabled={remove.isPending}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Xoá câu #${q.id}? Không hoàn tác được.`,
                          )
                        ) {
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
