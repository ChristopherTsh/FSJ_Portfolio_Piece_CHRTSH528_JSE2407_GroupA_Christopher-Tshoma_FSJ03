import { getPaginatedProducts } from '@/lib/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'asc';
  const search = searchParams.get('search') || '';

  const products = await getPaginatedProducts({ page, category, sort, search });
  return new Response(JSON.stringify(products), { status: 200 });
}
