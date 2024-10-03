export default function Searchbar({ searchQuery, setSearchQuery }) {
  return (
      <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border border-gray-300 rounded-md p-2 w-full md:w-64 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm"
      />
  );
}
