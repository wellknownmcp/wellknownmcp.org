// POST only
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    await supabase.from('wkmcp_export_logs').insert({
      context: data.context,
      static_path: data.staticPath || null,
      dynamic_id: data.dynamicId || null,
      time: data.time,
      user_agent: req.headers.get('user-agent'),
    })

    return new Response('ok')
  } catch (err) {
    return new Response('error', { status: 500 })
  }
}
