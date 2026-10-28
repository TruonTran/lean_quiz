import { useEffect, useRef } from "react";

type Handlers = {
  onFirst: () => void;
  onLast: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDigit: (optionIndex: number) => void;
};

/** Phím tắt: Home/End, ←/→, 1-9/0 chọn đáp án. Bỏ qua khi đang gõ trong textarea/input. */
export function useExamKeyboard(enabled: boolean, handlers: Handlers) {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("textarea, input, [contenteditable='true']")) return;

      const h = ref.current;
      if (e.key === "Home") h.onFirst();
      else if (e.key === "End") h.onLast();
      else if (e.key === "ArrowLeft") h.onPrev();
      else if (e.key === "ArrowRight") h.onNext();
      else if (/^[0-9]$/.test(e.key)) {
        h.onDigit(e.key === "0" ? 9 : Number(e.key) - 1);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled]);
}
