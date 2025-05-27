// app/spec/page.tsx
'use client'
import { redirect } from 'next/navigation'

export default function SpecRootRedirect() {
  redirect('/spec/01_llmfeed/llmfeed')
}
