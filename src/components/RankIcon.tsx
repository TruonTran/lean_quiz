const ICON: Record<number, string> = {
  1: "/ranks/rank-1.png",
  2: "/ranks/rank-2.png",
  3: "/ranks/rank-3.png",
};

export default function RankIcon({ rank, size = 32 }: { rank: number; size?: number }) {
  const src = ICON[rank];
  if (!src) {
    return <span className="font-mono-brand inline-block w-8 text-center text-zinc-400">{rank}</span>;
  }
  return (
    <img
      src={src}
      alt={`Hạng ${rank}`}
      width={size}
      height={size}
      draggable={false}
      className="inline-block select-none"
      style={{ width: size, height: size }}
    />
  );
}
