import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebaseConfig'; // Adjust path if necessary
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

/**
 * Fetches a product by ID from Firestore.
 * Pads the ID to ensure it matches the desired length (e.g., '001', '002').
 * 
 * @param {Request} request - The HTTP request object.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The product ID.
 * @returns {NextResponse} JSON response with the product data or an error message.
 */
export async function GET(request, { params }) {
  let { id } = params;

  // Pad the ID to ensure it is 3 digits long
  id = id.padStart(3, '0');
  console.log(`Fetching product with padded ID: ${id}`);

  // Validate the padded product ID
  if (!id) {
    console.error("Product ID is required");
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    // Log all product IDs in the collection for debugging purposes
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productIDs = productsSnapshot.docs.map(doc => doc.id);
    console.log("Available product IDs:", productIDs);

    // Check if the requested product exists with padded ID
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      console.error(`Product with ID ${id} not found`);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productData = productSnap.data();
    console.log(`Product data for ID ${id}:`, productData);
    return NextResponse.json(productData, { status: 200 });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
