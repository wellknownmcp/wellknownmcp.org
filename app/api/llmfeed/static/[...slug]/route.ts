
// app/api/llmfeed/static/[...slug]/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(_: Request, { params }: { params: { slug?: string[] } }) {
  const slugPath = params.slug ? params.slug.join("/") : "default";
  const filePath = path.resolve(process.cwd(), "public/exports", slugPath + ".llmfeed.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Feed not found" }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileContent);

  return NextResponse.json(json);
}
