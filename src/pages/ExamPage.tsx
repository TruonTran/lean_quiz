import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { errMsg } from "../data/api";
import { useSubject } from "../data/hooks";
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
import SummaryPanel from "../components/SummaryPanel";

import { useBreakReminder } from "../hooks/useBreakReminder";
import { usePopQuiz } from "../hooks/usePopQuiz";
import { recordPopQuiz, studiedPool } from "../data/popQuiz";
import PopQuizModal from "../components/PopQuizModal";
import { useSwipe } from "../hooks/useSwipe";
import { useExamKeyboard } from "../hooks/useExamKeyboard";
import { recordAnswer } from "../data/activity";

function ExamPageContent() {
  const { theme } = useExamTheme();
  const { subjectId } = useParams<{ subjectId: string }>();
  const location = useLocation();
  const subjectQuery = useSubject(subjectId);
  const subject = subjectQuery.data;
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
  const [mascotEvent, setMascotEvent] = useState<{
    id: number;
    correct: boolean;
  } | null>(null);
  const mascotCounterRef = useRef(0);
  const reportToMascot = (correct: boolean, countAsAnswer = true) => {
    mascotCounterRef.current += 1;
    setMascotEvent({ id: mascotCounterRef.current, correct });
    if (countAsAnswer) recordAnswer(correct); // câu hỏi bất ngờ không tính vào số câu đã làm
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
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
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
  const [summaryOpen, setSummaryOpen] = useState(
    () => window.matchMedia("(min-width: 1280px)").matches,
  );
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
  // Chỉ hỏi lại các câu đã làm trong đề này (gợi nhớ), không hỏi câu chưa học
  const studied = useMemo(() => studiedPool(questions, answeredIds, question?.id), [questions, answeredIds, question?.id]);
  const popQuiz = usePopQuiz(studied, breakReminder.visible || showConfirmReset);
  const swipe = useSwipe(goNext, goPrev);

  useExamKeyboard(Boolean(subjectId) && !showConfirmReset && !popQuiz.visible, {
    onFirst: () => goToIndex(0),
    onLast: () => goToIndex(questions.length - 1),
    onPrev: goPrev,
    onNext: goNext,
    onToggleSummary: () => setSummaryOpen((v) => !v),
    onDigit: (i) => {
      if (question && i < question.options.length) selectOption(i);
    },
  });

  if (subjectQuery.isPending) {
    return (
      <div
        className={`flex h-screen items-center justify-center text-xl font-semibold ${theme.page} ${theme.text}`}
      >
        Đang tải đề…
      </div>
    );
  }
  if (subjectQuery.isError) {
    return (
      <div
        className={`flex h-screen flex-col items-center justify-center gap-4 px-6 text-center ${theme.page} ${theme.text}`}
      >
        <p className="text-xl font-semibold">Không tải được đề</p>
        <p className={`text-sm ${theme.muted}`}>{errMsg(subjectQuery.error)}</p>
        <button
          onClick={() => subjectQuery.refetch()}
          className={`rounded-lg px-5 py-2 text-sm font-semibold ${theme.softBtn}`}
        >
          Thử lại
        </button>
      </div>
    );
  }
  if (!subject) {
    return (
      <div
        className={`flex h-screen items-center justify-center text-2xl font-semibold ${theme.page} ${theme.text}`}
      >
        Subject not found
      </div>
    );
  }
  if (!question) {
    return (
      <div
        className={`flex h-screen flex-col items-center justify-center gap-4 px-6 text-center ${theme.page} ${theme.text}`}
      >
        <p className="text-2xl font-semibold">Môn này chưa có câu hỏi nào</p>
        <Link
          to="/subjects"
          className={`rounded-lg px-5 py-2 text-sm font-semibold ${theme.softBtn}`}
        >
          ← Chọn môn khác
        </Link>
      </div>
    );
  }

  const note = subjectId ? (allNotes[subjectId]?.[question.id] ?? "") : "";

  return (
    <div
      className={`relative min-h-screen overflow-hidden py-10 ${theme.page}`}
    >
      <div className={theme.ambient} />

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-4 px-3 lg:flex-row lg:items-start lg:gap-6 lg:px-6">
        {/* Cột trái: ma trận số câu */}
        <QuestionMatrix
          questionIds={questionIds}
          currentIndex={currentIndex}
          answeredIds={answeredIds}
          flaggedIds={flaggedIds}
          onSelect={goToIndex}
        />

        {/* Cột giữa: câu hỏi */}
        <div className="flex min-w-0 flex-1 items-start gap-3 lg:gap-6">
          <NavArrow
            direction="prev"
            disabled={currentIndex === 0}
            onClick={goPrev}
          />

          <div
            className={`relative z-10 min-w-0 flex-1 rounded-2xl p-8 ${theme.panel}`}
          >
            <ExamHeader
              subjectId={subjectId}
              code={subject.code}
              name={subject.name}
              currentIndex={currentIndex}
              total={questions.length}
              isRetryMode={isRetryMode}
              resetButtonRef={resetButtonRef}
              onReset={() => setShowConfirmReset(true)}
              breakEnabled={breakReminder.enabled}
              onToggleBreak={breakReminder.toggle}
              popEnabled={popQuiz.enabled}
              onTogglePop={popQuiz.toggle}
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
              onNoteChange={(v) =>
                subjectId && setNote(subjectId, question.id, v)
              }
            />

            <p className={`mt-6 text-center text-xs lg:hidden ${theme.faint}`}>
              Vuốt trái/phải trên câu hỏi để chuyển câu
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

        {/* Cột phải: kiến thức tóm tắt */}
        {subjectId && (
          <SummaryPanel
            subjectId={subjectId}
            open={summaryOpen}
            onClose={() => setSummaryOpen(false)}
          />
        )}
      </div>

      {/* Nút mở lại ô kiến thức (K) */}
      {!summaryOpen && (
        <button
          type="button"
          onClick={() => setSummaryOpen(true)}
          title="Kiến thức tóm tắt (phím K)"
          className={`fixed bottom-24 right-4 z-30 rounded-full px-4 py-2 text-sm font-semibold shadow-lg xl:bottom-6 ${theme.softBtn} ${theme.panel}`}
        >
          Kiến thức
        </button>
      )}

      <CrabMascot event={mascotEvent} />

      {breakReminder.visible && (
        <BreakReminderModal
          message={breakReminder.message}
          onDismiss={breakReminder.dismiss}
          onSnooze={breakReminder.snooze}
          onTurnOff={breakReminder.turnOff}
        />
      )}

      {popQuiz.visible && popQuiz.question && (
        <PopQuizModal
          key={popQuiz.question.id}
          question={popQuiz.question}
          onAnswered={(correct) => {
            void recordPopQuiz(correct);
            reportToMascot(correct, false);
          }}
          onClose={popQuiz.close}
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
