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

- [Vì sao chọn Quiz Cùng T](#-vì-sao-chọn-quiz-cùng-t)
- [Tính năng nổi bật](#-tính-năng-nổi-bật)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Bắt đầu nhanh](#-bắt-đầu-nhanh)
- [Scripts](#-scripts)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Phím tắt khi làm bài](#-phím-tắt-khi-làm-bài)
- [ESLint & TypeScript](#-eslint--typescript)
- [Định hướng phát triển](#-định-hướng-phát-triển)
- [CI / Triển khai](#-ci--triển-khai)
- [Đóng góp](#-đóng-góp)

<br/>

## 💡 Vì sao chọn Quiz Cùng T

|                             |                                                                          |
| --------------------------- | ------------------------------------------------------------------------ |
| ⚡ **Siêu nhẹ**             | Khởi động tức thì nhờ Vite, không phụ thuộc backend.                     |
| 📦 **Dữ liệu dạng TS**      | Ngân hàng câu hỏi lưu bằng file `.ts` — dễ đọc, dễ chỉnh, dễ import Git. |
| 💾 **Tự lưu tiến độ**       | Trạng thái làm bài được lưu cục bộ (persist), quay lại là làm tiếp.      |
| ⌨️ **Điều hướng bằng phím** | Mũi tên để chuyển câu, số `1–9` để chọn đáp án.                          |
| 🎨 **Giao diện riêng biệt** | Theme vàng-đen glassmorphism, không rập khuôn theo mẫu có sẵn.           |

<br/>

## 🚀 Tính năng nổi bật

- 🖤 Giao diện tối hiện đại, điểm nhấn gradient **vàng (`amber`/`yellow`)**.
- 💡 Nút **Hint** — gợi ý trước khi trả lời mà không lộ đáp án.
- ✅ Hiển thị đáp án đúng & giải thích ngay sau khi chọn.
- 🔁 **Reset** toàn bộ câu trả lời của một môn (có xác nhận trước khi xoá).
- ❌➡️✅ Chế độ **"Làm lại câu sai"** — chỉ ôn đúng những câu đã sai.
- 📝 Ghi chú học tập riêng cho từng môn, tự động lưu trên trình duyệt.
- ⌨️ Hỗ trợ phím tắt điều hướng nhanh, không cần rời tay khỏi bàn phím.
- 🖱️ Hiệu ứng con trỏ chuột phát sáng (cursor glow) theo phong cách Lumora.

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
cd quiz-cung-t

# 2. Cài đặt phụ thuộc
npm install
# hoặc: yarn

# 3. Chạy môi trường phát triển
npm run dev
# hoặc: yarn dev
```

Sau đó mở trình duyệt tại địa chỉ được Vite in ra (mặc định `http://localhost:5173`).

<br/>

## 📜 Scripts

| Lệnh              | Mô tả                                                |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Chạy server phát triển kèm Hot Module Replacement    |
| `npm run build`   | Kiểm tra kiểu (`tsc -b`) rồi đóng gói cho production |
| `npm run preview` | Xem trước bản build production                       |
| `npm run lint`    | Chạy ESLint kiểm tra chất lượng code                 |

<br/>

## 🗂 Cấu trúc thư mục

```text
src/
├── components/       # CursorGlow và các component tái sử dụng
├── pages/            # HomePage, ExamPage, Resultspage
├── data/subjects/    # Ngân hàng câu hỏi theo từng môn (.ts)
├── store/            # Zustand store: exam state, quiz state
├── types/            # Kiểu dữ liệu Question, Subject
└── index.css         # Design tokens + theme vàng-đen, hiệu ứng con trỏ
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

## 🧹 ESLint & TypeScript

Dự án đã cấu hình sẵn ESLint. Để bật thêm các rule _type-aware_:

1. Cài đặt: `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`.
2. Trỏ `parserOptions.project` tới `tsconfig.app.json` để bật rule type-checked.
3. Một số rule nên bật: `react-hooks/exhaustive-deps`, `react-hooks/rules-of-hooks`, `@typescript-eslint/no-unused-expressions`.

> Lưu ý: không gọi `setState` trực tiếp trong thân `useEffect` — hãy đưa vào event handler hoặc dùng `ref`.

<br/>

## 🧭 Định hướng phát triển

- [✅] Chế độ **Dark/Light toggle**, lưu lựa chọn vào `localStorage`.
- [ ] Hiệu ứng **confetti** khi hoàn thành bài với điểm cao.
- [ ] Chế độ **thi có giờ** (timer theo câu hoặc toàn bài).
- [ ] **Export kết quả** ra CSV/PDF.
- [ ] Tải ngân hàng câu hỏi từ JSON/REST API, lazy-load theo môn.
- [ ] Hỗ trợ câu hỏi multi-select hiển thị dạng checkbox.

<br/>

## 🌐 CI / Triển khai

- **CI gợi ý:** GitHub Actions với các job `lint` → `build`.
- **Hosting:**
  - **Vercel** — tự động deploy khi push nhánh `main`.
  - **Netlify / GitHub Pages** — build bằng `npm run build`, publish thư mục `dist`.

<br/>

## 🤝 Đóng góp

1. Fork repo, tạo nhánh `feature/ten-tinh-nang`.
2. Code + kiểm thử thay đổi của bạn.
3. Mở Pull Request kèm mô tả rõ ràng, ảnh chụp màn hình (nếu có UI thay đổi).
4. Đội ngũ sẽ review và merge sớm nhất có thể.

<br/>

<div align="center">

Made with 🖤 & 💛 — **Quiz Cùng T**

</div>
