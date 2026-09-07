import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export default function Prose({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`prose ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const h = href ?? "#";
            if (h.startsWith("/")) return <Link href={h}>{children}</Link>;
            const external = /^https?:\/\//.test(h);
            return (
              <a href={h} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                {children}
              </a>
            );
          },
          blockquote: ({ children, node }) => {
            // A blockquote whose first text starts with "Sidebar:" renders as a boxed aside.
            const first = (node?.children?.[0] as { children?: { value?: string }[] } | undefined)?.children?.[0]?.value ?? "";
            if (/^\s*Sidebar:/i.test(first)) {
              return (
                <aside className="sidebar my-8 border border-line bg-foam px-5 py-4 text-[1.02rem] leading-snug">
                  <p className="eyebrow !text-buoy mb-2">Sidebar</p>
                  <div className="sidebar-body">{children}</div>
                </aside>
              );
            }
            return <blockquote>{children}</blockquote>;
          },
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
