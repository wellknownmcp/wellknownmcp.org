// app/spec/page.tsx
import { redirect } from 'next/navigation'

export default function SpecRootRedirect() {
  redirect('/spec/01_llmfeed/llmfeed')
}
