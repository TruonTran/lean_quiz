import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
};

/** Khung chung cho các trang ngoài bài thi: nền, orb trang trí, tiêu đề, nút quay lại. */
export default function PageShell({
  eyebrow,
  title,
  subtitle,
  backTo,
  backLabel = "← Quay lại",
  children,
}: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090c] p-6 sm:p-10">
      <div className="bg-ambient" />
      <div
        aria-hidden="true"
        className="floating-orb -left-16 top-10 h-72 w-72 bg-yellow-400/10"
        style={{ animationDelay: "0s", animationDuration: "8s" }}
      />
      <div
        aria-hidden="true"
        className="floating-orb right-0 top-1/3 h-56 w-56 bg-amber-500/10"
        style={{ animationDelay: "1.2s", animationDuration: "9s" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {backTo && (
          <Link
            to={backTo}
            className="fade-up mb-8 inline-flex items-center gap-2 rounded-lg border border-yellow-400/25 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            {backLabel}
          </Link>
        )}

        <div className="mb-10 text-center">
          {eyebrow && (
            <span className="fade-up font-mono-brand inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-yellow-300">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              {eyebrow}
            </span>
          )}
          <h1
            className="fade-up mt-5 text-3xl font-extrabold text-white sm:text-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="fade-up mt-3 text-base text-zinc-400"
              style={{ animationDelay: "0.2s" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
