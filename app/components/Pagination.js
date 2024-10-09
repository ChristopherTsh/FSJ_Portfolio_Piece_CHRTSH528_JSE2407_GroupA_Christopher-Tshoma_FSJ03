'use client';

export default function Pagination({ currentPage, totalProducts, onPageChange }) {
  const PAGE_SIZE = 20; // This should match the page size used in your API
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
