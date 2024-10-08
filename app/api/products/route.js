import { db } from '../../products/products';
import { collection, query, orderBy, startAfter, limit, getDocs, where } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(request) {
    const { search, category, sort, page = 1, limit: pageSize = 20 } = Object.fromEntries(new URLSearchParams(request.nextUrl.search));

    try {
        let productsRef = collection(db, 'products');
        let q = query(productsRef, orderBy('name')); // Default query

        // Apply category filter
        if (category) {
            q = query(productsRef, where('category', '==', category));
        }

        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Search by product name
        let filteredProducts = products;
        if (search) {
            const fuse = new Fuse(products, { keys: ['name'], threshold: 0.4 });
            filteredProducts = fuse.search(search).map(result => result.item);
        }

        // Sorting
        if (sort === 'asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        // Pagination
        const startIdx = (page - 1) * pageSize;
        const paginatedProducts = filteredProducts.slice(startIdx, startIdx + pageSize);

        return new Response(JSON.stringify(paginatedProducts), { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response("Failed to fetch products", { status: 500 });
    }
}
