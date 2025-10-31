import React from 'react'
import "../css/Product.css"

const Product = () => {
    return (
        <div className="product">
            <div className="product_info">
                <p>The lean startup</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>9.99</strong>
                </p>
            </div>
            <div className="product_rating">
                  <p>⭐</p>

            </div>
            <img

                src="https://m.media-amazon.com/images/I/41BPLKaHmTL._SY445_SX342_ControlCacheEqualizer_.jpg"
                alt=""
            />
            <button className="product_Button">
                Add to Basket
            </button>
        </div>
    )
}
export default Product
