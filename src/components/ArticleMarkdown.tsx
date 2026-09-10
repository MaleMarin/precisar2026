import ReactMarkdown from "react-markdown";

export function ArticleMarkdown({ source }: { source: string }) {
  return (
    <div className="prose-precisar prose-precisar--article mt-6 max-w-3xl [&_a]:text-[var(--brand-flame-text)] [&_strong]:text-[var(--fg)]">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
