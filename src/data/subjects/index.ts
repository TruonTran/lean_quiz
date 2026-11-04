/**
 * DỮ LIỆU GỐC (seed) — CHỈ dùng cho script `npm run db:migrate`.
 * App KHÔNG được import file này: nguồn dữ liệu thật là Supabase.
 * (Nhờ vậy cả bộ đề không bị nhét vào bundle của web.)
 */
import type { Subject } from "../../types/Subject";

import { mln111 } from "./mln111";
import { mln122 } from "./mln122";
import { prm393 } from "./prm393";
import { mln131 } from "./mln131";

export const subjects: Subject[] = [mln111, mln122, prm393, mln131];
