import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider.jsx";
import { getBasketTotal, getBasketItemCount } from "../reducer.js";
import { ROUTES } from "../constants/routes.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const Subtotal = () => {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();
  const itemCount = getBasketItemCount(basket);
  const subtotal = getBasketTotal(basket);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
      <p className="text-lg text-gray-900">
        Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):
      </p>
      <p className="text-2xl font-bold text-[#b12704]">
        {formatCurrency(subtotal)}
      </p>

      <button
        type="button"
        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-2.5 text-sm font-medium text-gray-900 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => navigate(ROUTES.PAYMENT)}
        disabled={basket.length === 0}
      >
        Proceed to Checkout
      </button>

      <p className="text-xs text-gray-500 text-center">
        Taxes and shipping calculated at checkout
      </p>
    </div>
  );
};

export default Subtotal;
