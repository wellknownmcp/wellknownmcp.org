import { useRouter } from 'next/navigation';

interface TagFilterBarProps {
  tags: string[];
  activeTag?: string | null;
  basePath: string; // e.g. "/news" or "/spec"
}

export function TagFilterBar({ tags, activeTag, basePath }: TagFilterBarProps) {
  const router = useRouter();

  return (
    <div className="mb-4 text-sm">
      <strong>Filter by tag:</strong>{' '}
      <div className="mt-1 flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => router.push(`${basePath}?tag=${tag}`)}
            className={`px-2 py-0.5 rounded-full border text-xs ${tag === activeTag ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'}`}
          >
            #{tag}
          </button>
        ))}
        {activeTag && (
          <button onClick={() => router.push(basePath)} className="text-xs ml-2 text-red-600">(reset)</button>
        )}
      </div>
    </div>
  );
}
