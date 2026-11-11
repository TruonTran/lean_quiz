import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { createEffect } from "../weather/engine";
import {
  durationMs,
  isFocusRoute,
  modeToPlan,
  nextDelayMs,
  pickPlan,
  type WeatherPlan,
} from "../weather/modes";
import { useSettingsStore } from "../store/settingsStore";
import { useThemeStore } from "../store/themeStore";

const FADE_MS = 2500;

/** Người dùng bật "giảm chuyển động" trong hệ điều hành thì không chạy hiệu ứng. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true,
  );
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function WeatherCanvas({ plan, visible, dark }: { plan: WeatherPlan; visible: boolean; dark: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [shown, setShown] = useState(false); // để lần đầu mờ dần hiện lên

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // giới hạn độ nét cho đỡ nặng máy
    const effect = createEffect(plan.kind, plan.strength, window.innerWidth, window.innerHeight, dark);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      effect.resize(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); // tab bị treo lâu thì không nhảy vọt
      last = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      effect.update(dt);
      effect.draw(ctx);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [plan.kind, plan.strength, dark]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      style={{ opacity: visible && shown ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
    />
  );
}

/**
 * Lớp hiệu ứng thời tiết phủ lên toàn web (không chặn thao tác bấm).
 * - Chế độ "auto": lâu lâu tự xuất hiện một hiệu ứng ngẫu nhiên rồi mờ dần.
 * - Chế độ cố định: chạy liên tục theo kiểu đã chọn. "Tắt": không chạy gì.
 * - Không chạy ở trang cần tập trung (làm quiz, đang viết bài) và khi bật "giảm chuyển động".
 */
export default function WeatherEffects() {
  const mode = useSettingsStore((s) => s.weatherMode);
  const dark = useThemeStore((s) => s.theme) === "dark";
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const blocked = reduced || isFocusRoute(pathname);

  const [autoPlan, setAutoPlan] = useState<WeatherPlan | null>(null);

  useEffect(() => {
    if (mode !== "auto" || blocked) return;
    let timer = 0;
    let last: WeatherPlan | null = null;
    let first = true;

    const arm = () => {
      timer = window.setTimeout(start, nextDelayMs(first, Math.random));
      first = false;
    };
    const start = () => {
      last = pickPlan(Math.random, last);
      setAutoPlan(last);
      timer = window.setTimeout(stop, durationMs(Math.random));
    };
    const stop = () => {
      setAutoPlan(null);
      arm();
    };
    arm();

    return () => {
      window.clearTimeout(timer);
      setAutoPlan(null);
    };
  }, [mode, blocked]);

  const active: WeatherPlan | null = blocked ? null : mode === "auto" ? autoPlan : modeToPlan(mode);

  // Giữ hiệu ứng thêm một lúc sau khi kết thúc để kịp mờ dần
  const [retained, setRetained] = useState<WeatherPlan | null>(null);
  if (active && (retained?.kind !== active.kind || retained?.strength !== active.strength)) {
    setRetained(active);
  }
  useEffect(() => {
    if (active) return;
    const id = window.setTimeout(() => setRetained(null), FADE_MS + 300);
    return () => window.clearTimeout(id);
  }, [active]);

  if (!retained) return null;
  return (
    <WeatherCanvas
      key={`${retained.kind}-${retained.strength}`}
      plan={retained}
      visible={active !== null}
      dark={dark}
    />
  );
}
