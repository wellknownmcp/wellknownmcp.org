import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const { path, lang } = await req.json()
  if (!path) return new Response('Missing path', { status: 400 })

  const { error } = await supabase.from('wknmpc_page_views').insert({ path, lang })
  return new Response(error ? 'Error' : 'OK', { status: error ? 500 : 200 })
}
