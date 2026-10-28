import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getSubjectById } from "../data/subjects";
import { useExamStore } from "../store/examStore";
import { ExamThemeProvider, useExamTheme } from "../theme/ThemeContext";
import type { SlideDir } from "../types/types";

import ExamHeader from "../components/ExamHeader";
import QuestionMatrix from "../components/QuestionMatrix";
import QuestionCard from "../components/QuestionCard";
import NavArrow from "../components/NavArrow";
import MobileNavBar from "../components/MobileNavBar";
import BreakReminderModal from "../components/BreakReminderModal";
import ConfirmResetModal from "../components/ConfirmResetModal";
import CrabMascot from "../components/CrabMascot";

import { useBreakReminder } from "../hooks/useBreakReminder";
import { useSwipe } from "../hooks/useSwipe";
import { useExamKeyboard } from "../hooks/useExamKeyboard";

function ExamPageContent() {
  const { theme } = useExamTheme();
  const { subjectId } = useParams<{ subjectId: string }>();
  const location = useLocation();
  const subject = getSubjectById(subjectId ?? "");

  /* ---------- store ---------- */
  const allAnswers = useExamStore((s) => s.answers);
  const allCurrentIndex = useExamStore((s) => s.currentIndex);
  const allNotes = useExamStore((s) => s.notes);
  const setAnswer = useExamStore((s) => s.setAnswer);
  const setCurrentIndex = useExamStore((s) => s.setCurrentIndex);
  const clearExam = useExamStore((s) => s.clearExam);
  const setNote = useExamStore((s) => s.setNote);

  const answers = useMemo(
    () => (subjectId ? (allAnswers[subjectId] ?? {}) : {}),
    [allAnswers, subjectId],
  );
  const answeredIds = useMemo(
    () => new Set<number>(Object.keys(answers).map(Number)),
    [answers],
  );

  /* ---------- danh sách câu hỏi (thường / làm lại câu sai) ---------- */
  const retryIds = (location.state as { retryIds?: number[] } | null)?.retryIds;
  const isRetryMode = Boolean(retryIds && retryIds.length > 0);
  const retryKey = retryIds && retryIds.length > 0 ? retryIds.join(",") : "";

  const questions = useMemo(() => {
    if (!subject) return [];
    if (retryIds && retryIds.length > 0) {
      const byId = new Map(subject.questions.map((q) => [q.id, q]));
      const filtered = retryIds
        .map((id) => byId.get(id))
        .filter((q): q is NonNullable<typeof q> => q !== undefined);
      if (filtered.length > 0) return filtered;
    }
    return subject.questions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, retryKey]);
  const questionIds = useMemo(() => questions.map((q) => q.id), [questions]);

  /* ---------- vị trí câu hiện tại ---------- */
  const [retryIndex, setRetryIndex] = useState(0);
  const prevRetryKeyRef = useRef("");
  useLayoutEffect(() => {
    if (prevRetryKeyRef.current !== retryKey) {
      prevRetryKeyRef.current = retryKey;
      setRetryIndex(0);
    }
  }, [retryKey]);

  const currentIndex = isRetryMode
    ? retryIndex
    : subjectId
      ? (allCurrentIndex[subjectId] ?? 0)
      : 0;

  const [slideDir, setSlideDir] = useState<SlideDir>("next");

  const goToIndex = useCallback(
    (index: number) => {
      const safe = Math.max(0, Math.min(index, questions.length - 1));
      if (safe === currentIndex) return;
      setSlideDir(safe > currentIndex ? "next" : "prev");
      if (isRetryMode) setRetryIndex(safe);
      else if (subjectId) setCurrentIndex(subjectId, safe);
    },
    [questions.length, currentIndex, isRetryMode, subjectId, setCurrentIndex],
  );

  const goPrev = () => goToIndex(currentIndex - 1);
  const goNext = () => goToIndex(currentIndex + 1);

  /* ---------- cờ / chọn nhiều đáp án ---------- */
  const [flaggedIds, setFlaggedIds] = useState<number[]>([]);
  const [pendingSelection, setPendingSelection] = useState<number[]>([]);
  const prevPendingKeyRef = useRef("");
  useLayoutEffect(() => {
    const key = `${subjectId ?? ""}:${currentIndex}`;
    if (prevPendingKeyRef.current !== key) {
      prevPendingKeyRef.current = key;
      setPendingSelection([]);
    }
  }, [subjectId, currentIndex]);

  const question = questions[currentIndex];

  /* ---------- linh vật Cua: khen khi đúng, chọc khi sai ---------- */
  const [mascotEvent, setMascotEvent] = useState<{
    id: number;
    correct: boolean;
  } | null>(null);
  const mascotCounterRef = useRef(0);
  const reportToMascot = (correct: boolean) => {
    mascotCounterRef.current += 1;
    setMascotEvent({ id: mascotCounterRef.current, correct });
  };

  const toggleFlag = () => {
    if (!question) return;
    setFlaggedIds((cur) =>
      cur.includes(question.id)
        ? cur.filter((id) => id !== question.id)
        : [...cur, question.id],
    );
  };

  const selectOption = (index: number) => {
    if (!question || !subjectId || answers[question.id] !== undefined) return;
    if (Array.isArray(question.answer)) {
      setPendingSelection((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
      );
    } else {
      setAnswer(subjectId, question.id, index);
      reportToMascot(index === question.answer);
    }
  };

  const submitMultiChoice = () => {
    if (!question || !subjectId || pendingSelection.length === 0) return;
    const picked = [...pendingSelection].sort((a, b) => a - b);
    setAnswer(subjectId, question.id, picked);

    const correctSet = Array.isArray(question.answer) ? question.answer : [];
    reportToMascot(
      picked.length === correctSet.length &&
        correctSet.every((a) => picked.includes(a)),
    );
  };

  /* ---------- reset / nghỉ giải lao / phím tắt / vuốt ---------- */
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeReset = useCallback(() => {
    setShowConfirmReset(false);
    setTimeout(() => resetButtonRef.current?.focus(), 0);
  }, []);

  const doReset = () => {
    if (!subjectId) return;
    clearExam(subjectId);
    setCurrentIndex(subjectId, 0);
    setRetryIndex(0);
    closeReset();
  };

  const breakReminder = useBreakReminder();
  const swipe = useSwipe(goNext, goPrev);

  useExamKeyboard(Boolean(subjectId) && !showConfirmReset, {
    onFirst: () => goToIndex(0),
    onLast: () => goToIndex(questions.length - 1),
    onPrev: goPrev,
    onNext: goNext,
    onDigit: (i) => {
      if (question && i < question.options.length) selectOption(i);
    },
  });

  /* ---------- render ---------- */
  if (!subject) {
    return (
      <div className={`flex h-screen items-center justify-center text-2xl font-semibold ${theme.page} ${theme.text}`}>
        Subject not found
      </div>
    );
  }
  if (!question) {
    return (
      <div className={`flex h-screen items-center justify-center text-2xl font-semibold ${theme.page} ${theme.text}`}>
        No questions found
      </div>
    );
  }

  const note = subjectId ? (allNotes[subjectId]?.[question.id] ?? "") : "";

  return (
    <div className={`relative min-h-screen overflow-hidden py-10 ${theme.page}`}>
      <div className={theme.ambient} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-3 lg:flex-row lg:items-start lg:gap-6 lg:px-6">
        {/* Cột trái: ma trận số câu */}
        <QuestionMatrix
          questionIds={questionIds}
          currentIndex={currentIndex}
          answeredIds={answeredIds}
          flaggedIds={flaggedIds}
          onSelect={goToIndex}
        />

        {/* Cột phải: câu hỏi */}
        <div className="flex min-w-0 flex-1 items-start gap-3 lg:gap-6">
          <NavArrow direction="prev" disabled={currentIndex === 0} onClick={goPrev} />

          <div className={`relative z-10 min-w-0 flex-1 rounded-2xl p-8 ${theme.panel}`}>
            <ExamHeader
              subjectId={subjectId}
              code={subject.code}
              name={subject.name}
              currentIndex={currentIndex}
              total={questions.length}
              isRetryMode={isRetryMode}
              resetButtonRef={resetButtonRef}
              onReset={() => setShowConfirmReset(true)}
            />

            <QuestionCard
              question={question}
              slideKey={currentIndex}
              slideDir={slideDir}
              selectedAnswer={answers[question.id]}
              pendingSelection={pendingSelection}
              isFlagged={flaggedIds.includes(question.id)}
              note={note}
              swipeHandlers={swipe}
              onOptionClick={selectOption}
              onSubmitMulti={submitMultiChoice}
              onToggleFlag={toggleFlag}
              onNoteChange={(v) => subjectId && setNote(subjectId, question.id, v)}
            />

            <p className={`mt-6 text-center text-xs lg:hidden ${theme.faint}`}>
              👆 Vuốt trái/phải trên câu hỏi để chuyển câu
            </p>

            <MobileNavBar
              canPrev={currentIndex > 0}
              canNext={currentIndex < questions.length - 1}
              onPrev={goPrev}
              onNext={goNext}
            />
          </div>

          <NavArrow
            direction="next"
            disabled={currentIndex === questions.length - 1}
            onClick={goNext}
          />
        </div>
      </div>

      <CrabMascot event={mascotEvent} />

      {breakReminder.visible && (
        <BreakReminderModal
          message={breakReminder.message}
          onDismiss={breakReminder.dismiss}
          onSnooze={breakReminder.snooze}
        />
      )}

      {showConfirmReset && (
        <ConfirmResetModal onCancel={closeReset} onConfirm={doReset} />
      )}
    </div>
  );
}

export default function ExamPage() {
  return (
    <ExamThemeProvider>
      <ExamPageContent />
    </ExamThemeProvider>
  );
}
