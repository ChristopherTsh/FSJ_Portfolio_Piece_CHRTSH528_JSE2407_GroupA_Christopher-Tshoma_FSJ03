// app/lib/firebaseConfig.js

import { collection, query, where, orderBy, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from './firebaseConfig';  // Make sure you're importing the initialized Firestore

export async function fetchProducts(searchQuery = '', category = '', sortOption = 'asc', currentPage = 1) {
  const itemsPerPage = 20;

  // Debugging the Firestore DB instance
  console.log("Firestore DB in fetchProducts:", db);

  let productQuery = collection(db, 'products'); // Correctly reference the Firestore collection

  // Debugging productQuery
  console.log("Product Query after collection reference:", productQuery);

  // Filtering by category
  if (category) {
    productQuery = query(productQuery, where('category', '==', category));
  }

  // Debugging category filter
  console.log("Product Query after category filter:", productQuery);

  // Searching by title
  if (searchQuery) {
    productQuery = query(productQuery, where('title', '>=', searchQuery));
  }

  // Debugging search filter
  console.log("Product Query after search filter:", productQuery);

  // Sorting by price
  productQuery = query(productQuery, orderBy('price', sortOption === 'asc' ? 'asc' : 'desc'));

  // Debugging sorting
  console.log("Product Query after sorting:", productQuery);

  // Pagination logic
  const offset = (currentPage - 1) * itemsPerPage;
  productQuery = query(productQuery, limit(itemsPerPage), startAfter(offset));

  // Debugging pagination
  console.log("Product Query after pagination:", productQuery);

  // Fetch products
  const querySnapshot = await getDocs(productQuery);

  // Debugging fetched products
  console.log("Fetched Products:", querySnapshot.docs.map(doc => doc.data()));

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Return paginated result
  return {
    products,
    totalPages: Math.ceil(querySnapshot.size / itemsPerPage), // Calculate total pages
  };
}
