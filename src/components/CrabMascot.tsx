import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useExamTheme } from "../theme/ThemeContext";

/* ============================================================
 * LỜI THOẠI CỦA CUA — muốn thêm/sửa câu nào thì sửa ngay ở đây
 * ============================================================ */
type Line = { text: string; emoji: string };

// Khi bạn làm ĐÚNG -> khen (kiểu khen mà vẫn xéo xắt)
const CORRECT_LINES: Line[] = [
  { text: "Ồ đúng luôn. Hôm nay bạn ăn gì mà thông minh dữ vậy?", emoji: "😳" },
  { text: "Được đó bạn, Cua vỗ tay cái nè. Bốp bốp.", emoji: "👏" },
  { text: "Đúng rồi. Đừng có tự mãn, còn cả đống câu nữa kìa.", emoji: "😏" },
  { text: "Ủa làm đúng thiệt hả? Cua tưởng bạn đoán bừa chứ.", emoji: "🤨" },
  { text: "Câu này mà đúng thì khen cũng ngại, nhưng thôi khen đại.", emoji: "🙄" },
  { text: "Chuẩn. Nói thiệt, Cua hơi nể.", emoji: "🦀" },
  { text: "Giỏi giỏi, thi xong Cua mua cho cây kem.", emoji: "🍦" },
  { text: "Đúng nữa trời. Vậy Cua còn chọc kiểu gì được đây?", emoji: "😤" },
  { text: "Đúng. Cua định chọc mà không có cớ, bực ghê.", emoji: "😤" },
  { text: "Trời, bạn làm Cua mất việc rồi. Còn gì để chọc đâu.", emoji: "😮" },
  { text: "Chà, nay có mang não đi học luôn hả?", emoji: "🧠" },
  { text: "Đúng rồi. Giữ vậy tới cuối bài đi, đừng có đuối.", emoji: "💪" },
  { text: "Câu này khó mà bạn qua ngon lành luôn. Cua phục lăn.", emoji: "🙇" },
  { text: "Hay đó. Khen xong rồi, làm câu tiếp đi, đứng đó chờ gì?", emoji: "👉" },
  { text: "Đúng mà nhìn mặt tự tin ghê. Thôi cho tự tin tí.", emoji: "😌" },
  { text: "Cua định ngủ gật rồi, ai ngờ bạn làm đúng, tỉnh cả người.", emoji: "😴" },
  { text: "Chuẩn không cần chỉnh. Cua duyệt.", emoji: "✅" },
  { text: "Câu này đúng thì Cua cho bạn nghỉ 5 giây. Hết rồi, làm tiếp.", emoji: "⏱️" },
  { text: "Đỉnh thiệt chứ không phải khen cho có đâu nha.", emoji: "🔥" },
  { text: "Bạn cứ vậy hoài là Cua hết chuyện để cằn nhằn.", emoji: "🥲" },
];

