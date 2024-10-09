"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * ProductGrid component displays a grid of products with their images, titles, prices, and action buttons.
 *
 * @param {Object} props - The component props
 * @param {Array} props.products - The list of products to display
 * @param {Object} props.products[].images - Array of image URLs for the product
 * @param {string} props.products[].id - The unique identifier for the product
 * @param {string} props.products[].title - The title of the product
 * @param {string} props.products[].thumbnail - The URL of the product's thumbnail image
 * @param {number} props.products[].price - The price of the product
 * @param {string} props.products[].category - The category of the product
 * @returns {JSX.Element} The ProductGrid component
 */
export default function ProductGrid({ products }) {
  const fallbackImage = "https://via.placeholder.com/200"; // Fallback image in case an image fails to load

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <ProductImageGallery
            images={product.images}
            fallbackImage={fallbackImage}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              ${product.price}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-around mt-4">
              {/* Add to Cart Button */}
              <div className="relative group">
                <button
                  onClick={() => console.log("Added to cart:", product)}
                  className="bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 group-hover:text-green-700"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 3h2l3.6 7.59-1.35 2.44C7.07 13.84 7 14.16 7 14.5 7 15.33 7.67 16 8.5 16h9c.63 0 1.18-.39 1.41-.97l3.38-8.51C22.64 6.02 22.41 5 21.69 5H6.21l-.94-2H3zm5 13c-.83 0-1.5.67-1.5 1.5S7.17 19 8 19s1.5-.67 1.5-1.5S8.83 16 8 16zm7 0c-.83 0-1.5.67-1.5 1.5S14.17 19 15 19s1.5-.67 1.5-1.5S15.83 16 15 16z" />
                  </svg>
                </button>
                <span className="absolute bottom-0 transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs text-gray-700">
                  Add to Cart
                </span>
              </div>

              {/* Add to Wishlist Button */}
              <div className="relative group">
                <button
                  onClick={() => console.log("Added to wishlist:", product)}
                  className="bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 group-hover:text-red-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.318 1.318-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <span className="absolute bottom-0 transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs text-gray-700">
                  Wishlist
                </span>
              </div>

              {/* View Product Button */}
              <div className="relative group">
                <Link href={`/products/${product.id}`}>
                  <button className="bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500 group-hover:text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14v6H5zM4 6h16v4H4z"
                      />
                    </svg>
                  </button>
                </Link>
                <span className="absolute bottom-0 transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs text-gray-700">
                  View Product
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ProductImageGallery component displays a gallery of product images with auto-scrolling and hover arrow effects.
 *
 * @param {Object} props - The component props
 * @param {Array} props.images - Array of image URLs for the product
 * @param {string} props.fallbackImage - URL of the fallback image to display if an image fails to load
 * @returns {JSX.Element} The ProductImageGallery component
 */
function ProductImageGallery({ images, fallbackImage }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let isThrottled = false;

  /**
   * Displays the previous image in the gallery.
   */
  const showPreviousImage = () => {
    if (!isThrottled) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      throttleClick();
    }
  };

  /**
   * Displays the next image in the gallery.
   */
  const showNextImage = () => {
    if (!isThrottled) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      throttleClick();
    }
  };

  /**
   * Prevents multiple clicks within a short time frame.
   */
  const throttleClick = () => {
    isThrottled = true;
    setTimeout(() => (isThrottled = false), 500); // Prevent clicking for 500ms
  };

  /**
   * Handles the error when an image fails to load by replacing it with a fallback image.
   *
   * @param {Object} e - The error event
   */
  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="relative group">
      {/* Main Image */}
      <img
        src={images[currentImageIndex]}
        alt="Product"
        onError={handleError}
        className="w-full h-64 object-contain"
      />

      {/* Left Arrow */}
      {images.length > 1 && (
        <button
          onClick={showPreviousImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Right Arrow */}
      {images.length > 1 && (
        <button
          onClick={showNextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
