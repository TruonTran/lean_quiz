import type { WeatherKind, WeatherStrength } from "./modes";
export type Rng = () => number;

export interface Effect {
  resize(w: number, h: number): void;
  update(dt: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
  count(): number;
}

const TAU = Math.PI * 2;
const between = (rng: Rng, a: number, b: number) => a + rng() * (b - a);
const density = (w: number, h: number) =>
  Math.min(1.6, Math.max(0.5, (w * h) / (1280 * 720))) * (w < 640 ? 0.6 : 1);

type Flake = { x: number; y: number; r: number; vy: number; phase: number; amp: number };

function snow(strong: boolean, w: number, h: number, dark: boolean, rng: Rng): Effect {
  let W = w;
  let H = h;
  let t = 0;
  const flakes: Flake[] = [];
  const target = () => Math.round((strong ? 200 : 70) * density(W, H));
  const make = (initial: boolean): Flake => {
    const r = between(rng, 1, 3.6);
    return {
      x: rng() * W,
      y: initial ? rng() * H : -10 - rng() * 40,
      r,
      vy: (18 + r * 10) * (strong ? 1.4 : 1),
      phase: rng() * TAU,
      amp: between(rng, 8, 26),
    };
  };
  const fit = () => {
    while (flakes.length < target()) flakes.push(make(true));
    flakes.length = Math.min(flakes.length, target());
  };
  fit();

  return {
    resize(nw, nh) {
      W = nw;
      H = nh;
      fit();
    },
    update(dt) {
      t += dt;
      const drift = strong ? 55 * (1 + 0.5 * Math.sin(t * 0.6)) : 10; // dày: gió thổi lệch và đổi nhịp
      for (const f of flakes) {
        f.phase += dt * 1.2;
        f.y += f.vy * dt;
        f.x += (drift + Math.sin(f.phase) * f.amp) * dt;
        if (f.y > H + 10) Object.assign(f, make(false));
        if (f.x > W + 10) f.x = -10;
        else if (f.x < -10) f.x = W + 10;
      }
    },
    draw(ctx) {
      ctx.fillStyle = dark ? "rgba(255,255,255,0.85)" : "rgba(120,150,190,0.85)";
      ctx.beginPath();
      for (const f of flakes) {
        ctx.moveTo(f.x + f.r, f.y);
        ctx.arc(f.x, f.y, f.r, 0, TAU);
      }
      ctx.fill();
    },
    count: () => flakes.length,
  };
}

/* ------------------------------------- mưa ------------------------------------- */
type Drop = { x: number; y: number; len: number; v: number };

function rain(strong: boolean, w: number, h: number, dark: boolean, rng: Rng): Effect {
  let W = w;
  let H = h;
  let t = 0;
  let slant = strong ? 0.38 : 0.08;
  const drops: Drop[] = [];
  const target = () => Math.round((strong ? 480 : 140) * density(W, H));
  const make = (initial: boolean): Drop => ({
    // sinh lệch sang trái để mưa xiên vẫn phủ kín màn hình
    x: between(rng, -H * 0.5, W),
    y: initial ? rng() * H : -rng() * 60,
    len: strong ? between(rng, 18, 36) : between(rng, 10, 22),
    v: strong ? between(rng, 1000, 1500) : between(rng, 600, 800),
  });
  const fit = () => {
    while (drops.length < target()) drops.push(make(true));
    drops.length = Math.min(drops.length, target());
  };
  fit();

  return {
    resize(nw, nh) {
      W = nw;
      H = nh;
      fit();
    },
    update(dt) {
      t += dt;
      // mưa to có gió giật: góc xiên đổi theo nhịp
      slant = strong ? 0.38 + 0.14 * Math.sin(t * 0.8) : 0.08;
      for (const d of drops) {
        d.y += d.v * dt;
        d.x += d.v * slant * dt;
        if (d.y - d.len > H || d.x - d.len * slant > W + 20) Object.assign(d, make(false));
      }
    },
    draw(ctx) {
      if (strong) {
        ctx.fillStyle = dark ? "rgba(10,20,40,0.12)" : "rgba(40,60,90,0.10)"; // trời âm u
        ctx.fillRect(0, 0, W, H);
      }
      ctx.strokeStyle = dark ? "rgba(190,210,240,0.5)" : "rgba(60,95,150,0.5)";
      ctx.lineWidth = strong ? 1.4 : 1;
      ctx.beginPath();
      for (const d of drops) {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * slant, d.y - d.len);
      }
      ctx.stroke();
    },
    count: () => drops.length,
  };
}

/* ------------------------------------- gió -------------------------------------- */
type Streak = { x: number; y: number; len: number; v: number; a: number };
type Leaf = { x: number; y: number; size: number; rot: number; vr: number; v: number; phase: number; color: string };
const LEAF_COLORS = ["#d98c2b", "#b5651d", "#8a9a3b", "#c2410c"];

