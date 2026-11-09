import { TABLE_TEMPLATE } from "../data/tableText";

export default function TableHelp({
  onInsert,
}: {
  onInsert: (template: string) => void;
}) {
  return (
    <details className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-zinc-400">
      <summary className="cursor-pointer font-semibold text-yellow-200">
        Cách tạo bảng
      </summary>
      <p className="mt-2">
        Mỗi hàng của bảng là một dòng bắt đầu bằng{" "}
        <code className="text-yellow-200">|</code>, các ô cách nhau bằng{" "}
        <code className="text-yellow-200">|</code>. Dòng thứ hai (
        <code className="text-yellow-200">| --- | --- |</code>) bắt buộc, để
        ngăn tiêu đề với nội dung. Cần một dòng trống trước và sau bảng.
      </p>
      <pre className="mt-2 overflow-x-auto rounded bg-black/30 p-2 text-zinc-300">
        {TABLE_TEMPLATE}
      </pre>
      <p className="mt-2">
        <b className="text-yellow-200">Mẹo:</b> copy bảng từ Word / Excel rồi
        dán thẳng vào ô — web tự đổi thành bảng. (Bảng copy từ PDF thường không
        giữ được cột, hãy gõ lại theo mẫu.)
      </p>
      <p className="mt-2">
        <b className="text-yellow-200">Công thức toán:</b> viết giữa hai cặp
        đô-la, ví dụ{" "}
        <code className="text-yellow-200">{"$$SPI = \\frac{EV}{PV}$$"}</code>.
        Ký hiệu thường như − × ÷ ≥ ≤ √ ² gõ trực tiếp được. Tiền như $120,000 cứ
        gõ bình thường.
      </p>
      <button
        type="button"
        onClick={() => onInsert(TABLE_TEMPLATE)}
        className="mt-2 rounded-lg border border-yellow-400/25 bg-white/5 px-3 py-1.5 font-semibold text-yellow-200 transition hover:bg-white/10"
      >
        Chèn bảng mẫu
      </button>
    </details>
  );
}
