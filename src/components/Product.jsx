import React from 'react'
import "../css/Product.css"
import {useStateValue} from "./StateProvider.jsx";

const Product = ({ id, title , price , image, rating}) => {
    const [{ basket }, dispatch ] = useStateValue()
    const addToBasket = () => {
         dispatch({

                 type: "ADD_TO_BASKET",
                 item: {
                     id,
                     title,
                     price,
                     image,
                     rating
                 }
         })
    }
    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>
            <div className="product_rating">
                {
                    Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))
                }

            </div>
            <img
                src={image}
                alt=""
            />
            <button
                onClick={addToBasket}
                className="product_Button">
                Add to Basket
            </button>
        </div>
    )
}
export default Product
