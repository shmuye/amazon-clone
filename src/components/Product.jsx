import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import StarRating from "./StarRating.jsx";

const Product = ({ id, title, image, price, rating }) => (
  <article className="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
    <Link
      to={`${ROUTES.PRODUCT}/${id}`}
      className="flex flex-col flex-1 group"
    >
      <div className="aspect-square flex items-center justify-center mb-3 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[#c45500]">
        {title}
      </h3>
      {rating > 0 && (
        <div className="mb-2">
          <StarRating rating={rating} />
        </div>
      )}
      {price != null && (
        <p className="text-lg font-bold text-gray-900 mt-auto">
          {formatCurrency(price)}
        </p>
      )}
      <span className="text-xs text-[#007185] mt-2 group-hover:text-[#c45500] group-hover:underline">
        View details
      </span>
    </Link>
  </article>
);

export default Product;
