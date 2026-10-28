import { useExamTheme } from "./ThemeContext";

type Props = {
  label: string;
  option: string;
  checked: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  isMultiChoice: boolean;
  onClick: () => void;
};

export default function OptionButton({
  label,
  option,
  checked,
  isAnswered,
  isCorrect,
  isMultiChoice,
  onClick,
}: Props) {
  const { theme } = useExamTheme();

  // đã làm xong + đây là đáp án mình chọn -> tô đậm cả hàng
  const isChosen = isAnswered && checked;

  let state: string;
  if (!isAnswered) state = checked ? theme.optionChecked : theme.optionIdle;
  else if (isCorrect) state = theme.optionCorrect;
  else if (checked) state = theme.optionWrong;
  else state = theme.optionDim;

  const letter = !isAnswered
    ? theme.letterIdle
    : isCorrect
      ? theme.letterCorrect
      : theme.letterDim;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 ${state} ${
        isChosen ? `${theme.chosenRing} font-bold` : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {isMultiChoice && (
          <div
            className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
              checked ? "border-current bg-current/20" : "border-zinc-500"
            }`}
          >
            {checked && <span className="h-2 w-2 rounded-sm bg-current" />}
          </div>
        )}
        <div className={`mt-0.5 font-bold ${isChosen ? "" : letter}`}>{label}.</div>
        <div className="flex-1">{option}</div>
        {isChosen && (
          <span className="mt-0.5 shrink-0 rounded-md bg-black/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
            Bạn chọn
          </span>
        )}
      </div>
    </button>
  );
}
