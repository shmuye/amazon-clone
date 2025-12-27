import React from 'react'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct.jsx';
import "../css/Payment.css";
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = () => {
    const [{ basket, user }, dispatch ] = useStateValue(); 
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = (e) => {
        e.preventDefault(); 
    }

   

  return (
    <div className='payment'>
        <div className='payment_container'>
            <h1>
               Checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>
        <div className="payment_section">
            <div className="payment_title">
             <h3>Delivery Address</h3>
            </div>
            <div className="payement_address">
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
        </div>
           <div className="payment_section">
            <div className="payment_title">
                <h3>Review items and delivery</h3>
            </div>
            <div className="payment_items">
                {basket.map(item => (
                    <CheckoutProduct
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                    />  
                ))}
            </div>
           </div>
            <div className="payment_section">
            <div className="payment_title">
                <h3>Payment Method</h3>
            </div>
            <div className="payment_details">
               <form
                 onSubmit={handleSubmit}
               >
                  <CardElement />
               </form>
            </div>
           </div>   
        </div>
    </div>
  )
}

export default Payment