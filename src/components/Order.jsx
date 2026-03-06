import moment from "moment";
const Order = ({ order }) => {
  const formattedValue = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(order.data.amount / 100);

  return (
    <div className="border border-gray-300 p-5 lg:p-7.5 bg-white relative flex flex-col gap-[15px]">
      <h2 className="text-[20px] font-semibold">Order</h2>
      <p className="text-[14px]">
        Order Date:{" "}
        {moment.unix(order.data.created).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <p className="static mt:[5px] lg:mt-0 lg:absolute top-5 right-5 text-[12px]">
        {order.id}
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <h3 className="lg:text-right font-600 text-right mt-2.5">
        Order Total: {formattedValue}
      </h3>
    </div>
  );
};

export default Order;
