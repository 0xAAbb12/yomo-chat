import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export default function MarkdownStyled({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-headings:scroll-mt-24 max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, children, ...props }) => (
            <h1
              {...props}
              className="mb-6 inline-block text-3xl font-extrabold text-black"
            >
              <span className="bg-gradient-to-r from-[#f67c00] to-[#f67c00] bg-clip-text text-transparent">
                {children}
              </span>
            </h1>
          ),
          h2: ({ node, children, ...props }) => {
            // 保持已有的 id 生成方式（供锚点使用）
            const text = String(children);
            const id = slug(text);
            return (
              <h2
                id={id}
                {...props}
                className="mt-4 scroll-mt-24 text-2xl font-bold text-black"
              >
                {children}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => (
            <h3 {...props} className="mt-6 text-xl font-semibold text-black/90">
              {children}
            </h3>
          ),
          p: ({ node, children, ...props }) => (
            <p {...props} className="mb-3 leading-7 text-neutral-800">
              {children}
            </p>
          ),
          strong: ({ node, children, ...props }) => (
            <strong {...props} className="font-semibold text-black">
              {children}
            </strong>
          ),
          a: ({ node, href, children, ...props }) => (
            <a
              href={href}
              className="text-[#f67c00] underline decoration-[#f67c00]/40 underline-offset-4 hover:text-[#e46e00]"
              target="_blank"
              rel="noreferrer noopener"
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({ node, children, ...props }) => (
            <ul {...props} className="my-4 space-y-2 !pl-1">
              {children}
            </ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol {...props} className="my-4 space-y-2 !pl-1">
              {children}
            </ol>
          ),
          li: ({ node, children, ...props }) => (
            <li {...props} className="relative list-none pl-4 text-neutral-800">
              <span className="absolute top-2 left-0 h-1.5 w-1.5 rounded-full bg-[#f67c00]" />
              {children}
            </li>
          ),
          table: ({ node, children, ...props }) => (
            <div className="my-4 overflow-hidden rounded-xl border border-black/10 bg-black/5">
              <table className="!my-0 w-full text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-black/5 text-neutral-700" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-black/10" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className="hover:bg-black/5" {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-4 py-2 text-left font-medium text-neutral-700"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-2 text-neutral-800" {...props}>
              {children}
            </td>
          ),
          code: ({ children, ...props }) => (
            <code
              className={"block p-3" + " rounded-md bg-black/5 text-[#f67c00]"}
              {...props}
            >
              {children}
            </code>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="my-4 border-l-2 border-[#f67c00]/40 pl-4 text-neutral-800"
              {...props}
            >
              {children}
            </blockquote>
          ),
          hr: (props) => <hr className="my-3 border-black/10" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
