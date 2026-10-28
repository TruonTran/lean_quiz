import { useExamTheme } from "../theme/ThemeContext";

type Props = {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
};

export default function NavArrow({ direction, disabled, onClick }: Props) {
  const { theme } = useExamTheme();
  const isPrev = direction === "prev";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Câu trước" : "Câu tiếp theo"}
      className={`group sticky top-1/2 hidden h-14 w-14 shrink-0 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ease-out active:scale-90 disabled:pointer-events-none disabled:opacity-0 lg:flex focus:outline-none focus:ring-2 focus:ring-yellow-300 ${theme.navArrow}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-5 w-5 transition-transform duration-300 ease-out ${
          isPrev ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
        }`}
      >
        <path
          d={isPrev ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
