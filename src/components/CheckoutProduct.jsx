import React from 'react'
import '../css/CheckoutProduct.css'
import {useStateValue} from "./StateProvider.jsx";

const CheckoutProduct = ({ id, image, title,  price, rating}) => {

    const [{ basket }, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image} alt="" />

            <div className="checkoutProduct_info">
                <p className="checkoutProudct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <p className="checkoutProduct_rating">
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}
                </p>
                <button
                    onClick={removeFromBasket}
                    className="checkoutProduct_button">Remove from Basket</button>
            </div>
        </div>

    )
}
 export default CheckoutProduct
