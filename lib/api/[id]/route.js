import { getProductById } from '@/lib/products';

export async function GET(request, { params }) {
  const product = await getProductById(params.id);
  return new Response(JSON.stringify(product), { status: 200 });
}
