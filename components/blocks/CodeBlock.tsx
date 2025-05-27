export function CodeBlock({ code, language = "json" }: { code: string; language?: string }) {
  return (
    <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}
