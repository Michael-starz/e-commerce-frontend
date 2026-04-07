import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/newProductCard";
import Footer from "../components/Footer";
import MenuSection from "../components/MenuSection";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/products/all`, {
          params: {
            page,
            limit: 6,
            search: searchTerm,
            category,
          },
        });
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setError(null);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchTerm, category]); // ✅ Watch filters too

  return (
    <>
      <MenuSection />
      <div className="min-h-screen bg-darkbg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Our Products</h1>
            <p className="text-gray-400">Discover our collection of premium products</p>
          </header>

          <FilterBar setSearchTerm={setSearchTerm} setCategory={setCategory} />

          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-400 py-20">{error}</div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-gray-300 font-medium pt-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-800 rounded-lg">
              <p className="text-xl text-gray-400">No products found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
