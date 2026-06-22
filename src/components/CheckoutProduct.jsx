import { useStateValue } from "./StateProvider.jsx";
import { ACTIONS } from "../constants/actions.js";
import { getItemQuantity } from "../reducer.js";
import StarRating from "./StarRating.jsx";
import QuantitySelector from "./ui/QuantitySelector.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

const CheckoutProduct = ({
  id,
  image,
  title,
  description,
  price,
  rating,
  quantity = 1,
  hideButton,
}) => {
  const [, dispatch] = useStateValue();
  const qty = getItemQuantity({ quantity });
  const lineTotal = price * qty;

  const setQuantity = (nextQuantity) => {
    dispatch({
      type: ACTIONS.SET_BASKET_QUANTITY,
      id,
      quantity: nextQuantity,
    });
  };

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

        {!hideButton ? (
          <QuantitySelector
            quantity={qty}
            onDecrease={() => setQuantity(qty - 1)}
            onIncrease={() => setQuantity(qty + 1)}
            onRemove={removeFromBasket}
          />
        ) : (
          <QuantitySelector quantity={qty} readOnly />
        )}
      </div>

      <div className="sm:text-right shrink-0">
        <p className="font-bold text-gray-900">{formatCurrency(lineTotal)}</p>
        {qty > 1 && (
          <p className="text-xs text-gray-500 mt-1">
            {formatCurrency(price)} each
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
