import { useState } from "react";
import { CONTACT } from "../config/contact";
import PageShell from "../components/PageShell";
import { ghostBtn, panel } from "../components/adminStyles";

type Channel = {
  icon: string;
  label: string;
  value: string;
  href: string;
};

const isHttp = (u: string) => /^https?:\/\//i.test(u);

function buildChannels(): Channel[] {
  const out: Channel[] = [];
  const email = CONTACT.email.trim();
  const facebook = CONTACT.facebook.trim();

  if (email) {
    const subject = encodeURIComponent("Cập nhật đề – Quiz Cùng T");
    out.push({ icon: "✉️", label: "Email", value: email, href: `mailto:${email}?subject=${subject}` });
  }
  if (facebook && isHttp(facebook)) {
    out.push({ icon: "📘", label: "Facebook", value: facebook.replace(/^https?:\/\/(www\.)?/i, ""), href: facebook });
  }
  return out;
}

export default function ContactPage() {
  const channels = buildChannels();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (c: Channel) => {
    try {
      await navigator.clipboard.writeText(c.value);
      setCopied(c.label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      window.alert(`Không sao chép được — bạn hãy chép thủ công: ${c.value}`);
    }
  };

  return (
    <PageShell
      eyebrow="Liên hệ"
      title={CONTACT.name ? `Liên hệ ${CONTACT.name}` : "Liên hệ"}
      subtitle={CONTACT.note}
      backTo="/"
      backLabel="← Trang chủ"
    >
      {channels.length === 0 ? (
        <p className={`${panel} mx-auto max-w-xl text-center text-zinc-400`}>
          Thông tin liên hệ chưa được cập nhật.
        </p>
      ) : (
        <div className="mx-auto max-w-xl space-y-4">
          {channels.map((c) => (
            <div key={c.label} className={`${panel} flex flex-wrap items-center justify-between gap-4`}>
              <div className="flex min-w-0 items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-2xl"
                >
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-mono-brand text-xs uppercase tracking-widest text-zinc-500">{c.label}</p>
                  <p className="break-all font-semibold text-yellow-200">{c.value}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={c.href} target="_blank" rel="noopener noreferrer" className={`${ghostBtn} inline-block`}>
                  Mở
                </a>
                <button onClick={() => copy(c)} className={ghostBtn}>
                  {copied === c.label ? "Đã chép ✓" : "Sao chép"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