// Khi bạn làm SAI -> chọc quê
const WRONG_LINES: Line[] = [
  { text: "Sai rồi cha nội. Mắt để ở nhà hay sao vậy?", emoji: "🙄" },
  { text: "Haha sai kìa! Cua cười muốn rụng cái càng luôn.", emoji: "🤣" },
  { text: "Đáp án đúng nằm sờ sờ đó mà cũng chọn trật, Cua nể thiệt.", emoji: "😮‍💨" },
  { text: "Đoán bừa đúng không? Khai thật đi.", emoji: "🕵️" },
  { text: "Sai. Não bạn để quên ở đâu rồi, để Cua đi tìm giùm.", emoji: "🧠" },
  { text: "Thôi xong, Cua còn ngại thay cho bạn.", emoji: "🫠" },
  { text: "Ê đọc giải thích đi, đừng có lướt qua như không có gì.", emoji: "📖" },
  { text: "Tung đồng xu còn trúng nhiều hơn bạn á.", emoji: "🪙" },
  { text: "Sai nữa. Cua ghi sổ nha, cuối buổi tính.", emoji: "📒" },
  { text: "Ngày thi mà sai kiểu này là Cua xỉu ngang.", emoji: "😵" },
  { text: "Câu này dễ mà. Dễ tới mức Cua cũng làm được, mà Cua là con cua đó.", emoji: "🦀" },
  { text: "Sai. Cua không nói gì thêm, để bạn tự suy nghĩ về cuộc đời.", emoji: "🌅" },
  { text: "Ơ chọn gì kỳ vậy? Bạn nhắm mắt chọn đúng không?", emoji: "🙈" },
  { text: "Sai rồi nha. Không sao, mới có Cua thấy thôi, chưa ai biết đâu.", emoji: "🤫" },
  { text: "Đáp án bạn chọn nghe thuyết phục ghê, tiếc là sai.", emoji: "😅" },
  { text: "Bạn tự tin vậy mà sai, Cua vừa buồn cười vừa thương.", emoji: "🥹" },
  { text: "Đọc kỹ đề chưa vậy? Hay đọc bằng mắt nhắm?", emoji: "👁️" },
  { text: "Sai. Nhớ câu này đi, đừng để Cua phải chọc lần hai.", emoji: "☝️" },
  { text: "Tuần sau gặp lại câu này mà sai nữa là Cua đăng lên bảng tin nha.", emoji: "📢" },
  { text: "Thôi không sao, ai mà chẳng có ngày ngáo. Hôm nay là ngày của bạn.", emoji: "🫶" },
  { text: "Kỳ ghê, sao chọn đúng cái đáp án sai nhất vậy?", emoji: "🤔" },
  { text: "Xem lại giải thích đi, hiểu rồi khỏi sai nữa, khỏi bị Cua chọc.", emoji: "📖" },
  { text: "Sai nhẹ thôi, nhưng Cua vẫn thấy đau dùm.", emoji: "🤕" },
  { text: "Cua chớp mắt một cái là bạn sai rồi, nhanh dữ.", emoji: "⚡" },
];

// Làm đúng liên tiếp
const CORRECT_STREAK: Record<number, Line> = {
  3: { text: "3 câu liền rồi. Coi chừng, sắp sai tới nơi đó.", emoji: "😏" },
  5: { text: "5 câu liền luôn?! Bạn có gian lận không? Khai mau!", emoji: "🕵️" },
  10: { text: "10 câu liên tục. Ok Cua phục, Cua im.", emoji: "🫡" },
  7: { text: "7 câu liền! Bình tĩnh nha, đừng bay cao quá rồi rơi cái bịch.", emoji: "🛫" },
  15: { text: "15 câu liên tục. Bạn mà gương mẫu vậy Cua xin ngồi xa ra cho khỏi lép vế.", emoji: "😳" },
  20: { text: "20 câu liền. Cua đi báo cho cả bể biết bạn là thần đồng.", emoji: "📣" },
};

// Sai liên tiếp
const WRONG_STREAK: Record<number, Line> = {
  3: { text: "3 câu sai liền. Đi rửa mặt uống miếng nước rồi quay lại đi bạn.", emoji: "💧" },
  5: { text: "5 câu sai liên tiếp... nghỉ đi, học nữa Cua thấy tội.", emoji: "🛌" },
  7: { text: "7 câu sai liên tiếp. Cua lo thiệt đó, nghỉ chút đi bạn.", emoji: "🫂" },
  10: { text: "10 câu sai liền... thôi đóng sách lại, mai làm lại. Cua hứa không chọc nữa.", emoji: "🌙" },
};

// Khi bấm vào Cua
const IDLE_LINES: Line[] = [
  { text: "Gì đó? Bấm Cua hoài. Làm bài đi!", emoji: "🙄" },
  { text: "Ngồi lâu rồi đó, đứng dậy vươn vai cái đi.", emoji: "🧍" },
  { text: "Cua đói rồi. Làm xong ghé cho Cua miếng bánh mì.", emoji: "🥖" },
  { text: "Sai thì sai, đừng bỏ cuộc. Mà sai ít ít thôi nha.", emoji: "😏" },
  { text: "Đừng nhìn Cua nữa, nhìn câu hỏi kìa.", emoji: "👀" },
  { text: "Uống miếng nước đi, môi khô như cua phơi nắng rồi kìa.", emoji: "💧" },
  { text: "Cua nghe tiếng bụng bạn kêu từ đây. Ăn gì đi.", emoji: "🍜" },
  { text: "Đang làm bài mà bấm Cua là sao? Rảnh hả?", emoji: "🤨" },
  { text: "Làm bài đi, đừng có lướt web. Cua thấy hết đó.", emoji: "🕶️" },
  { text: "Bạn ngồi cong lưng rồi đó. Thẳng lưng lên coi.", emoji: "🪑" },
  { text: "Học vừa thôi chứ, mắt sắp thành mắt cua rồi kìa.", emoji: "👀" },
  { text: "Đừng có hỏi Cua đáp án, Cua cũng đang ngồi xem bạn làm nè.", emoji: "🍿" },
  { text: "Hít vô, thở ra. Rồi làm tiếp.", emoji: "🌬️" },
];

