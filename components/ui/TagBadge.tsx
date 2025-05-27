import React from 'react';

interface TagBadgeProps {
  label: string;
  className?: string;
}

export function TagBadge({ label, className = '' }: TagBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-gray-100 text-gray-800 text-xs px-3 py-1 font-medium ring-1 ring-gray-300 ${className}`}
    >
      {label}
    </span>
  );
}

export default TagBadge;
