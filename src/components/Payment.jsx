import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from '../reducer.js';
import { db } from '../firebase.js';
import { collection, doc, setDoc } from "firebase/firestore";
import axios from '../axios.js';

const Payment = () => {
    const [{ basket, user }, dispatch ] = useStateValue(); 
    const [error, setError] = React.useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(basket.length === 0) {
            return;
        }
        // Generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
          const response = await axios({
                method: 'post',
            //     // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`,
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

        if (!clientSecret || !stripe || !elements) {
            console.error("Stripe not ready");
            setProcessing(false);
            return;
        }
    


        // Here you would normally call your backend to create a PaymentIntent
        // and confirm the payment with Stripe. For this example, we'll skip that part.
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if (result.error) {
              setError(result.error.message);
              setProcessing(false);
              return;
        }

        const paymentIntent = result.paymentIntent;

            // paymentIntent = payment confirmation

        const orderRef = doc(collection(db, 'users', user?.uid, 'orders'), paymentIntent.id);

        await setDoc(orderRef, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

        

            setSucceeded(true);
            setError(null);
            setProcessing(false); 

            dispatch({
                type: 'EMPTY_BASKET'
            }); 

            navigate('/orders');

            // You can also dispatch an action to clear the basket or update your state here
        }; 
    
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
    <div className='bg-white'>
        <div>
            <h1 className='text-center p-[10px] font-normal bg-[#eaeded] border-b-[1px] border-gray-300'>
               Checkout (<Link 
               className='decoration-none'
               to="/checkout">
                {basket?.length} items
             </Link>)
            </h1>
        <div className="flex p-5 my-0 mx-5 border-b-[1px] border-gray-300">
            <div className="flex-[0.2]">
             <h3>Delivery Address</h3>
            </div>
            <div className="flex-[0.8]">
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
        </div>
           <div className="flex p-5 my-0 mx-5 border-b-[1px] border-gray-300">
            <div className="flex-[0.2]">
                <h3>Review items and delivery</h3>
            </div>
            <div className="flex-[0.8]">
                {basket.map(item => (
                    <CheckoutProduct
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                    />  
                ))}
            </div>
           </div>
            <div className="flex p-5 my-0 mx-5 border-b-[1px] border-gray-300">
            <div className="flex-[0.2]">
                <h3>Payment Method</h3>
            </div>
            <div className="flex-[0.8]">
               <form
                 className='max-w-[400px]'
                 onSubmit={handleSubmit}
               >
                  <CardElement onChange={handleChange} />
                  <div className="payment_priceContainer">
                    <h3 className='pb-5'>Order Total: {formattedValue}</h3>
                    <button 
                                    
                    className=" w-full h-[30px] bg-[#f0c14b] rounded-[20px] border border-t-[#a88734] border-l-[#9c7e31]
                        border-b-[#846a29] border-r-[#9c7e31] font-extrabold mt-[10px] text-[#111] cursor-pointer"
                    
                    disabled={processing || disabled || succeeded || !clientSecret}>
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