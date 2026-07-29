# Quiz Platform (Lean Quiz)

> Một nền tảng quiz nhẹ, nhanh và dễ tuỳ chỉnh — giao diện vàng kim (amber) hiện đại, thân thiện cho việc học tập và kiểm tra.

![Hero placeholder](./docs/hero-placeholder.png)

Tổng quan

- Mục tiêu: cung cấp bộ công cụ nhỏ để tạo và làm bài kiểm tra trực tuyến (multiple-choice), dễ mở rộng cho giảng viên hoặc sinh viên.
- Công nghệ chính: React + TypeScript + Vite, Tailwind CSS, Zustand (store), ESLint + TypeScript linting.
- Tông màu giao diện mặc định: vàng kim (amber) — gợi cảm giác sang trọng, ấm và chuyên nghiệp.

Sự khác biệt (Why this project)

- Siêu nhẹ, khởi động nhanh với Vite.
- Dữ liệu câu hỏi lưu dưới dạng tệp TS — dễ chỉnh sửa, dễ import.
- Lưu trạng thái làm bài (persist) để học viên có thể quay lại tiếp tục.
- Hỗ trợ nhanh bằng phím tắt (← →, 1..9) và gợi ý (Hint) trước khi trả lời.

Tính năng

- Giao diện hiện đại, theme vàng kim (amber) mặc định.
- Hint có thể bật trước khi trả lời (không tiết lộ đáp án).
- Hiển thị kết quả & giải thích sau khi trả lời.
- Reset toàn bộ câu trả lời cho 1 môn (với xác nhận).
- Hỗ trợ keyboard shortcuts để điều hướng và chọn đáp án.
- Lưu cục bộ bằng localStorage (qua zustand persist).

Bắt đầu nhanh (Local)

1. Clone:
   git clone [git@github.com](https://github.com/TruonTran/lean_quiz.git):<owner>/quiz-platform<repo>.git
   cd quiz-platform

2. Cài đặt:
   npm install

   # hoặc

   yarn

3. Chạy dev:
   npm run dev

   # hoặc

   yarn dev

4. Mở trình duyệt: http://localhost:5173 (hoặc theo output của Vite)

Scripts tiêu biểu

- dev: chạy server phát triển với HMR
- build: đóng gói cho production
- preview: preview bản build
- lint: chạy ESLint (tham khảo cấu hình ở phần bên dưới)

ESLint / TypeScript — lời khuyên

- Mặc định template có ESLint. Để bật rules type-aware (nhiều rule hay), hãy cấu hình eslint để dùng project-aware rules:
  - cài: eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin
  - bật `parserOptions.project` trỏ tới tsconfig (ví dụ `tsconfig.app.json`) để bật rule type-checked.
- Một số rule hữu ích: react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/no-unused-expressions.
- Nếu rule cảnh báo về "setState in effect" — đừng gọi setState trực tiếp trong effect body; thay bằng event handlers, hoặc dùng refs.

Gợi ý UI / UX hiện đại (gợi ý để cải tiến)

- Theme:
  - Thêm biến màu CSS (tailwind config) để dễ đổi theme (amber, dark, brand color).
  - Hỗ trợ Dark Mode: toggle lưu vào `localStorage`.
- Micro-interactions:
  - Thêm animation nhẹ cho reveal hint/answer (fade + slide).
  - Thêm confetti/celebration khi trả lời đúng (tùy chọn).
- Accessibility:
  - Đảm bảo keyboard navigation (tabIndex, aria-labels).
  - Contrast ratio đảm bảo cho màu văn bản trên background amber.
- Personalization:
  - Cho phép upload logo, chọn palette (3 preset), hoặc load “skin” từ JSON.
- Advanced:
  - Thêm chế độ timed quiz (timer per question / whole exam).
  - Export kết quả thành CSV/PDF.

Cấu trúc thư mục gợi ý

- src/
  - pages/ (HomePage, ExamPage)
  - components/ (QuestionCard, OptionButton, ProgressBar, HintPanel)
  - data/ (subjects/\*.ts)
  - store/ (zustand stores)
  - types/ (Question, Subject)
  - styles/ (global/tailwind config)
- docs/ (ảnh demo, hướng dẫn nội bộ)

CI / Deployment (gợi ý)

- CI: Github Actions:
  - job: lint, test, build
- Hosting:
  - Vercel: tự động deploy branch main
  - Netlify / GitHub Pages: cấu hình build step `npm run build` và publish folder `dist`

Mẹo tối ưu

- Khi dữ liệu câu hỏi lớn, tách file data thành JSON/REST API — lazy load theo môn thi.
- Dùng memo/virtualization (react-window) nếu danh sách option rất dài.
- Đối với multi-select (answer là mảng), hiển thị checkbox thay vì button.

Cách đóng góp

1. Fork repo → tạo branch feature/xyz
2. Viết code & test
3. Tạo PR mô tả thay đổi, screenshot & checklist
4. Chúng mình review và merge
