import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct.jsx';
import "../css/Payment.css";
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from '../reducer.js';
import axios from '../axios.js';


const Payment = () => {
    const [{ basket, user }, dispatch ] = useStateValue(); 
    const [error, setError] = React.useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // Generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
          const response = await axios({
                method: 'post',
            //     // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
            });
            setClientSecret(response.data.clientSecret);
        } ;   
        
        getClientSecret();
    }, [basket]); 

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        setProcessing(true);

        // Here you would normally call your backend to create a PaymentIntent
        // and confirm the payment with Stripe. For this example, we'll skip that part.
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false); 

            navigate('/orders');

            // You can also dispatch an action to clear the basket or update your state here
        }); 
    }
    const handleChange = e => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details

        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

     const formattedValue = new Intl.NumberFormat("en-UK", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
        }).format(
           getBasketTotal(basket)
        );
   

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
                  <CardElement onChange={handleChange} />
                  <div className="payment_priceContainer">
                    <h3>Order Total: {formattedValue}</h3>
                    <button disabled={processing || disabled || succeeded}>
                        <span>
                          {
                            processing ? (
                                <p>Processing</p>
                            ) : (
                                "Buy Now"
                            )
                          }
                        </span>
                    </button>
                  </div>
                  {error && <div>{error}</div>} 
               </form>
            </div>
           </div>   
        </div>
    </div>
  )
}

export default Payment