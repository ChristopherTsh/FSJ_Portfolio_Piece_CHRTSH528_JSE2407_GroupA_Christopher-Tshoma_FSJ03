// import { NextResponse } from 'next/server';
// import { db } from '../../../lib/firebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';

// export async function GET(request, { params }) {
//   let { id } = params;
//   id = id.padStart(3, '0');
//   console.log(`API Fetching product with padded ID: ${id}`);

//   try {
//     const productRef = doc(db, 'products', id);
//     const productSnap = await getDoc(productRef);

//     if (!productSnap.exists()) {
//       console.log(`Product with ID ${id} not found`);
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     const productData = productSnap.data();
//     console.log(`Product data for ID ${id}:`, productData);
//     return NextResponse.json(productData, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