const BUBBLE_VISIBLE_MS = 6000;
const MOOD_RESET_MS = 1400;
const MUTE_KEY = "exam-crab-muted";

type Mood = "idle" | "correct" | "wrong";
type Props = { event: { id: number; correct: boolean } | null };

const POS_KEY = "exam-crab-pos";
const DRAG_THRESHOLD = 5; // kéo quá 5px mới tính là kéo, dưới đó là bấm
const EDGE = 8; // chừa mép màn hình
const BUBBLE_WIDTH = 288;

type Pos = { x: number; y: number };

function readPos(): Pos | null {
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Pos;
    return typeof p.x === "number" && typeof p.y === "number" ? p : null;
  } catch {
    return null;
  }
}

function savePos(pos: Pos | null) {
  try {
    if (pos) localStorage.setItem(POS_KEY, JSON.stringify(pos));
    else localStorage.removeItem(POS_KEY);
  } catch {
    /* ignore */
  }
}

// giữ Cua luôn nằm trong màn hình
function clampPos(x: number, y: number, w: number, h: number): Pos {
  return {
    x: Math.min(Math.max(x, EDGE), Math.max(EDGE, window.innerWidth - w - EDGE)),
    y: Math.min(Math.max(y, EDGE), Math.max(EDGE, window.innerHeight - h - EDGE)),
  };
}

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function CrabMascot({ event }: Props) {
  const { theme } = useExamTheme();

  const [mood, setMood] = useState<Mood>("idle");
  const [line, setLine] = useState<Line>(IDLE_LINES[0]);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(readMuted);
  const [streak, setStreak] = useState(0);

  // vị trí Cua (null = góc phải dưới mặc định)
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<Pos | null>(readPos);
  const posRef = useRef(pos);
  // eslint-disable-next-line react-hooks/refs
  posRef.current = pos;
  const [place, setPlace] = useState({ above: true, left: 0, width: BUBBLE_WIDTH });
  const dragRef = useRef<{ px: number; py: number; ox: number; oy: number; moved: boolean } | null>(null);
  const movedRef = useRef(false);

  // bong bóng thoại tự chọn hướng (trên/dưới, lệch trái/phải) để không bị tràn màn hình
  const updatePlace = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.min(BUBBLE_WIDTH, window.innerWidth - EDGE * 2);
    const centerX = r.left + r.width / 2;
    const absLeft = Math.min(
      Math.max(centerX - width / 2, EDGE),
      window.innerWidth - width - EDGE,
    );
    setPlace({
      above: r.top + r.height / 2 > window.innerHeight / 2,
      left: absLeft - r.left,
      width,
    });
  }, []);

  useLayoutEffect(() => {
    updatePlace();
  }, [pos, open, updatePlace]);

  // đổi kích thước cửa sổ -> kéo Cua lại vào trong màn hình
  useEffect(() => {
    const fit = () => {
      const r = wrapRef.current?.getBoundingClientRect();
      const cur = posRef.current;
      if (r && cur) setPos(clampPos(cur.x, cur.y, r.width, r.height));
      updatePlace();
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [updatePlace]);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    dragRef.current = { px: e.clientX, py: e.clientY, ox: r.left, oy: r.top, moved: false };
    movedRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!d || !r) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    movedRef.current = true;
    setPos(clampPos(d.ox + dx, d.oy + dy, r.width, r.height));
  };

  const endDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (d?.moved) savePos(posRef.current);
  };

  const resetPos = () => {
    setPos(null);
    savePos(null);
  };

  const mutedRef = useRef(muted);
  // eslint-disable-next-line react-hooks/refs
  mutedRef.current = muted;

  const lastLineRef = useRef<Line | null>(null);
  const processedRef = useRef(0);
  const correctStreakRef = useRef(0);
  const wrongStreakRef = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moodTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // chọn ngẫu nhiên, không lặp lại đúng câu vừa nói
  const pick = useCallback((list: Line[]) => {
    const pool = list.length > 1 ? list.filter((l) => l !== lastLineRef.current) : list;
    const next = pool[Math.floor(Math.random() * pool.length)];
    lastLineRef.current = next;
    return next;
  }, []);

  const showBubble = useCallback(() => {
    setOpen(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpen(false), BUBBLE_VISIBLE_MS);
  }, []);

  // Phản ứng mỗi khi bạn trả lời xong một câu
  useEffect(() => {
    if (!event || processedRef.current === event.id) return;
    processedRef.current = event.id;

    let next: Line;
    if (event.correct) {
      correctStreakRef.current += 1;
      wrongStreakRef.current = 0;
      next = CORRECT_STREAK[correctStreakRef.current] ?? pick(CORRECT_LINES);
    } else {
      wrongStreakRef.current += 1;
      correctStreakRef.current = 0;
      next = WRONG_STREAK[wrongStreakRef.current] ?? pick(WRONG_LINES);
    }
    setStreak(correctStreakRef.current);
    setLine(next);

    setMood(event.correct ? "correct" : "wrong");
    if (moodTimer.current) clearTimeout(moodTimer.current);
    moodTimer.current = setTimeout(() => setMood("idle"), MOOD_RESET_MS);

    if (!mutedRef.current) showBubble();
  }, [event, pick, showBubble]);

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (moodTimer.current) clearTimeout(moodTimer.current);
    },
    [],
  );

  const onCrabClick = () => {
    if (movedRef.current) {
      movedRef.current = false; // vừa kéo xong, không tính là bấm
      return;
    }
    setLine(pick(IDLE_LINES));
    showBubble();
  };

  const toggleMuted = () => {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem(MUTE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  const moodClass =
    mood === "correct" ? "pop-correct" : mood === "wrong" ? "shake-wrong" : "";

  return (
    <div
      ref={wrapRef}
      style={pos ? { left: pos.x, top: pos.y } : undefined}
      className={`fixed z-40 h-16 w-16 select-none lg:h-20 lg:w-20 ${
        pos ? "" : "bottom-24 right-3 lg:bottom-6 lg:right-6"
      }`}
    >
      {open && (
        <div
          className={`fade-up absolute z-10 rounded-2xl p-4 ${
            place.above ? "bottom-full mb-3" : "top-full mt-3"
          } ${theme.modal}`}
          style={{ width: place.width, left: place.left }}
          role="status"
          aria-live="polite"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.accent}`}>
              Cua Bác Học
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng lời thoại"
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm transition ${theme.ghostBtn}`}
            >
              ✕
            </button>
          </div>

          <div className="flex items-start gap-2">
            <span className="pt-0.5 text-2xl leading-none">{line.emoji}</span>
            <p className={`text-sm leading-snug ${theme.text}`}>{line.text}</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toggleMuted}
              className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${theme.ghostBtn}`}
            >
              {muted ? "🔔 Cho Cua nói lại" : "🔇 Bảo Cua câm miệng"}
            </button>
            {pos && (
              <button
                type="button"
                onClick={resetPos}
                className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${theme.ghostBtn}`}
              >
                📍 Về góc
              </button>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onCrabClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label="Cua Bác Học - kéo để di chuyển, bấm để nghe động viên"
        title="Kéo để di chuyển, bấm để nghe động viên!"
        className="relative block h-full w-full cursor-grab touch-none transition-transform duration-300 hover:scale-105 active:scale-95 active:cursor-grabbing focus:outline-none"
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full border-2 border-white/60 bg-gradient-to-tr from-red-400/20 via-amber-400/25 to-zinc-400/20 p-1.5 shadow-xl backdrop-blur-sm ${moodClass}`}
        >
          <CrabSvg mood={mood} />
        </div>

        {streak >= 2 && (
          <span className="absolute -right-1 -top-1 animate-pulse rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
            🔥{streak}
          </span>
        )}
      </button>
    </div>
  );
}

function CrabSvg({ mood }: { mood: Mood }) {
  return (
    <svg
      className={`h-full w-full drop-shadow-md ${mood === "idle" ? "animate-bounce" : ""}`}
      style={mood === "idle" ? { animationDuration: "2.4s" } : undefined}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="60" cy="108" rx="35" ry="6" fill="#1a1b22" fillOpacity="0.1" />
      {/* chân */}
      <path d="M22 68C14 74 12 86 16 92C18 95 24 93 28 85C30 81 30 74 27 70Z" fill="#da3437" />
      <path d="M98 68C106 74 108 86 104 92C102 95 96 93 92 85C90 81 90 74 93 70Z" fill="#da3437" />
      <path d="M16 52C6 58 6 70 12 76C15 79 20 76 22 70C24 64 22 56 19 54Z" fill="#e04a44" />
      <path d="M104 52C114 58 114 70 108 76C105 79 100 76 98 70C96 64 98 56 101 54Z" fill="#e04a44" />
      {/* càng trái */}
      <path d="M38 52C32 46 22 45 18 52C14 59 18 68 28 66C36 64 39 57 38 52Z" fill="#c92a2e" />
      <path d="M15 36C9 28 5 16 14 12C24 8 30 20 28 29C28 32 36 29 40 22C43 17 48 18 47 24C46 32 38 41 30 42C23 43 19 40 15 36Z" fill="#da3437" />
      <path d="M25 22C24 18 19 16 16 18C13 20 13 24 16 26C19 28 24 26 25 22Z" fill="#ff8a80" />
      {/* càng phải */}
      <path d="M82 52C88 46 98 45 102 52C106 59 102 68 92 66C84 64 81 57 82 52Z" fill="#c92a2e" />
      <path d="M105 36C111 28 115 16 106 12C96 8 90 20 92 29C92 32 84 29 80 22C77 17 72 18 73 24C74 32 82 41 90 42C97 43 101 40 105 36Z" fill="#da3437" />
      <path d="M95 22C96 18 101 16 104 18C107 20 107 24 104 26C101 28 96 26 95 22Z" fill="#ff8a80" />
      {/* thân */}
      <ellipse cx="60" cy="68" rx="36" ry="26" fill="#da3437" />
      <ellipse cx="60" cy="73" rx="27" ry="18" fill="#f59e0b" />
      {/* mắt */}
      <ellipse cx="45" cy="38" rx="8.5" ry="10" fill="#fbf8ff" stroke="#da3437" strokeWidth="2" />
      <circle cx="46" cy="38" r="5.5" fill="#1a1b22" />
      <circle cx="48" cy="36" r="2.2" fill="#ffffff" />
      <circle cx="44" cy="40" r="1" fill="#ffffff" />
      <ellipse cx="75" cy="38" rx="8.5" ry="10" fill="#fbf8ff" stroke="#da3437" strokeWidth="2" />
      <circle cx="74" cy="38" r="5.5" fill="#1a1b22" />
      <circle cx="76" cy="36" r="2.2" fill="#ffffff" />
      <circle cx="72" cy="40" r="1" fill="#ffffff" />
      {/* má hồng */}
      <ellipse cx="36" cy="66" rx="4.5" ry="2.5" fill="#ff8a80" />
      <ellipse cx="84" cy="66" rx="4.5" ry="2.5" fill="#ff8a80" />
      {/* kính */}
      <circle cx="45" cy="38" r="9.5" fill="none" stroke="#855300" strokeWidth="2" />
      <circle cx="75" cy="38" r="9.5" fill="none" stroke="#855300" strokeWidth="2" />
      <path d="M54.5 38L65.5 38" stroke="#855300" strokeWidth="2" strokeLinecap="round" />
      {/* miệng đổi theo tâm trạng */}
      {mood === "correct" && (
        <path d="M52 68C52 79 68 79 68 68Z" stroke="#855300" strokeWidth="2.5" strokeLinejoin="round" fill="#ffffff" />
      )}
      {mood === "wrong" && (
        <>
          <path d="M61 71C61 78 70 78 70 71Z" fill="#ff8a80" stroke="#855300" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M53 72C57 68.5 63 68.5 67 72" stroke="#855300" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {mood === "idle" && (
        <path d="M54 70C54 74 66 74 66 70" stroke="#855300" strokeWidth="2.5" strokeLinecap="round" fill="#ffffff" />
      )}
      {/* mũ */}
      <path d="M60 48L55 44L60 42L65 44Z" fill="#f59e0b" />
      <circle cx="60" cy="43" r="2" fill="#ffdcc3" />
    </svg>
  );
}