import { WEATHER_OPTIONS, type WeatherMode } from "../weather/modes";
import { useSettingsStore } from "../store/settingsStore";

/** Ô chọn hiệu ứng thời tiết (tự động, tắt, hoặc một kiểu cố định). Lưu lại cho lần sau. */
export default function WeatherPicker() {
  const mode = useSettingsStore((s) => s.weatherMode);
  const setMode = useSettingsStore((s) => s.setWeatherMode);

  return (
    <label className="flex items-center gap-2 rounded-full border border-yellow-400/25 bg-white/5 py-1 pl-4 pr-2 text-sm font-semibold text-yellow-200">
      Hiệu ứng
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as WeatherMode)}
        aria-label="Hiệu ứng thời tiết"
        className="cursor-pointer rounded-full bg-transparent py-0.5 text-sm font-semibold text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        {WEATHER_OPTIONS.map((o) => (
          <option key={o.value} value={o.value} className="bg-white text-zinc-900">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
