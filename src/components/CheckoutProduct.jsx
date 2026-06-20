import { useStateValue } from "./StateProvider.jsx";
import { ACTIONS } from "../constants/actions.js";
import StarRating from "./StarRating.jsx";
import AmazonButton from "./ui/AmazonButton.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

const CheckoutProduct = ({
  id,
  image,
  title,
  description,
  price,
  rating,
  hideButton,
}) => {
  const [, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 px-4 sm:px-6 py-5 border-b border-gray-200 last:border-b-0">
      <img
        className="object-contain w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-gray-50 rounded"
        src={image}
        alt={title}
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900">{title}</p>
        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        )}
        {rating > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={rating} />
          </div>
        )}
        {!hideButton && (
          <AmazonButton
            onClick={removeFromBasket}
            className="mt-3 px-3 py-1.5 text-xs"
          >
            Remove
          </AmazonButton>
        )}
      </div>

      <p className="font-bold text-gray-900 sm:text-right shrink-0">
        {formatCurrency(price)}
      </p>
    </div>
  );
};

export default CheckoutProduct;
