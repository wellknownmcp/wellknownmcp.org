import React from "react";

const blockEmojis: Record<string, string> = {
  metadata: "🧠",
  data: "📦",
  trust: "🛡️",
  api: "🛰️",
  auth: "🔐",
  ui: "🎨",
  example: "🧪",
  history: "🕰️",
  credits: "🙏",
};

interface BlockCardProps {
  block: any;
  feed?: any;
}

export default function BlockCard({ block, feed }: BlockCardProps) {
  const {
    blockName,
    content,
    isSigned,
    isSignatureValid,
    isCertified,
    isCertificationValid,
    authority,
    owner,
  } = block;

  const emoji = blockEmojis[blockName] || "📄";

  let bgColor = "bg-gray-100";
  if (isSigned && isSignatureValid && isCertified && isCertificationValid) {
    bgColor = "bg-green-700 text-white";
  } else if (isSigned && isSignatureValid) {
    bgColor = "bg-green-500 text-white";
  } else if (isSigned && !isSignatureValid) {
    bgColor = "bg-red-500 text-white";
  }

  return (
    <div className={`rounded shadow p-4 ${bgColor}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg">{emoji} {blockName}</h4>
        <div className="text-sm space-x-2">
          {isSigned && (
            <span className="px-2 py-1 rounded bg-white text-black">🔒 Signed</span>
          )}
          {isSigned && isSignatureValid && (
            <span className="px-2 py-1 rounded bg-white text-black">✅ Valid</span>
          )}
          {isCertified && isCertificationValid && (
            <span className="px-2 py-1 rounded bg-white text-black">🛡️ Certified</span>
          )}
          {authority && (
            <span className="px-2 py-1 rounded bg-white text-black">👑 {authority}</span>
          )}
        </div>
      </div>
      <pre className="text-xs whitespace-pre-wrap break-words font-mono">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}
