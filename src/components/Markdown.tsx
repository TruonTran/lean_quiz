import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { normalizeTables } from "../data/tableText";

/** react-markdown truyền thêm prop "node"; bỏ đi để nó không bị rải xuống thẻ HTML. */
const omitNode = <T extends { node?: unknown }>({ node, ...rest }: T) => {
  void node;
  return rest;
};

/** Hiển thị markdown (bài mẫu, dàn ý) theo theme vàng-đen. Không render HTML thô nên an toàn. */
export default function Markdown({
  children,
  className = "text-zinc-300",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`space-y-3 text-sm leading-relaxed ${className}`}>
      <ReactMarkdown
        // singleDollarTextMath: false → "$120,000" vẫn là tiền; công thức phải viết $$...$$
        remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: false }]]}
        rehypePlugins={[rehypeKatex]}
        components={{
          table: (p) => (
            <div className="max-w-full overflow-x-auto">
              <table className="w-full border-collapse text-left" {...omitNode(p)} />
            </div>
          ),
          th: (p) => (
            <th className="border border-current/25 bg-current/10 px-3 py-2 align-top font-semibold" {...omitNode(p)} />
          ),
          td: (p) => <td className="border border-current/20 px-3 py-2 align-top" {...omitNode(p)} />,
          h1: (p) => <h2 className="mt-4 text-xl font-bold text-yellow-300" {...omitNode(p)} />,
          h2: (p) => <h3 className="mt-4 text-lg font-bold text-yellow-300" {...omitNode(p)} />,
          h3: (p) => <h4 className="mt-3 text-base font-semibold text-yellow-200" {...omitNode(p)} />,
          p: (p) => <p className="whitespace-pre-wrap" {...omitNode(p)} />,
          ul: (p) => <ul className="list-disc space-y-1 pl-5" {...omitNode(p)} />,
          ol: (p) => <ol className="list-decimal space-y-1 pl-5" {...omitNode(p)} />,
          strong: (p) => <strong className="font-semibold text-yellow-100" {...omitNode(p)} />,
          blockquote: (p) => (
            <blockquote className="border-l-2 border-yellow-400/40 pl-3 italic text-zinc-400" {...omitNode(p)} />
          ),
          code: (p) => <code className="rounded bg-white/10 px-1 text-yellow-200" {...omitNode(p)} />,
          a: (p) => (
            <a className="text-yellow-300 underline" target="_blank" rel="noreferrer noopener" {...omitNode(p)} />
          ),
        }}
      >
        {normalizeTables(children)}
      </ReactMarkdown>
    </div>
  );
}
