import Link from "next/link";
import ProductDetail from "./ProductImageGallery"; // Import ProductDetail component

/**
 * ProductPage component fetches and displays the details of a specific product.
 *
 * This is a server-side component that fetches product data based on the provided `params.id`
 * and handles errors in fetching the product. If the product data is successfully retrieved,
 * it passes the data to the `ProductDetail` component for rendering.
 *
 * @param {Object} props - The component props
 * @param {Object} props.params - The route parameters
 * @param {string} props.params.id - The ID of the product to fetch
 * @returns {JSX.Element} The ProductPage component
 */
export default async function ProductPage({ params }) {
  let product = null;
  let error = null;

  try {
    // Fetch product data using the product ID
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${params.id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    product = await res.json();
  } catch (err) {
    error = err.message;
  }

  // If there was an error, display it
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  // If no product data was found, return a fallback UI
  if (!product) {
    return <div className="text-center text-gray-700">No product found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <Link href="/" legacyBehavior>
        <a className="min-w-[250px] px-4 py-2.5 border border-yellow-300 bg-transparent text-yellow-300 text-sm font-semibold rounded">
          Back to Products
        </a>
      </Link>

      {/* Pass product data to ProductDetail */}
      <ProductDetail product={product} /> {/* Pass product as a prop */}
    </div>
  );
}