function wind(strong: boolean, w: number, h: number, dark: boolean, rng: Rng): Effect {
  let W = w;
  let H = h;
  const streaks: Streak[] = [];
  const leaves: Leaf[] = [];
  const nStreak = () => Math.round((strong ? 50 : 14) * density(W, H));
  const nLeaf = () => Math.round((strong ? 26 : 6) * density(W, H));
  const makeStreak = (initial: boolean): Streak => {
    const len = between(rng, 60, 200);
    return {
      x: initial ? rng() * W : -len - rng() * W * 0.3,
      y: rng() * H,
      len,
      v: strong ? between(rng, 700, 1200) : between(rng, 250, 400),
      a: between(rng, 0.12, 0.3),
    };
  };
  const makeLeaf = (initial: boolean): Leaf => ({
    x: initial ? rng() * W : -20 - rng() * 60,
    y: rng() * H,
    size: between(rng, 5, 10),
    rot: rng() * TAU,
    vr: between(rng, -4, 4),
    v: strong ? between(rng, 260, 520) : between(rng, 70, 140),
    phase: rng() * TAU,
    color: LEAF_COLORS[Math.floor(rng() * LEAF_COLORS.length) % LEAF_COLORS.length],
  });
  const fit = () => {
    while (streaks.length < nStreak()) streaks.push(makeStreak(true));
    streaks.length = Math.min(streaks.length, nStreak());
    while (leaves.length < nLeaf()) leaves.push(makeLeaf(true));
    leaves.length = Math.min(leaves.length, nLeaf());
  };
  fit();

  return {
    resize(nw, nh) {
      W = nw;
      H = nh;
      fit();
    },
    update(dt) {
      for (const s of streaks) {
        s.x += s.v * dt;
        if (s.x > W + 20) Object.assign(s, makeStreak(false));
      }
      for (const l of leaves) {
        l.phase += dt * 2;
        l.x += l.v * dt;
        l.y += (Math.sin(l.phase) * (strong ? 90 : 35) + 12) * dt;
        l.rot += l.vr * dt;
        if (l.x > W + 20 || l.y > H + 20) Object.assign(l, makeLeaf(false));
      }
    },
    draw(ctx) {
      ctx.lineWidth = 1;
      for (const s of streaks) {
        ctx.strokeStyle = dark ? `rgba(255,255,255,${s.a})` : `rgba(70,100,140,${s.a})`;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len, s.y + s.len * 0.02);
        ctx.stroke();
      }
      for (const l of leaves) {
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rot);
        ctx.fillStyle = l.color;
        ctx.globalAlpha *= 0.85;
        ctx.beginPath();
        ctx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, TAU);
        ctx.fill();
        ctx.restore();
      }
    },
    count: () => streaks.length + leaves.length,
  };
}

/* ------------------------------------- nắng ------------------------------------- */
type Mote = { x: number; y: number; r: number; phase: number; vy: number };

function sun(strong: boolean, w: number, h: number, _dark: boolean, rng: Rng): Effect {
  let W = w;
  let H = h;
  let rot = 0;
  const motes: Mote[] = [];
  const target = () => Math.round((strong ? 40 : 22) * density(W, H));
  const make = (initial: boolean): Mote => ({
    x: rng() * W,
    y: initial ? rng() * H : H + 10,
    r: between(rng, 1, 2.6),
    phase: rng() * TAU,
    vy: -between(rng, 6, 14),
  });
  const fit = () => {
    while (motes.length < target()) motes.push(make(true));
    motes.length = Math.min(motes.length, target());
  };
  fit();

  return {
    resize(nw, nh) {
      W = nw;
      H = nh;
      fit();
    },
    update(dt) {
      rot += dt * 0.04;
      for (const m of motes) {
        m.phase += dt * 1.5;
        m.y += m.vy * dt;
        m.x += Math.sin(m.phase * 0.5) * 6 * dt;
        if (m.y < -10) Object.assign(m, make(false));
      }
    },
    draw(ctx) {
      const cx = W * 0.88;
      const cy = -H * 0.04;
      const R = Math.max(W, H) * (strong ? 1 : 0.8);

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      g.addColorStop(0, `rgba(255,214,102,${strong ? 0.55 : 0.35})`);
      g.addColorStop(0.35, `rgba(255,200,80,${strong ? 0.25 : 0.14})`);
      g.addColorStop(1, "rgba(255,190,70,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // tia nắng quay rất chậm
      ctx.fillStyle = `rgba(255,236,170,${strong ? 0.14 : 0.07})`;
      for (let i = 0; i < 9; i++) {
        const a = rot + (i * TAU) / 9;
        const s = 0.07;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a - s) * R * 1.3, cy + Math.sin(a - s) * R * 1.3);
        ctx.lineTo(cx + Math.cos(a + s) * R * 1.3, cy + Math.sin(a + s) * R * 1.3);
        ctx.closePath();
        ctx.fill();
      }

      // hạt bụi sáng lơ lửng
      for (const m of motes) {
        ctx.fillStyle = `rgba(255,240,190,${0.3 + 0.3 * Math.sin(m.phase)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, TAU);
        ctx.fill();
      }
    },
    count: () => motes.length,
  };
}

export function createEffect(
  kind: WeatherKind,
  strength: WeatherStrength,
  w: number,
  h: number,
  dark: boolean,
  rng: Rng = Math.random,
): Effect {
  const strong = strength === "strong";
  switch (kind) {
    case "snow":
      return snow(strong, w, h, dark, rng);
    case "rain":
      return rain(strong, w, h, dark, rng);
    case "wind":
      return wind(strong, w, h, dark, rng);
    case "sun":
      return sun(strong, w, h, dark, rng);
  }
}
