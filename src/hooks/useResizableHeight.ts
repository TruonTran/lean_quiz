import { useRef, useState } from "react";

export function useResizableHeight(initial = 160, min = 100, max = 480) {
  const [height, setHeight] = useState(initial);
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    dragRef.current = { startY: e.clientY, startHeight: height };

    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current) return;
      const delta = ev.clientY - dragRef.current.startY;
      setHeight(Math.min(max, Math.max(min, dragRef.current.startHeight + delta)));
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return { height, onPointerDown };
}
