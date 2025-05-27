// app/spec/[...slug]/layout.tsx
import type { ReactNode } from "react";
import SpecSidebar from "@/components/spec/SpecSidebar.server";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SpecSidebar />   {/* ✅ Server Component → zéro hydration risk */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
