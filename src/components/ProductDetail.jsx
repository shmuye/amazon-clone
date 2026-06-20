import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../service/products.service.js";
import { useStateValue } from "./StateProvider.jsx";
import { ACTIONS } from "../constants/actions.js";
import { ROUTES } from "../constants/routes.js";
import StarRating from "./StarRating.jsx";
import AmazonButton from "./ui/AmazonButton.jsx";
import Loader from "./Loader.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [, dispatch] = useStateValue();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        if (!data) {
          setNotFound(true);
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToBasket = () => {
    dispatch({
      type: ACTIONS.ADD_TO_BASKET,
      item: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating,
        description: product.description,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) return <Loader />;

  if (notFound || !product) {
    return (
      <div className="max-w-lg mx-auto my-16 text-center px-4">
        <h1 className="text-2xl font-semibold mb-2">Product not found</h1>
        <p className="text-gray-600 mb-6">
          The item you&apos;re looking for may have been removed.
        </p>
        <Link to={ROUTES.HOME}>
          <AmazonButton className="px-6 py-2">Continue shopping</AmazonButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg p-4 min-h-[280px]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[350px] max-w-full object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {product.title}
          </h1>

          {product.rating > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-[#007185]">
                {product.rating} out of 5
              </span>
            </div>
          )}

          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
            {formatCurrency(product.price)}
          </p>

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <AmazonButton
              className="px-8 py-2.5 font-semibold"
              onClick={addToBasket}
            >
              Add to Cart
            </AmazonButton>
            <Link to={ROUTES.CHECKOUT}>
              <AmazonButton className="px-8 py-2.5 w-full sm:w-auto">
                Go to Cart
              </AmazonButton>
            </Link>
          </div>

          {added && (
            <p className="text-green-700 text-sm mt-3 font-medium" role="status">
              Added to cart successfully.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
