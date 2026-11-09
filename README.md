<div align="center">

# ✨ Quiz Cùng T

### Nền tảng ôn luyện trắc nghiệm — nhẹ, nhanh, tông vàng-đen hiện đại

[![React](https://img.shields.io/badge/React-19-0d1117?style=for-the-badge&logo=react&logoColor=FACC15)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-0d1117?style=for-the-badge&logo=typescript&logoColor=FACC15)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-0d1117?style=for-the-badge&logo=vite&logoColor=FACC15)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-0d1117?style=for-the-badge&logo=tailwindcss&logoColor=FACC15)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-store-0d1117?style=for-the-badge&logoColor=FACC15)](https://github.com/pmndrs/zustand)

</div>

<br/>

> Quiz Cùng T là bộ công cụ nhỏ gọn để **tạo và làm bài kiểm tra trắc nghiệm trực tuyến**, tối ưu cho sinh viên tự ôn tập và giảng viên muốn triển khai nhanh một ngân hàng câu hỏi. Giao diện lấy cảm hứng từ phong cách _dark UI_ hiện đại, đan xen **vàng kim × đen huyền**, kèm hiệu ứng con trỏ chuột mượt mà.

<br/>

## 📚 Mục lục

- [✨ Quiz Cùng T](#-quiz-cùng-t)
    - [Nền tảng ôn luyện trắc nghiệm — nhẹ, nhanh, tông vàng-đen hiện đại](#nền-tảng-ôn-luyện-trắc-nghiệm--nhẹ-nhanh-tông-vàng-đen-hiện-đại)
  - [📚 Mục lục](#-mục-lục)
  - [� Công nghệ sử dụng](#-công-nghệ-sử-dụng)
  - [⚙️ Bắt đầu nhanh](#️-bắt-đầu-nhanh)
  - [☁️ Thiết lập Supabase](#️-thiết-lập-supabase)
  - [📜 Scripts](#-scripts)
  - [🗂 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
  - [⌨️ Phím tắt khi làm bài](#️-phím-tắt-khi-làm-bài)

<br/>

## 🛠 Công nghệ sử dụng

- **React 19** + **TypeScript** — kiến trúc component rõ ràng, an toàn kiểu dữ liệu.
- **Vite 8** — dev server cực nhanh, HMR tức thì.
- **Tailwind CSS v4** (`@tailwindcss/vite`) — utility-first, dễ tuỳ biến theme.
- **Zustand** — quản lý state gọn nhẹ, có persist vào `localStorage`.
- **React Router** — điều hướng giữa Trang chủ / Làm bài / Kết quả.

<br/>

## ⚙️ Bắt đầu nhanh

```bash
# 1. Clone dự án
git clone https://github.com/TruonTran/lean_quiz.git
cd lean_quiz

# 2. Cài đặt phụ thuộc
npm install
# hoặc: yarn

# 3. Cấu hình Supabase (xem mục "Thiết lập Supabase" bên dưới)
cp .env.example .env.local   # rồi điền URL + anon key

# 4. Chạy môi trường phát triển
npm run dev
# hoặc: yarn dev
```

Sau đó mở trình duyệt tại địa chỉ được Vite in ra (mặc định `http://localhost:5173`).

<br/>

## ☁️ Thiết lập Supabase

Câu hỏi và tóm tắt kiến thức nằm trong Supabase. **Ai cũng đọc được, chỉ admin mới ghi được** (do Row Level Security trong DB chặn, không phải do giao diện). Ghi chú và đáp án vẫn lưu trên trình duyệt của từng người.

1. **Tạo project** tại [supabase.com](https://supabase.com).
2. **Tạo bảng + phân quyền:** mở *SQL Editor*, dán toàn bộ `supabase/schema.sql` rồi chạy.
3. **Tạo tài khoản admin:** *Authentication → Users → Add user* (email + mật khẩu của bạn). Rồi vào *Authentication → Sign In / Providers* và **tắt "Allow new users to sign up"** để không ai khác tạo được tài khoản.
4. **Cấp quyền admin** cho chính bạn (SQL Editor, đổi email):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'email-cua-ban@example.com';
   ```
5. **Điền khoá cho web:** `cp .env.example .env.local`, điền `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` (*Project Settings → API*). Khoá anon/publishable được phép lộ ở web.
6. **Nạp câu hỏi lên DB:**
   ```bash
   npm run db:dry-run                     # kiểm tra dữ liệu trước
   cp .env.migrate.example .env.migrate.local   # điền SUPABASE_URL + SERVICE_ROLE_KEY
   npm run db:migrate
   ```
   Script an toàn khi chạy lại: mặc định **không ghi đè** dòng đã có (giữ chỉnh sửa của admin). Dùng `-- --overwrite` nếu muốn ép ghi đè.
7. **Triển khai (Vercel):** thêm hai biến `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` trong *Project → Settings → Environment Variables*.

> ⚠️ `SERVICE_ROLE_KEY` bỏ qua mọi phân quyền: chỉ dùng trong `.env.migrate.local`, **không** commit, **không** đưa lên Vercel, **không** đưa vào code web.

**Chỉnh sửa tóm tắt kiến thức:** đăng nhập tại `/admin`, rồi vào *Tóm tắt kiến thức → chọn môn* sẽ thấy các nút thêm / sửa / xoá / đổi thứ tự.

> Sau khi migrate xong, **Supabase là nguồn dữ liệu thật**. Các file trong `src/data/subjects/` chỉ còn là bản sao lưu ban đầu.

<br/>

## 📜 Scripts

| Lệnh              | Mô tả                                                |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Chạy server phát triển kèm Hot Module Replacement    |
| `npm run build`   | Kiểm tra kiểu (`tsc -b`) rồi đóng gói cho production |
| `npm run preview` | Xem trước bản build production                       |
| `npm run lint`    | Chạy ESLint kiểm tra chất lượng code                 |
| `npm run db:dry-run` | Kiểm tra dữ liệu `src/data/subjects` (không cần kết nối) |
| `npm run db:migrate` | Đẩy câu hỏi từ file `.ts` lên Supabase               |

<br/>

## 🗂 Cấu trúc thư mục

```text
src/
├── components/       # CursorGlow và các component tái sử dụng
├── pages/            # HomePage, ExamPage, Resultspage
├── data/api.ts       # Đọc/ghi Supabase;  hooks.ts: react-query hooks
├── data/subjects/    # Dữ liệu gốc (seed) — CHỈ script migrate dùng, app không import
├── lib/supabase.ts   # Supabase client
├── store/            # Zustand store: exam state, quiz state
├── types/            # Kiểu dữ liệu Question, Subject
└── index.css         # Design tokens + theme vàng-đen, hiệu ứng con trỏ
supabase/schema.sql   # Bảng + RLS (chạy trong SQL Editor)
scripts/              # migrate-to-supabase.ts
```

<br/>

## ⌨️ Phím tắt khi làm bài

| Phím    | Chức năng                        |
| ------- | -------------------------------- |
| `←`     | Câu trước                        |
| `→`     | Câu tiếp theo                    |
| `1`–`9` | Chọn đáp án tương ứng A, B, C... |
| `Esc`   | Đóng hộp thoại xác nhận reset    |

<br/>

<div align="center">

Made with 🖤 & 💛 — **Quiz Cùng T**

</div>
