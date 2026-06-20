import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { auth } from "./firebase.js";
import { useStateValue } from "./components/StateProvider.jsx";
import { ACTIONS } from "./constants/actions.js";
import { ROUTES } from "./constants/routes.js";
import Home from "./components/Home.jsx";
import Orders from "./components/Orders.jsx";
import Checkout from "./components/Checkout.jsx";
import Auth from "./components/Auth.jsx";
import Payment from "./components/Payment.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      dispatch({
        type: ACTIONS.SET_USER,
        user: authUser ?? null,
      });
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Auth />} />
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home searchTerm={searchTerm} />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          <Route
            path={ROUTES.PAYMENT}
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ORDERS}
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path={`${ROUTES.PRODUCT}/:id`} element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
