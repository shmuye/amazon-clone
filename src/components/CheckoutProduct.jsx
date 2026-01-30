import React from 'react'
import '../css/CheckoutProduct.css'
import {useStateValue} from "./StateProvider.jsx";

const CheckoutProduct = ({ id, image, title, description,  price, rating , hideButton}) => {

    const [{ basket }, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        })
    }

    return (
        <div className="checkoutProduct_container">
        <div className='checkoutProduct'>
            <img className="checkoutProduct_image" src={image} alt="" />
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className='checkoutProduct_description'>{description}</p>
                <p className="checkoutProduct_rating">
                    <span>Rating: </span>
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}
                </p>
                {
                    !hideButton && (
                        <button
                             onClick={removeFromBasket}
                             className="checkoutProduct_button">
                                Remove from Basket
                    </button>
                    )
                }
            </div>
            </div>
            <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
             </p>
            
        </div>

    )
}
 export default CheckoutProduct
