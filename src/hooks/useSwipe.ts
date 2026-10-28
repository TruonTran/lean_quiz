import { useRef } from "react";

const SWIPE_THRESHOLD = 60;

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startRef = useRef<{ x: number; y: number; isTextInput: boolean } | null>(
    null,
  );

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    const target = e.target as HTMLElement;
    startRef.current = {
      x: t.clientX,
      y: t.clientY,
      isTextInput: target.closest("textarea, input") !== null,
    };
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const start = startRef.current;
    startRef.current = null;
    if (!start || start.isTextInput) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.5) {
      return;
    }
    if (dx < 0) onSwipeLeft();
    else onSwipeRight();
  };

  return { onTouchStart, onTouchEnd };
}
