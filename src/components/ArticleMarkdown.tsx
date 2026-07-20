import ReactMarkdown from "react-markdown";

function shouldOpenInNewTab(href?: string) {
  if (!href) return false;
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  ) {
    return true;
  }
  return /\.pdf($|\?)/i.test(href);
}

export function ArticleMarkdown({ source }: { source: string }) {
  return (
    <div className="prose-precisar prose-precisar--article mt-6 max-w-3xl [&_a]:text-[var(--accent)] [&_strong]:text-[var(--fg)]">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            if (shouldOpenInNewTab(href)) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            return <a href={href}>{children}</a>;
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
