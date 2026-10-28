import { useExamTheme } from "./ThemeContext";
import { useResizableHeight } from "../hooks/useResizableHeight";

type Props = { value: string; onChange: (value: string) => void };

export default function NotesPanel({ value, onChange }: Props) {
  const { theme } = useExamTheme();
  const { height, onPointerDown } = useResizableHeight(160, 100, 480);

  return (
    <div className={`mt-4 rounded-lg p-3 ${theme.box}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nhập ghi chú của bạn ở đây..."
        style={{ height, resize: "none" }}
        className={`w-full rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/40 ${theme.input}`}
      />
      <div
        onPointerDown={onPointerDown}
        className="group mx-auto mt-1 flex h-4 w-full cursor-ns-resize touch-none items-center justify-center"
        role="separator"
        aria-orientation="horizontal"
        aria-label="Kéo để đổi chiều cao khung ghi chú"
      >
        <div className={`h-1 w-10 rounded-full transition ${theme.handle}`} />
      </div>
    </div>
  );
}
