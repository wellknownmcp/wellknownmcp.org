import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { feed, email, track, index } = await req.json();

  if (!feed) {
    return new Response("No feed provided", { status: 400 });
  }

  const { error } = await supabase
    .from("wkmcp_feed_submissions")
    .insert({
      declared_origin: feed?.metadata?.origin ?? null,
      origin_indexable: index,
      feed_type: feed?.feed_type ?? null,
      anonymous: !email,
      raw_feed: feed,
      notes: null,
      email: email ?? null
    });

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200 }
  );
}
