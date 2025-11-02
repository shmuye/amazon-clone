import React from 'react'
import "../css/Checkout.css"
import Subtotal from "./Subtotal.jsx";
const Checkout = () => {
    return (
        <div className="checkout">
            <div className="checkout_left">
                  <img
                      className="checkout_ad"
                      src="https://m.media-amazon.com/images/I/21DX0E62GJL.png"
                      alt=""
                  />
                <div className="checkout_right">
                    <h2 className="checkout_title">Your Shopping Basket</h2>
                </div>
            </div>
            <div className="checkout_right">
               <Subtotal />
            </div>
        </div>
    )
}
export default Checkout
