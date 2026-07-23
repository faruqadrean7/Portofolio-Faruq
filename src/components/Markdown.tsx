import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className="mt-10 font-serif text-4xl leading-tight first:mt-0" {...props} />
          ),
          h2: (props) => (
            <h2 className="mt-10 font-serif text-3xl leading-tight first:mt-0" {...props} />
          ),
          h3: (props) => (
            <h3 className="mt-8 font-serif text-2xl leading-tight first:mt-0" {...props} />
          ),
          p: (props) => <p className="mt-4 text-base leading-relaxed text-muted" {...props} />,
          ul: (props) => <ul className="mt-4 list-disc space-y-1 pl-6 text-muted" {...props} />,
          ol: (props) => <ol className="mt-4 list-decimal space-y-1 pl-6 text-muted" {...props} />,
          li: (props) => <li className="leading-relaxed" {...props} />,
          a: (props) => (
            <a
              {...props}
              target={props.href?.startsWith("http") ? "_blank" : undefined}
              rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-accent underline-offset-4 hover:underline"
            />
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = (className || "").startsWith("language-");
            if (isBlock) {
              return (
                <code
                  className={`${className ?? ""} block overflow-x-auto rounded-lg border border-line bg-surface p-4 font-mono text-xs leading-relaxed text-ink`}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-xs text-accent" {...props}>
                {children}
              </code>
            );
          },
          pre: (props) => <pre className="mt-4" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="mt-4 border-l-2 border-accent pl-4 italic text-ink"
              {...props}
            />
          ),
          hr: () => <hr className="my-10 border-line" />,
          table: (props) => (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          th: (props) => (
            <th className="border border-line bg-surface px-3 py-2 text-left font-medium" {...props} />
          ),
          td: (props) => <td className="border border-line px-3 py-2 text-muted" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
