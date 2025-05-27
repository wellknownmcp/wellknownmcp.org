'use client';

import BlockView from './BlockView';

export default function FeedView({ feed, signedBlocks }: { feed: any; signedBlocks: string[]; }) {
  return (
    <div className="space-y-4">
      {Object.keys(feed).map((key) => (
        <BlockView
          key={key}
          title={key}
          content={feed[key]}
          valid={signedBlocks.includes(key)}
        />
      ))}
    </div>
  );
}
