import ReactMarkdown from "react-markdown";

export function ArticleMarkdown({ source }: { source: string }) {
  return (
    <div className="prose-precisar prose-precisar--article mt-6 max-w-3xl [&_a]:text-[var(--accent)] [&_strong]:text-[var(--fg)]">
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
}
