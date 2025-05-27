import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export const runtime = "nodejs"  // force node runtime in Next App Router

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get("name")

  if (
    !name ||
    name.includes("..") ||
    name.includes("/") ||
    name.includes("\\")
  ) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 })
  }

  const filePath = path.resolve("./public/exports", `${name}.llmfeed.json`)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found", filePath }, { status: 404 })
  }

  const file = fs.readFileSync(filePath, "utf8")
  return new NextResponse(file, {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  })
}
