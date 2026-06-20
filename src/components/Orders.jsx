import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { useStateValue } from "./StateProvider.jsx";
import Order from "./Order.jsx";
import EmptyState from "./ui/EmptyState.jsx";
import { ROUTES } from "../constants/routes.js";
import { db } from "../firebase.js";

const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, "users", user.uid, "orders");
    const ordersQuery = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(
        snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          data: docSnapshot.data(),
        })),
      );
    });

    return unsubscribe;
  }, [user]);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="When you place an order, it will appear here with shipping and item details."
          actionLabel="Start shopping"
          actionTo={ROUTES.HOME}
        />
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
