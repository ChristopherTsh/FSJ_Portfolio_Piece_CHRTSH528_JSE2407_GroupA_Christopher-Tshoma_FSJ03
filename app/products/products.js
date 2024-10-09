// import { db } from '../../lib/firebaseConfig';
// import { collection, query, getDocs, orderBy, where, limit, startAfter } from 'firebase/firestore';
// import Fuse from 'fuse.js';

// export default async function handler(req, res) {
//   const { search, category, sort, page, pageSize } = req.query;

//   try {
//     const productsRef = collection(db, 'products');
//     let q = query(productsRef);
    
//     // Category filter
//     if (category && category !== 'All') {
//       q = query(q, where('category', '==', category));
//     }

//     // Fetch products
//     const snapshot = await getDocs(q);
//     const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     // Fuse.js for searching by title
//     if (search) {
//       const fuse = new Fuse(products, { keys: ['title'] });
//       products = fuse.search(search).map(result => result.item);
//     }

//     // Sort products
//     products.sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

//     // Pagination logic
//     const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

//     res.status(200).json(paginatedProducts);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// }
