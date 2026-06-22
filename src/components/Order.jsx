import CheckoutProduct from "./CheckoutProduct.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";
import { formatShippingAddress } from "../utils/shipping.js";

const formatOrderDate = (timestamp) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(timestamp * 1000));

const Order = ({ order }) => {
  const shipping = order.data.shipping;
  const addressLines = formatShippingAddress(shipping);

  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-[#f7fafa] border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Order placed
          </p>
          <p className="font-semibold">
            {formatOrderDate(order.data.created)}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
          <p className="font-bold text-[#b12704]">
            {formatCurrency(order.data.amount / 100)}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {shipping && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Ship to
            </h3>
            <address className="text-sm text-gray-600 not-italic leading-relaxed">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {shipping.phone && (
                <span className="block mt-1">{shipping.phone}</span>
              )}
              {shipping.email && (
                <span className="block">{shipping.email}</span>
              )}
            </address>
          </div>
        )}

        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Items
          </h3>
          <div className="divide-y divide-gray-100">
            {order.data.basket?.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
                hideButton
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
        Order ID: {order.id}
      </div>
    </article>
  );
};

export default Order;
