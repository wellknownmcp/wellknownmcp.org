import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
}

const badgeMap: Record<string, string> = {
  "export-to-llm-certified": "/assets/badges/export-to-llm-certified.svg",
  "export-to-llm": "/assets/badges/export-to-llm.svg",
  "llmfeed-available": "/assets/badges/llmfeed-available.svg",
  "llmfeed-certified": "/assets/badges/llmfeed-certified.svg",
  "mcp-certified": "/assets/badges/mcp-certified.svg",
  "mcp-ready-badge": "/assets/badges/mcp-ready-badge.svg",
  "verified-mcp-site": "/assets/badges/verified-mcp-site.svg",
};

const Badge = ({ className, name, children, ...props }: BadgeProps) => (
  <div className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold", className)} {...props}>
    {name && badgeMap[name] && (
      <img src={badgeMap[name]} alt={name} className="h-4 w-4" />
    )}
    {children}
  </div>
);

export { Badge };
