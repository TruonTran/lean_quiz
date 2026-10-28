import { useEffect, useState } from "react";
import { useExamTheme } from "../theme/ThemeContext";
import type { Answer, Question, SlideDir } from "../types/types";
import OptionButton from "../theme/OptionButton";
import NotesPanel from "../theme/NotesPanel";

type Props = {
  question: Question;
  slideKey: number;
  slideDir: SlideDir;
  selectedAnswer: Answer | undefined;
  pendingSelection: number[];
  isFlagged: boolean;
  note: string;
  swipeHandlers: {
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
    onTouchEnd: (e: React.TouchEvent<HTMLElement>) => void;
  };
  onOptionClick: (index: number) => void;
  onSubmitMulti: () => void;
  onToggleFlag: () => void;
  onNoteChange: (value: string) => void;
};

const letter = (i: number) => String.fromCharCode(65 + i);

export default function QuestionCard({
  question,
  slideKey,
  slideDir,
  selectedAnswer,
  pendingSelection,
  isFlagged,
  note,
  swipeHandlers,
  onOptionClick,
  onSubmitMulti,
  onToggleFlag,
  onNoteChange,
}: Props) {
  const { theme } = useExamTheme();
  const [showHint, setShowHint] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // sang câu khác thì tự đóng gợi ý
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setShowHint(false), [question.id]);

  const isAnswered = selectedAnswer !== undefined;
  const isMultiChoice = Array.isArray(question.answer);

  const isOptionChecked = (index: number) => {
    if (isAnswered) {
      return Array.isArray(selectedAnswer)
        ? selectedAnswer.includes(index)
        : selectedAnswer === index;
    }
    return isMultiChoice && pendingSelection.includes(index);
  };

  const isCorrectOption = (index: number) =>
    Array.isArray(question.answer)
      ? question.answer.includes(index)
      : question.answer === index;

  const userCorrect =
    isAnswered &&
    (Array.isArray(question.answer)
      ? Array.isArray(selectedAnswer) &&
        selectedAnswer.length === question.answer.length &&
        question.answer.every((a) => selectedAnswer.includes(a))
      : selectedAnswer === question.answer);

  const smallBtn = "rounded-md border px-3 py-1 text-sm font-medium transition";

  return (
    <div
      key={slideKey}
      className={`touch-pan-y rounded-xl p-6 shadow-sm ${theme.card} ${
        slideDir === "next" ? "slide-in-next" : "slide-in-prev"
      }`}
      {...swipeHandlers}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className={`text-xl font-semibold ${theme.text}`}>
          {question.question}
          {isMultiChoice && (
            <span
              className={`ml-2 rounded-md px-2 py-0.5 align-middle text-xs font-semibold ${theme.badge}`}
            >
              Chọn nhiều đáp án
            </span>
          )}
        </h2>

        <div className="flex shrink-0 gap-2">
          {!isAnswered && (
            <button
              onClick={() => setShowHint((s) => !s)}
              className={`${smallBtn} ${theme.softBtn} focus:outline-none focus:ring-2 focus:ring-yellow-300`}
            >
              Hint
            </button>
          )}
          <button
            type="button"
            onClick={onToggleFlag}
            className={`${smallBtn} ${isFlagged ? theme.flagOn : theme.toggleOff}`}
          >
            {isFlagged ? "★ Gắn cờ" : "☆ Gắn cờ"}
          </button>
          <button
            type="button"
            onClick={() => setShowNotes((s) => !s)}
            className={`${smallBtn} ${showNotes ? theme.toggleOn : theme.toggleOff}`}
          >
            📝 {note ? "Ghi chú" : "Thêm ghi chú"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            label={letter(index)}
            option={option}
            checked={isOptionChecked(index)}
            isAnswered={isAnswered}
            isCorrect={isCorrectOption(index)}
            isMultiChoice={isMultiChoice}
            onClick={() => onOptionClick(index)}
          />
        ))}
      </div>

      {showNotes && <NotesPanel value={note} onChange={onNoteChange} />}

      {isMultiChoice && !isAnswered && (
        <button
          onClick={onSubmitMulti}
          disabled={pendingSelection.length === 0}
          className="mt-4 w-full rounded-lg bg-linear-to-r from-yellow-400 to-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
        >
          Nộp đáp án ({pendingSelection.length} đã chọn)
        </button>
      )}

      {!isAnswered && showHint && (
        <div className={`fade-up mt-6 rounded-xl p-4 ${theme.hint}`}>
          <h3 className={`mb-1 font-semibold ${theme.hintTitle}`}>Hint</h3>
          <p>{question.hint ?? "No hint available for this question."}</p>
        </div>
      )}

      {isAnswered && (
        <div
          className={`fade-up mt-6 rounded-xl p-5 ${
            userCorrect ? theme.correctBox : theme.wrongBox
          }`}
        >
          <p className="mb-2">
            <strong className={theme.hintTitle}>Correct answer:</strong>{" "}
            {Array.isArray(question.answer)
              ? question.answer.map(letter).join(", ")
              : letter(question.answer)}
          </p>
          {question.rationale && (
            <p>
              <strong className={theme.hintTitle}>Explanation:</strong>{" "}
              {question.rationale}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
