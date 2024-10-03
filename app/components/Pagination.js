export default function Pagination({ page, setPage }) {
  const handlePrevious = () => {
      if (page > 1) {
          setPage(page - 1);
      }
  };

  const handleNext = () => {
      setPage(page + 1);
  };

  return (
      <div className="flex justify-between mt-4">
          <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="bg-gray-300 text-gray-700 p-2 rounded disabled:opacity-50"
          >
              Previous
          </button>
          <button
              onClick={handleNext}
              className="bg-gray-300 text-gray-700 p-2 rounded"
          >
              Next
          </button>
      </div>
  );
}
