/** Các kiểu hiệu ứng thời tiết và lịch xuất hiện "lâu lâu". */

export type WeatherKind = "snow" | "rain" | "wind" | "sun";
export type WeatherStrength = "light" | "strong";
export type WeatherPlan = { kind: WeatherKind; strength: WeatherStrength };

/** auto = thỉnh thoảng tự xuất hiện; off = tắt; còn lại = chạy liên tục theo kiểu đã chọn. */
export type WeatherMode = "auto" | "off" | `${WeatherKind}-${WeatherStrength}`;

export const WEATHER_OPTIONS: { value: WeatherMode; label: string }[] = [
  { value: "auto", label: "Tự động (thỉnh thoảng)" },
  { value: "off", label: "Tắt" },
  { value: "snow-light", label: "Tuyết rơi nhẹ" },
  { value: "snow-strong", label: "Tuyết rơi dày" },
  { value: "rain-light", label: "Mưa nhẹ" },
  { value: "rain-strong", label: "Mưa to, gió giật" },
  { value: "wind-light", label: "Gió nhẹ" },
  { value: "wind-strong", label: "Gió mạnh" },
  { value: "sun-light", label: "Nắng dịu" },
  { value: "sun-strong", label: "Nắng gắt" },
];

/** Kiểu cố định → kế hoạch hiệu ứng; auto / off → null (do bộ hẹn giờ quyết định). */
export function modeToPlan(mode: WeatherMode): WeatherPlan | null {
  if (mode === "auto" || mode === "off") return null;
  const [kind, strength] = mode.split("-") as [WeatherKind, WeatherStrength];
  return { kind, strength };
}

const KINDS: WeatherKind[] = ["snow", "rain", "wind", "sun"];

/** Chọn ngẫu nhiên một hiệu ứng, không lặp lại đúng hiệu ứng vừa rồi. 60% nhẹ, 40% mạnh. */
export function pickPlan(rand: () => number, last: WeatherPlan | null): WeatherPlan {
  const idx = Math.min(KINDS.length - 1, Math.floor(rand() * KINDS.length));
  const strength: WeatherStrength = rand() < 0.6 ? "light" : "strong";
  let plan: WeatherPlan = { kind: KINDS[idx], strength };
  if (last && last.kind === plan.kind && last.strength === plan.strength) {
    plan = { kind: KINDS[(idx + 1) % KINDS.length], strength };
  }
  return plan;
}

const SEC = 1000;
/** Lần đầu sau khi mở web: 30–90 giây; các lần sau: 3–8 phút. */
export function nextDelayMs(first: boolean, rand: () => number): number {
  return first ? (30 + rand() * 60) * SEC : (180 + rand() * 300) * SEC;
}
/** Mỗi lần hiệu ứng kéo dài 40–75 giây. */
export function durationMs(rand: () => number): number {
  return (40 + rand() * 35) * SEC;
}

/** Trang cần tập trung (làm quiz, đang viết bài) thì không bật hiệu ứng. */
export function isFocusRoute(pathname: string): boolean {
  return pathname.startsWith("/exam") || /^\/essays\/[^/]+\/\d+/.test(pathname);
}
