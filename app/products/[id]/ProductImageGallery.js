"use client"; // Enable client-side rendering
import { useState } from "react";

/**
 * Component to display product details including images, pricing, rating, and reviews.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.product - The product object containing all details
 * @param {string[]} props.product.images - Array of image URLs for the product
 * @param {string} props.product.thumbnail - URL for the thumbnail image
 * @param {string} props.product.title - Product title
 * @param {number} props.product.price - Product price
 * @param {number} [props.product.discountPercentage] - Discount percentage (optional)
 * @param {number} props.product.rating - Product rating out of 5
 * @param {string} props.product.category - Product category
 * @param {number} props.product.stock - Number of items in stock
 * @param {string[]} props.product.tags - Array of tags related to the product
 * @param {Object[]} props.product.reviews - Array of reviews for the product
 * @param {string} props.product.reviews[].reviewerName - Name of the reviewer
 * @param {string} props.product.reviews[].comment - Reviewer's comment
 * @param {number} props.product.reviews[].rating - Rating given by the reviewer out of 5
 * @param {string} props.product.reviews[].date - Date of the review
 * @returns {JSX.Element} ProductDetail component
 */
export default function ProductDetail({ product }) {
  const {
    images,
    thumbnail,
    title,
    price,
    discountPercentage,
    rating,
    category,
    stock,
    tags,
    reviews,
  } = product;

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [sortCriteria, setSortCriteria] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewList, setReviewList] = useState(reviews);
  const [isEditing, setIsEditing] = useState(null); // Track which review is being edited
  const [newReview, setNewReview] = useState({ reviewerName: "", comment: "", rating: 0 });

  const reviewsPerPage = 5;

  /**
   * Handles image load error by falling back to the thumbnail image.
   * 
   * @param {Object} e - The event object for the image load error
   */
  const handleError = (e) => {
    e.target.src = thumbnail; // Fallback image if loading fails
  };

  /**
   * Sorts the reviews based on the selected criteria.
   * 
   * @param {Object[]} reviews - The array of reviews to sort
   * @param {string} criteria - The criteria to sort by ('date' or 'rating')
   * @returns {Object[]} - The sorted reviews array
   */
  const sortReviews = (reviews, criteria) => {
    if (criteria === "rating") {
      return [...reviews].sort((a, b) => b.rating - a.rating);
    } else {
      return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  // Calculate the discounted price if a discount is available
  const discountedPrice = discountPercentage
    ? (price - (price * discountPercentage) / 100).toFixed(2)
    : price;

  // Pagination logic for reviews
  const paginatedReviews = sortReviews(reviewList, sortCriteria).slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const totalPages = Math.ceil(reviewList.length / reviewsPerPage);

  /**
   * Handles the deletion of a review.
   * 
   * @param {number} index - Index of the review to be deleted
   */
  const handleDeleteReview = (index) => {
    setReviewList((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Handles the submission of a new or edited review.
   * 
   * @param {Event} e - The form submission event
   */
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReviewData = { ...newReview, date: new Date().toISOString().split("T")[0] };

    if (isEditing !== null) {
      // Update an existing review
      setReviewList((prev) =>
        prev.map((review, index) => (index === isEditing ? newReviewData : review))
      );
      setIsEditing(null);
    } else {
      // Add a new review
      setReviewList((prev) => [...prev, newReviewData]);
    }
    setNewReview({ reviewerName: "", comment: "", rating: 0 });
  };

  /**
   * Handles the editing of a review.
   * 
   * @param {number} index - Index of the review to be edited
   */
  const handleEditReview = (index) => {
    const reviewToEdit = reviewList[index];
    setNewReview(reviewToEdit);
    setIsEditing(index);
  };

  return (
    <div className="font-sans bg-white text-black">
      <div className="p-4 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Image Gallery Section */}
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            {/* Main Product Image */}
            <div className="bg-gray-200 px-4 py-12 rounded-xl">
              <img
                src={currentImage}
                alt="Product"
                onError={handleError}
                className="w-9/12 rounded object-cover mx-auto"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="w-[90px] h-20 flex items-center justify-center bg-gray-200 rounded-xl p-4 cursor-pointer"
                    onClick={() => setCurrentImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full object-contain"
                      onError={handleError}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold">{title}</h2>

            {/* Rating Section */}
            <div className="flex items-center mt-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-[18px] ${i < Math.round(rating) ? "fill-yellow-300" : "fill-[#CED5D8]"}`}
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <h4 className="text-black text-base ml-2">{rating.toFixed(2)} / 5</h4>
            </div>

            {/* Pricing Section */}
            <div className="flex flex-wrap gap-4 mt-6">
              <p className="text-4xl font-semibold">${discountedPrice}</p>
              {discountPercentage && (
                <p className="text-gray-400 text-base">
                  <strike>${price}</strike>{" "}
                  <span className="text-sm ml-1">({discountPercentage}% off)</span>
                </p>
              )}
            </div>
            <p className="text-gray-400 text-base mt-2">Tax included</p>

            {/* Stock & Availability */}
            <p className={`mt-4 ${stock > 0 ? "text-green-400" : "text-red-400"}`}>
              {stock > 0 ? `In stock (${stock} available)` : "Out of stock"}
            </p>

            {/* Category & Tags */}
            <p className="mt-4">
              Category: <span className="text-gray-400">{category}</span>
            </p>
            <p className="mt-2">
              Tags:
              {tags.map((tag, index) => (
                <span key={index} className="text-gray-400 ml-2">
                  #{tag}
                </span>
              ))}
            </p>

            {/* Reviews Section */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold">Customer Reviews</h4>

              {/* Review Sort */}
              <div className="flex justify-between items-center mt-2">
                <label className="text-gray-600">Sort by: </label>
                <select
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="date">Most Recent</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>

              {/* Review List */}
              {paginatedReviews.map((review, index) => (
                <div key={index} className="mt-4 p-4 border border-gray-200 rounded">
                  <div className="flex justify-between">
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-[14px] ${i < review.rating ? "fill-yellow-300" : "fill-[#CED5D8]"}`}
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="text-blue-500 text-sm"
                      onClick={() => handleEditReview((currentPage - 1) * reviewsPerPage + index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => handleDeleteReview((currentPage - 1) * reviewsPerPage + index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* Pagination Controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              {/* Add/Edit Review Form */}
              <div className="mt-6 p-4 border rounded">
                <h4 className="text-lg font-semibold">{isEditing !== null ? "Edit Review" : "Add a Review"}</h4>
                <form onSubmit={handleSubmitReview} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newReview.reviewerName}
                      onChange={(e) => setNewReview({ ...newReview, reviewerName: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value, 10) })}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      <option value={0}>Select rating</option>
                      {[...Array(5)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Comment</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {isEditing !== null ? "Update Review" : "Submit Review"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
