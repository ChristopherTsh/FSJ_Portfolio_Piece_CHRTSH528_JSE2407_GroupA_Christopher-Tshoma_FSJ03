// api.js
export const fetchProducts = async (params) => {
  const { search, category, sort, page = 1 } = params;
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products?search=${search}&category=${category}&sort=${sort}&page=${page}`);
  const data = await response.json();
  console.log('Fetched products:', data); // Debug log
  return data;
};
