import React from 'react'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct.jsx'
import '../css/Order.css'

const Order = ({ order }) => {

   const formattedValue = new Intl.NumberFormat("en-UK", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
      }).format(
         order.data.amount / 100
      );

  return (
    <div className='order'>
        <h2>Order</h2>
        <p>Order Date: {moment.unix(order.data.created).format("MMMM Do YYYY, h:mm:ss a")}</p>
        <p className='order_id'>
          {order.id}
        </p>
        {
          order.data.basket?.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hideButton
          />    
          ))  
        }
        <h3 className='order_total'>Order Total: {formattedValue}</h3>  
    </div>
  )
}

export default Order