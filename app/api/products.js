// app/api/products.js
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, orderBy, getDocs, limit, startAfter } from 'firebase/firestore';

export default async function handler(req, res) {
  const { search = '', category = '', sort = 'asc', page = 1 } = req.query;
  const productsPerPage = 20;
  let productQuery = collection(db, 'products');

  if (category) {
    productQuery = query(productQuery, where('category', '==', category));
  }

  if (search) {
    productQuery = query(productQuery, where('title', '>=', search));
  }

  productQuery = query(productQuery, orderBy('price', sort === 'asc' ? 'asc' : 'desc'));
  const offset = (page - 1) * productsPerPage;
  productQuery = query(productQuery, limit(productsPerPage), startAfter(offset));

  const snapshot = await getDocs(productQuery);
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const totalPages = Math.ceil(snapshot.size / productsPerPage);

  res.status(200).json({ products, totalPages });
}
