import React from 'react'
import "../css/Checkout.css"
import Subtotal from "./Subtotal.jsx";
import {useStateValue} from "./StateProvider.jsx";
import CheckoutProduct from "./CheckoutProduct.jsx";
import { getUserName } from '../utils/getUserName.js';  

const Checkout = () => {
    const [{ basket, user }, dispatch] = useStateValue()
    return (
        <div className="checkout">
            <div className="checkout_left">
                  {/* <img
                      className="checkout_ad"
                      src="https://m.media-amazon.com/images/I/21DX0E62GJL.png"
                      alt=""
                  /> */}
                <div className="checkout_right">
                    {/* <h3>Hello {getUserName(user)}</h3> */}
                    <h2 className="checkout_title">
                        Shopping Cart
                    </h2>
                    {
                        basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))
                    }

                </div>
            </div>
            <div className="checkout_right">
               <Subtotal />
            </div>
        </div>
    )
}
export default Checkout
