import { useEffect, useRef } from "react";

/**
 * Hiệu ứng con trỏ chuột kiểu Lumora: một quầng sáng vàng mềm đuổi theo
 * chuột (lerp mượt) + một chấm nhỏ bám sát con trỏ.
 * Thuần hiệu ứng trang trí — không có logic nghiệp vụ, không ảnh hưởng
 * tới bất kỳ chức năng nào của app.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReduced || isCoarsePointer) return;

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
