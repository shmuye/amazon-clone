import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProducts } from "../service/products.service.js";
import Loader from "./Loader.jsx";
import Product from "./Product.jsx";

const HERO_IMAGES = [
  "https://m.media-amazon.com/images/I/81mLoEvjbEL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71GGl3UpyOL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg",
];

const Home = ({ searchTerm = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProducts = normalizedSearch
    ? products.filter((product) =>
        product.title?.toLowerCase().includes(normalizedSearch),
      )
    : products;

  return (
    <div className="pb-8">
      <div className="relative max-h-[400px] sm:max-h-[500px] overflow-hidden">
        <img
          className="w-full h-[220px] sm:h-[320px] lg:h-[400px] object-cover object-center
            [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
          src={HERO_IMAGES[currentImageIndex]}
          alt="Featured deals banner"
        />
        <button
          type="button"
          onClick={() =>
            setCurrentImageIndex((i) =>
              i === 0 ? HERO_IMAGES.length - 1 : i - 1,
            )
          }
          aria-label="Previous banner"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow transition-colors cursor-pointer"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          onClick={() =>
            setCurrentImageIndex((i) => (i + 1) % HERO_IMAGES.length)
          }
          aria-label="Next banner"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow transition-colors cursor-pointer"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 -mt-16 sm:-mt-24 lg:-mt-32 relative z-10">
        {error && (
          <p
            className="text-center text-red-600 my-4 bg-white rounded-lg py-3 shadow-sm"
            role="alert"
          >
            {error}
          </p>
        )}

        {searchTerm && (
          <p className="text-sm text-gray-700 mb-4 bg-white/90 inline-block px-3 py-1 rounded-full shadow-sm">
            Showing results for &ldquo;{searchTerm}&rdquo;
          </p>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm">
            No products available. Add products to your Firestore{" "}
            <code className="text-sm bg-gray-100 px-1 rounded">products</code>{" "}
            collection, or run{" "}
            <code className="text-sm bg-gray-100 px-1 rounded">
              npm run seed:products
            </code>
            .
          </p>
        ) : (
          <p className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm">
            No products match &ldquo;{searchTerm}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
