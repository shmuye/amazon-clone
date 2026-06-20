import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { collection, doc, setDoc } from "firebase/firestore";

import { useStateValue } from "./StateProvider.jsx";
import CheckoutProduct from "./CheckoutProduct.jsx";
import CheckoutSection from "./checkout/CheckoutSection.jsx";
import ShippingForm from "./checkout/ShippingForm.jsx";
import AmazonButton from "./ui/AmazonButton.jsx";
import EmptyState from "./ui/EmptyState.jsx";
import { getBasketTotal } from "../reducer.js";
import { ACTIONS } from "../constants/actions.js";
import { ROUTES } from "../constants/routes.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import { EMPTY_SHIPPING, validateShipping } from "../utils/shipping.js";
import { db } from "../firebase.js";
import axios from "../axios.js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0f1111",
      "::placeholder": { color: "#6b7280" },
    },
    invalid: { color: "#dc2626" },
  },
};

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [shipping, setShipping] = useState({
    ...EMPTY_SHIPPING,
    email: user?.email ?? "",
  });
  const [shippingErrors, setShippingErrors] = useState({});
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (user?.email) {
      setShipping((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    if (basket.length === 0) return;

    const getClientSecret = async () => {
      try {
        const response = await axios.post(
          `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`,
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Failed to initialize payment:", err);
        setError("Unable to initialize payment. Please try again.");
      }
    };

    getClientSecret();
  }, [basket]);

  const handleShippingChange = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (shippingErrors[field]) {
      setShippingErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errors = validateShipping(shipping);
    if (Object.keys(errors).length > 0) {
      setShippingErrors(errors);
      setError("Please complete all required shipping fields.");
      return;
    }

    setProcessing(true);

    if (!clientSecret || !stripe || !elements || !user) {
      setError("Payment is not ready. Please refresh and try again.");
      setProcessing(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: shipping.fullName,
          email: shipping.email,
          phone: shipping.phone,
          address: {
            line1: shipping.addressLine1,
            line2: shipping.addressLine2 || undefined,
            city: shipping.city,
            state: shipping.state,
            postal_code: shipping.zipCode,
            country: shipping.country,
          },
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent } = result;

    try {
      const orderRef = doc(
        collection(db, "users", user.uid, "orders"),
        paymentIntent.id,
      );

      await setDoc(orderRef, {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        shipping,
      });
    } catch (err) {
      console.error("Failed to save order:", err);
      setError(
        "Payment succeeded but the order could not be saved. Please contact support.",
      );
      setProcessing(false);
      return;
    }

    setProcessing(false);
    dispatch({ type: ACTIONS.EMPTY_BASKET });
    navigate(ROUTES.ORDERS);
  };

  if (basket.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
        <EmptyState
          title="Nothing to checkout"
          description="Your cart is empty. Add products before completing your order."
          actionLabel="Return to cart"
          actionTo={ROUTES.CHECKOUT}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">Checkout</h1>
        <p className="text-sm text-gray-600 mt-1">
          Review your order (
          <Link to={ROUTES.CHECKOUT} className="text-[#007185] hover:underline">
            {basket.length} {basket.length === 1 ? "item" : "items"}
          </Link>
          )
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CheckoutSection step="1" title="Shipping address">
          <ShippingForm
            shipping={shipping}
            errors={shippingErrors}
            onChange={handleShippingChange}
          />
        </CheckoutSection>

        <CheckoutSection step="2" title="Review your items">
          <div className="divide-y divide-gray-200 -mx-4 sm:-mx-6">
            {basket.map((item, index) => (
              <div key={`${item.id}-${index}`} className="px-4 sm:px-6">
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  hideButton
                />
              </div>
            ))}
          </div>
          <p className="text-right font-bold text-lg mt-4 pt-4 border-t border-gray-200">
            Subtotal: {formatCurrency(getBasketTotal(basket))}
          </p>
        </CheckoutSection>

        <CheckoutSection step="3" title="Payment method">
          <p className="text-sm text-gray-600 mb-4">
            Enter your card details securely via Stripe.
          </p>
          <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              onChange={(e) => {
                setDisabled(e.empty);
                if (e.error) setError(e.error.message);
              }}
            />
          </div>

          <div className="mt-6 p-4 bg-[#f7fafa] rounded-md border border-gray-200">
            <div className="flex justify-between text-sm mb-2">
              <span>Items ({basket.length})</span>
              <span>{formatCurrency(getBasketTotal(basket))}</span>
            </div>
            <div className="flex justify-between text-sm mb-2 text-green-700">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300">
              <span>Order total</span>
              <span className="text-[#b12704]">
                {formatCurrency(getBasketTotal(basket))}
              </span>
            </div>
          </div>

          <AmazonButton
            type="submit"
            className="w-full py-3 mt-6 text-base font-semibold"
            disabled={processing || disabled || !clientSecret}
          >
            {processing ? "Processing payment..." : "Place your order"}
          </AmazonButton>

          {error && (
            <p className="text-red-600 text-sm mt-3" role="alert">
              {error}
            </p>
          )}
        </CheckoutSection>
      </form>
    </div>
  );
};

export default Payment;
