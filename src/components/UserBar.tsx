import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { useMyProfile } from "../data/hooks";

/** Thanh nhỏ ở góc trái trang chủ: trạng thái đăng nhập + lối vào Thành tích. */
export default function UserBar() {
  const session = useAuthStore((s) => s.session);
  const ready = useAuthStore((s) => s.ready);
  const profile = useMyProfile();
  if (!ready) return <div className="mb-6 h-9" />;

  const chip =
    "rounded-full border border-yellow-400/25 bg-white/5 px-4 py-1.5 text-sm font-semibold text-yellow-200 transition hover:bg-white/10";

  if (!session) {
    return (
      <div className="mb-6 flex flex-wrap items-center gap-2 self-start">
        <Link to="/login" className={chip}>Đăng nhập</Link>
        <Link to="/login?mode=register" className={chip}>Đăng ký</Link>
      </div>
    );
  }

  // Không dùng email / tên Google làm tên chào, vì hồ sơ mới là tên người dùng đã chọn
  const name = profile.data?.displayName ?? "bạn";

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 self-start">
      <span className="text-sm text-zinc-400">
        👋 Xin chào, <span className="font-semibold text-yellow-200">{name}</span>
      </span>
      <Link to="/achievements" className={chip}>🏆 Thành tích</Link>
      <button onClick={() => supabase.auth.signOut()} className={chip}>Đăng xuất</button>
    </div>
  );
}
