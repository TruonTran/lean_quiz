import { useExamTheme } from "../theme/ThemeContext";

type Props = {
  number: number;
  isCurrent: boolean;
  isDone: boolean;
  isFlagged: boolean;
  onClick: () => void;
};

export default function QuestionMatrixCell({
  number,
  isCurrent,
  isDone,
  isFlagged,
  onClick,
}: Props) {
  const { theme } = useExamTheme();

  let state = theme.cellIdle;
  if (isCurrent) state = theme.cellCurrent;
  else if (isDone) state = theme.cellDone;
  else if (isFlagged) state = theme.cellFlagged;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-8 items-center justify-center rounded-xl text-[11px] font-bold transition ${state}`}
      aria-label={`Chuyển tới câu ${number}`}
      title={isFlagged ? `Câu ${number} đã được gắn cờ` : `Câu ${number}`}
    >
      {number}
      {isFlagged && !isCurrent && (
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#d9584f]" />
      )}
    </button>
  );
}
