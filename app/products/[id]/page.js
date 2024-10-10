import Link from "next/link";
import ProductDetail from "./ProductImageGallery"; // Import your ProductDetail component

/**
 * ProductPage component fetches and displays the details of a specific product.
 * Pads the product ID to ensure it matches the desired length.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the product to fetch.
 * @returns {JSX.Element} The ProductPage component.
 */
export default async function ProductPage({ params }) {
  let product = null;
  let error = null;

  // Pad the product ID to be 3 digits long
  const paddedID = params.id.padStart(3, '0');
  console.log(`Fetching product with padded ID: ${paddedID}`);

  try {
    // Fetch product data using the padded product ID from the local API
    const res = await fetch(`http://localhost:3000/api/products/${paddedID}`, { cache: 'no-store' });  // Ensure no caching issues

    console.log("Fetch response status:", res.status);

    if (!res.ok) {
      // If the response is not ok, handle errors accordingly
      throw new Error(res.status === 404 ? 'Product not found' : 'Failed to fetch product');
    }

    // Parse the JSON data
    product = await res.json();
    console.log("Fetched product:", product);

  } catch (err) {
    error = err.message;
    console.error("Error fetching product:", error);
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

      {/* Render Product Details */}
      <ProductDetail product={product} />
    </div>
  );
}
