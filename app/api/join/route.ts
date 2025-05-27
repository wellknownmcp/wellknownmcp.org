import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const { email, motivation } = await req.json()
  if (!email) return new Response('Missing email', { status: 400 })

  const { error } = await supabase.from('wkmcp_consortium_requests').insert({ email, motivation })
  return new Response(error ? 'Error' : 'OK', { status: error ? 500 : 200 })
}
