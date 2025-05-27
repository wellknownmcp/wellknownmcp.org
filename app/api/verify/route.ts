import { parseFeed } from '@/lib/verify';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return new Response('No file uploaded', { status: 400 });
    const text = await file.text();
    const json = JSON.parse(text);

    const { type } = parseFeed(json);
    if (type === 'invalid' || type === 'unknown') {
      return new Response('Unknown or invalid feed structure.', { status: 422 });
    }

    const valid_signature = json.signature && json.signature.value ? true : false;
    const certified = json.certificate_chain && json.certificate_chain.length > 0 ? true : false;

    const trust_level = valid_signature && certified
      ? 'Certified'
      : valid_signature
      ? 'Signed Only'
      : 'Untrustable';

    return Response.json({ type, valid_signature, certified, trust_level });
  } catch (error) {
    return new Response('Invalid JSON format or internal server error.', { status: 400 });
  }
}
