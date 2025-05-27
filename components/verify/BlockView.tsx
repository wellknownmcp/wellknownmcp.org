'use client';

export default function BlockView({ title, content, valid }: { title: string; content: any; valid: boolean; }) {
  return (
    <div className={`p-4 mb-4 rounded ${valid ? 'bg-green-100' : 'bg-red-100'}`}>
      <h3 className="font-semibold mb-2">{title}</h3>
      <pre className="text-sm overflow-x-auto">{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}
