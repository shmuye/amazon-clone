import Subtotal from "./Subtotal.jsx";
import { useStateValue } from "./StateProvider.jsx";
import CheckoutProduct from "./CheckoutProduct.jsx";
import EmptyState from "./ui/EmptyState.jsx";
import { ROUTES } from "../constants/routes.js";

const Checkout = () => {
  const [{ basket }] = useStateValue();

  if (basket.length === 0) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
        <EmptyState
          title="Your cart is empty"
          description="Browse our products and add items to your cart before checking out."
          actionLabel="Start shopping"
          actionTo={ROUTES.HOME}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 w-full">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_auto] px-6 py-3 border-b border-gray-200 text-sm text-gray-600">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                description={item.description}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-20">
          <Subtotal />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
