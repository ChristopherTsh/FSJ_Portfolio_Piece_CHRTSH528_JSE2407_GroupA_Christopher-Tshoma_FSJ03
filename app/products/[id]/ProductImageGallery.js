"use client"; // Enable client-side rendering
import { useState } from "react";
import { deleteReview, addReview } from "../../utils/reviewApi.js"; // Separate functions for API calls

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
  const [isEditing, setIsEditing] = useState(null);
  const [newReview, setNewReview] = useState({ reviewerName: "", comment: "", rating: 0 });
  const reviewsPerPage = 5;

  const handleError = (e) => {
    e.target.src = thumbnail;
  };

  const sortReviews = (reviews, criteria) => {
    if (criteria === "rating") {
      return [...reviews].sort((a, b) => b.rating - a.rating);
    } else {
      return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  const discountedPrice = discountPercentage
    ? (price - (price * discountPercentage) / 100).toFixed(2)
    : price;

  const paginatedReviews = sortReviews(reviewList, sortCriteria).slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const totalPages = Math.ceil(reviewList.length / reviewsPerPage);

  const handleDeleteReview = async (index) => {
    const reviewToDelete = reviewList[index];
    const response = await deleteReview(product.id, reviewToDelete.id); 
    if (response.success) {
      setReviewList((prev) => prev.filter((_, i) => i !== index));
    } else {
      alert("Error deleting review. Please try again.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const newReviewData = { ...newReview, date: new Date().toISOString().split("T")[0] };

    if (isEditing !== null) {
      const updatedReviews = reviewList.map((review, index) =>
        index === isEditing ? newReviewData : review
      );
      setReviewList(updatedReviews);
      setIsEditing(null);
    } else {
      const response = await addReview(product.id, newReviewData);
      if (response.success) {
        setReviewList((prev) => [...prev, newReviewData]);
      } else {
        alert("Error adding review. Please try again.");
      }
    }
    setNewReview({ reviewerName: "", comment: "", rating: 0 });
  };

  const handleEditReview = (index) => {
    const reviewToEdit = reviewList[index];
    setNewReview(reviewToEdit);
    setIsEditing(index);
  };

  return (
    <div className="font-sans bg-white text-black">
      <div className="p-4 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        {/* Image Gallery */}
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="bg-gray-200 px-4 py-12 rounded-xl">
              <img
                src={currentImage}
                alt="Product"
                onError={handleError}
                className="w-9/12 rounded object-cover mx-auto"
              />
            </div>
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

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold">{title}</h2>
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
            <p className={`mt-4 ${stock > 0 ? "text-green-400" : "text-red-400"}`}>
              {stock > 0 ? `In stock (${stock} available)` : "Out of stock"}
            </p>
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

            <div className="mt-8">
              <h4 className="text-xl font-semibold">Customer Reviews</h4>
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
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleEditReview(index)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(index)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="mt-8 border-t pt-4">
                <h4 className="text-xl font-semibold">
                  {isEditing !== null ? "Edit Review" : "Add a Review"}
                </h4>
                <div className="mt-4">
                  <label className="block font-medium">Name</label>
                  <input
                    type="text"
                    value={newReview.reviewerName}
                    onChange={(e) =>
                      setNewReview((prev) => ({ ...prev, reviewerName: e.target.value }))
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-medium">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview((prev) => ({ ...prev, rating: Number(e.target.value) }))
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-medium">Comment</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(null);
                      setNewReview({ reviewerName: "", comment: "", rating: 0 });
                    }}
                    className="bg-gray-200 px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {isEditing !== null ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
